import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { CarAgent } from '@/pages/Home/animation/CarAgent';
import { CarModel } from '@/pages/Home/animation/CarModel';
import { CONFIG } from '@/pages/Home/animation/config';
import { tempVec } from '@/pages/Home/animation/utils';

export const TrafficController = React.memo(({ colors }: { colors: any }) => {
    const groupRef = useRef<Group>(null!);
    const trafficStateRef = useRef('SOUTH_GO');
    
    // Initialize Agents
    const agents = useMemo(() => {
        const ags: CarAgent[] = [];
        const types = ['sedan', 'suv', 'truck'];
        let idCounter = 0;
        const spawnDist = CONFIG.TRAFFIC.SPAWN_DIST;
        
        const addCars = (origin: string, xDir: number, zDir: number) => {
            // 4 lanes total? Loop from 0 to 3
            // In road logic we have 3 lanes (1,2,3) plus center? 
            // The original code had: for(let l=0; l<4; l++)
            for(let l=0; l<4; l++) { 
                const laneOffset = 2.0 + l * 3.5;
                let sPos = new Vector3();
                
                if (origin === 'SOUTH') sPos.set(laneOffset, 0, spawnDist);
                else if (origin === 'NORTH') sPos.set(-laneOffset, 0, -spawnDist);
                else if (origin === 'EAST') sPos.set(spawnDist, 0, -laneOffset); 
                else if (origin === 'WEST') sPos.set(-spawnDist, 0, laneOffset); 
                
                for(let c=0; c<CONFIG.TRAFFIC.CARS_PER_LANE; c++) {
                     const type = types[Math.floor(Math.random() * types.length)];
                     const agent = new CarAgent(idCounter++, origin, l, sPos, new Vector3(xDir, 0, zDir), type);
                     
                     // Warm-start: Place cars randomly along the road initially
                     // Distance to center is 240. We place them between 20 and 220 from start.
                     const forwardOffset = c * 50 + Math.random() * 30; 
                     
                     // Move position forward
                     tempVec.copy(agent.dir).multiplyScalar(forwardOffset);
                     agent.pos.add(tempVec);
                     
                     // Set to moving state immediately
                     agent.state = 'moving';
                     agent.speed = agent.maxSpeed;
                     agent.delayTimer = 0;

                     ags.push(agent);
                }
            }
        }

        addCars('SOUTH', 0, -1);
        addCars('NORTH', 0, 1);
        addCars('EAST', -1, 0);
        addCars('WEST', 1, 0);

        return ags;
    }, []);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        const cycle = time % 24;
        
        if (cycle < 5) trafficStateRef.current = 'SOUTH_GO';
        else if (cycle < 6) trafficStateRef.current = 'ALL_RED';
        else if (cycle < 11) trafficStateRef.current = 'NORTH_GO';
        else if (cycle < 12) trafficStateRef.current = 'ALL_RED';
        else if (cycle < 17) trafficStateRef.current = 'EAST_GO';
        else if (cycle < 18) trafficStateRef.current = 'ALL_RED';
        else if (cycle < 23) trafficStateRef.current = 'WEST_GO';
        else trafficStateRef.current = 'ALL_RED';
    });
    
    useFrame((_state, delta) => {
        if (!groupRef.current) return;
        const dt = Math.min(delta, 0.1); 

        // Update agents
        agents.forEach(agent => {
            agent.update(dt, trafficStateRef.current, agents);
        });

        // Sync meshes
        agents.forEach((agent, i) => {
            const mesh = groupRef.current.children[i];
            if (!mesh) return;
            if (agent.state === 'spawn_delay') {
                mesh.position.set(0, -500, 0); 
            } else {
                mesh.position.copy(agent.pos);
                const angle = Math.atan2(agent.dir.x, agent.dir.z);
                mesh.rotation.set(0, angle, 0);
            }
        });
    });

    return (
        <group ref={groupRef}>
            {agents.map((agent) => (
                <CarModel 
                    key={agent.id} 
                    type={agent.type} 
                    colors={colors} 
                    highlighted={agent.isHighlighted}
                /> 
            ))}
        </group>
    );
});
