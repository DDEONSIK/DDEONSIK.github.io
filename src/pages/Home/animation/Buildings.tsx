import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, BoxGeometry, MeshStandardMaterial, Color } from 'three';
import { CONFIG } from '@/pages/Home/animation/config';
import { tempObj } from '@/pages/Home/animation/utils';

export const Buildings = React.memo(({ colors }: { colors: any }) => {
    const mesh = useRef<InstancedMesh>(null!);

    const buildings = useMemo(() => {
        const builds: { x: number; z: number; h: number; w: number; d: number }[] = [];
        const { RANGE, SIZE, GAP, MIN_DIST_OFFSET } = CONFIG.BUILDING;
        // minDist is the coordinate for the CENTER of the first building row
        const minDist = CONFIG.ROAD.WIDTH / 2 + CONFIG.ROAD.SIDEWALK_WIDTH + MIN_DIST_OFFSET + SIZE / 2;
        const step = SIZE + GAP;

        // Helper to add a building
        const addBuilding = (x: number, z: number) => {
            let h;
            // Only lower buildings in the specific area that blocks the camera view (South side / Positive Z)
            // Camera is at [120, 300, 120] looking at [0,0,0].
            // High Z values are closer to the "bottom" of the screen in many views, or "South".
            // Let's keep buildings tall near the intersection, but maybe lower extremely close ones if they block view.
            
            // Current issue: "Buildings on left/right are too low". 
            // Previous logic: if (Math.abs(x) < 50 && Math.abs(z) < 50) h = low
            // This made the immediate intersection corners low.
            
            // New Logic: 
            // 1. Center intersection corners can be tall (removed the center check).
            // 2. If we want "bottom" buildings low: check Z > some_threshold.
            
            if (z > 80 && Math.abs(x) < 60) {
                 // South road corridor - keep low to see traffic?
                 h = 2 + Math.random() * 8; 
            } else {
                 // Standard skyscrapers
                 h = 15 + Math.random() * 45; 
            }
            
            const w = SIZE - Math.random();
            const d = SIZE - Math.random();
            builds.push({ x, z, h, w, d });
        };

        // Quadrant 1: +X, +Z
        for (let x = minDist; x <= RANGE; x += step) {
            for (let z = minDist; z <= RANGE; z += step) {
                addBuilding(x, z);
            }
        }
        
        // Quadrant 2: -X, +Z
        for (let x = -minDist; x >= -RANGE; x -= step) {
            for (let z = minDist; z <= RANGE; z += step) {
                addBuilding(x, z);
            }
        }

        // Quadrant 3: -X, -Z
        for (let x = -minDist; x >= -RANGE; x -= step) {
            for (let z = -minDist; z >= -RANGE; z -= step) {
                addBuilding(x, z);
            }
        }

        // Quadrant 4: +X, -Z
        for (let x = minDist; x <= RANGE; x += step) {
            for (let z = -minDist; z >= -RANGE; z -= step) {
                addBuilding(x, z);
            }
        }

        return builds;
    }, []);

    useFrame(() => {
        if (!mesh.current) return;
        // Static buildings only need initial update, but if we wanted them to grow/shrink we'd do it here.
        // Since they are static, we set them once in useLayoutEffect or just once here with a flag if strict mode issues arise.
        // However, standard pattern:
    });

    // Initialize instances once
    React.useLayoutEffect(() => {
        if (!mesh.current) return;

        const baseColor = new Color(colors.building);
        const tempColor = new Color();

        buildings.forEach((b, i) => {
            tempObj.position.set(b.x, b.h / 2, b.z);
            tempObj.scale.set(b.w, b.h, b.d);
            tempObj.rotation.set(0, 0, 0);
            tempObj.updateMatrix();
            mesh.current.setMatrixAt(i, tempObj.matrix);

            // Random color variation
            tempColor.copy(baseColor);
            // Vary lightness significantly for better distinction
            const l = (Math.random() - 0.5) * 0.4; 
            const s = (Math.random() - 0.5) * 0.1;
            tempColor.offsetHSL(0, s, l);
            
            mesh.current.setColorAt(i, tempColor);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }, [buildings, colors]);

    // Reusable geometry and material
    const geometry = useMemo(() => new BoxGeometry(1, 1, 1), []);
    const material = useMemo(() => new MeshStandardMaterial({ 
        color: 0xffffff, // White to allow instance colors to show through
        roughness: 0.7, 
        metalness: 0.2 
    }), []); // Base material doesn't change on theme color change, instances do

    return (
        <instancedMesh ref={mesh} args={[geometry, material, buildings.length]} />
    );
});
