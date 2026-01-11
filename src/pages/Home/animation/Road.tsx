import React, { useRef, useMemo } from 'react';
import { InstancedMesh, Object3D, Matrix4, Vector3, Quaternion, Euler, PlaneGeometry, MeshBasicMaterial } from 'three';
import { CONFIG } from '@/pages/Home/animation/config';
import { tempObj } from '@/pages/Home/animation/utils';

export const RoadLines = React.memo(({ colors }: { colors: any }) => {
    
    // 1. Dashed Lines Logic
    const dashedLinesData = useMemo(() => {
        const instances: { pos: [number, number, number], rot: [number, number, number] }[] = [];
        const { WIDTH, LANE_WIDTH, LENGTH } = CONFIG.ROAD;
        const segmentLen = 6; // Distance between dashes
        const dashCount = 45; // Defined in original code
        
        // Helper to add lines for a road segment
        const addLaneDashes = (rotationY: number) => {
             const offset = WIDTH / 2 + LENGTH / 2;
             
             // Base transform for this road arm
             const baseObj = new Object3D();
             baseObj.rotation.y = rotationY;
             baseObj.position.set(0, 0, 0);
             if (rotationY === 0) baseObj.position.z = offset;
             else if (rotationY === Math.PI) baseObj.position.z = -offset;
             else if (rotationY === -Math.PI/2) baseObj.position.x = -offset;
             else if (rotationY === Math.PI/2) baseObj.position.x = offset;

             baseObj.updateMatrixWorld();

             // Right Side Lanes (1, 2, 3)
             [1, 2, 3].forEach(lane => {
                 const xPos = LANE_WIDTH * lane;
                 for(let i=0; i<dashCount; i++) {
                     const zPos = (i * segmentLen) - LENGTH/2 + 3;
                     
                     tempObj.position.set(xPos, 0.1, zPos);
                     tempObj.rotation.set(-Math.PI/2, 0, 0); // Flat on ground
                     tempObj.scale.set(1, 1, 1);
                     
                     // Local matrix of the dash
                     tempObj.updateMatrix();
                     
                     // World matrix = ParentMatrix * LocalMatrix
                     const worldMatrix = new Matrix4();
                     worldMatrix.multiplyMatrices(baseObj.matrixWorld, tempObj.matrix);
                     
                     // Decompose to get pos/rot for our data struct
                     const p = new Vector3();
                     const q = new Quaternion();
                     const s = new Vector3();
                     worldMatrix.decompose(p, q, s);
                     
                     const e = new Euler().setFromQuaternion(q);
                     instances.push({ pos: [p.x, p.y, p.z], rot: [e.x, e.y, e.z] });
                 }
             });

             // Left Side Lanes (Mirror)
             [1, 2, 3].forEach(lane => {
                const xPos = -LANE_WIDTH * lane;
                for(let i=0; i<dashCount; i++) {
                    const zPos = (i * segmentLen) - LENGTH/2 + 3;
                    
                    tempObj.position.set(xPos, 0.1, zPos);
                    tempObj.rotation.set(-Math.PI/2, 0, 0);
                    tempObj.scale.set(1, 1, 1);
                    tempObj.updateMatrix();
                    
                    const worldMatrix = new Matrix4();
                    worldMatrix.multiplyMatrices(baseObj.matrixWorld, tempObj.matrix);
                    
                    const p = new Vector3();
                    const q = new Quaternion();
                    const s = new Vector3();
                    worldMatrix.decompose(p, q, s);
                    const e = new Euler().setFromQuaternion(q);
                    instances.push({ pos: [p.x, p.y, p.z], rot: [e.x, e.y, e.z] });
                }
             });
        }

        addLaneDashes(0);
        addLaneDashes(Math.PI);
        addLaneDashes(-Math.PI/2);
        addLaneDashes(Math.PI/2);

        return instances;
    }, []);

    // 2. Grid Logic
    const gridData = useMemo(() => {
        const instances: { pos: [number, number, number], rot: [number, number, number], scale: [number, number, number] }[] = [];
        const { COUNT, STEP, SIZE } = CONFIG.GRID;
        
        // Horizontal lines
        for(let i=0; i<COUNT; i++) {
            instances.push({
                pos: [0, 0.05, (i - COUNT/2) * STEP],
                rot: [-Math.PI/2, 0, 0],
                scale: [SIZE, 1, 1] // Scale plane to be long
            });
        }
        // Vertical lines
        for(let i=0; i<COUNT; i++) {
             instances.push({
                pos: [(i - COUNT/2) * STEP, 0.05, 0],
                rot: [-Math.PI/2, 0, 0],
                scale: [1, SIZE, 1] // Scale plane width (which is y in local plane space rotated)
            });
        }
        return instances;
    }, []);

    // Refs
    const dashedRef = useRef<InstancedMesh>(null!);
    const gridRef = useRef<InstancedMesh>(null!);

    // Update Instanced Meshes
    React.useLayoutEffect(() => {
        if (dashedRef.current) {
            dashedLinesData.forEach((data, i) => {
                tempObj.position.set(...data.pos);
                tempObj.rotation.set(...data.rot);
                tempObj.scale.set(1, 1, 1);
                tempObj.updateMatrix();
                dashedRef.current.setMatrixAt(i, tempObj.matrix);
            });
            dashedRef.current.instanceMatrix.needsUpdate = true;
        }

        if (gridRef.current) {
            gridData.forEach((data, i) => {
                tempObj.position.set(...data.pos);
                tempObj.rotation.set(...data.rot);
                // Grid logic expects specific scaling logic. 
                if (i < CONFIG.GRID.COUNT) {
                     // H-lines
                     tempObj.scale.set(CONFIG.GRID.SIZE, 0.05, 1);
                } else {
                     // V-lines
                     tempObj.scale.set(0.05, CONFIG.GRID.SIZE, 1);
                }
                tempObj.updateMatrix();
                gridRef.current.setMatrixAt(i, tempObj.matrix);
            });
            gridRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [dashedLinesData, gridData]);

    // Geometries & Materials
    const dashGeo = useMemo(() => new PlaneGeometry(0.15, 3), []);
    const dashMat = useMemo(() => new MeshBasicMaterial({ color: colors.roadDashed }), [colors.roadDashed]);
    
    const gridGeo = useMemo(() => new PlaneGeometry(1, 1), []);
    const gridMat = useMemo(() => new MeshBasicMaterial({ color: colors.roadGrid }), [colors.roadGrid]);

    // Static Meshes (Center lines, Stop lines, Sidewalks) - kept as standard meshes for simplicity as there are few of them
    const StaticRoadSegments = useMemo(() => {
        const { WIDTH, LANE_WIDTH, LENGTH, SIDEWALK_WIDTH } = CONFIG.ROAD;
        const offset = WIDTH / 2 + LENGTH / 2;
        
        const Segment = ({ rotation, position }: any) => (
            <group rotation={rotation} position={position}>
                 <group position={[0, 0, offset]}>
                    {/* Double Center Line */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.2, 0.1, 0]}>
                        <planeGeometry args={[0.15, LENGTH]} />
                        <meshBasicMaterial color={colors.roadCenter} />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.1, 0]}>
                        <planeGeometry args={[0.15, LENGTH]} />
                        <meshBasicMaterial color={colors.roadCenter} />
                    </mesh>

                    {/* Stop Line */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[LANE_WIDTH * 2.0, 0.12, -LENGTH/2 + 1]}>
                        <planeGeometry args={[LANE_WIDTH * 4, 0.6]} />
                        <meshBasicMaterial color={colors.roadSolid} />
                    </mesh>

                    {/* Sidewalks & Curbs */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[WIDTH/2 + SIDEWALK_WIDTH/2, 0.15, 0]}>
                        <planeGeometry args={[SIDEWALK_WIDTH, LENGTH]} />
                        <meshStandardMaterial color={colors.sidewalk} roughness={0.9} />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-(WIDTH/2 + SIDEWALK_WIDTH/2), 0.15, 0]}>
                        <planeGeometry args={[SIDEWALK_WIDTH, LENGTH]} />
                        <meshStandardMaterial color={colors.sidewalk} roughness={0.9} />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[WIDTH/2, 0.2, 0]}>
                        <planeGeometry args={[0.5, LENGTH]} />
                        <meshBasicMaterial color={colors.roadCurb} />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-WIDTH/2, 0.2, 0]}>
                        <planeGeometry args={[0.5, LENGTH]} />
                        <meshBasicMaterial color={colors.roadCurb} />
                    </mesh>
                 </group>
            </group>
        );

        return (
            <>
                <Segment rotation={[0, 0, 0]} position={[0, 0, 0]} />
                <Segment rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
                <Segment rotation={[0, -Math.PI/2, 0]} position={[0, 0, 0]} />
                <Segment rotation={[0, Math.PI/2, 0]} position={[0, 0, 0]} />
            </>
        )
    }, [colors]);

    return (
        <group>
            {/* Optimized Instanced Meshes */}
            <instancedMesh ref={dashedRef} args={[dashGeo, dashMat, dashedLinesData.length]} />
            <instancedMesh ref={gridRef} args={[gridGeo, gridMat, gridData.length]} />
            
            {/* Low-count static meshes */}
            {StaticRoadSegments}
        </group>
    )
});

export const InfiniteFloor = React.memo(({ colors }: { colors: any }) => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial color={colors.floor} />
        </mesh>
    )
});
