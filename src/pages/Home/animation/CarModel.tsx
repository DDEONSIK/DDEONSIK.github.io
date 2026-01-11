import React, { useState, useMemo } from 'react';
import { BoxGeometry, EdgesGeometry, MeshStandardMaterial, Color, MeshBasicMaterial, LineBasicMaterial } from 'three';

// Cached geometries to prevent recreation on every hover/render
const CAR_GEOMETRY_CACHE = {
    sedan: {
        body: new BoxGeometry(2.0, 0.6, 4.0),
        top: new BoxGeometry(1.6, 0.7, 2.0),
        bound: new BoxGeometry(2.2, 1.6, 4.2),
        boundEdge: new EdgesGeometry(new BoxGeometry(2.2, 1.6, 4.2))
    },
    suv: {
        body: new BoxGeometry(2.0, 0.8, 4.0),
        top: new BoxGeometry(1.7, 0.7, 2.5),
        bound: new BoxGeometry(2.2, 1.8, 4.2),
        boundEdge: new EdgesGeometry(new BoxGeometry(2.2, 1.8, 4.2))
    },
    truck: {
        cab: new BoxGeometry(2.0, 1.8, 2.0),
        cargo: new BoxGeometry(1.9, 1.2, 1.5),
        base: new BoxGeometry(2.0, 0.6, 4.5),
        bound: new BoxGeometry(2.2, 2.2, 4.7),
        boundEdge: new EdgesGeometry(new BoxGeometry(2.2, 2.2, 4.7))
    }
};

export const CarModel = React.memo(({ type, colors, highlighted = false }: { type: string, colors: any, highlighted?: boolean }) => {
    const [hovered, setHover] = useState(false);
    
    // Show effect if hovered by mouse OR if it was randomly selected to be highlighted initially
    const showEffect = hovered || highlighted;

    // Generate stable random variation for this car instance
    const variation = useMemo(() => ({
        h: 0, // No hue shift
        s: 0, // No saturation shift
        l: (Math.random() - 0.5) * 0.15  // Only lightness shift (+- 7.5%)
    }), []); // Empty dependency array ensures this is calculated once per instance

    // Memoize material to share across renders, updating only when necessary
    const material = useMemo(() => {
        if (showEffect) {
             return new MeshStandardMaterial({ 
                color: colors.highlight,
                roughness: 0.5, 
                metalness: 0.5 
            });
        }

        // Determine base color based on vehicle type
        let baseHex = colors.carLight;
        if (colors.vehicle && colors.vehicle[type]) {
            baseHex = colors.vehicle[type];
        } else if (type === 'truck') {
            baseHex = '#94a3b8'; // Fallback for truck if theme not updated
        }

        // Create color instance and apply variations
        const finalColor = new Color(baseHex);
        finalColor.offsetHSL(variation.h, variation.s, variation.l);

        return new MeshStandardMaterial({ 
            color: finalColor,
            roughness: 0.5, 
            metalness: 0.5 
        });
    }, [showEffect, type, colors, variation]);

    const boxColor = colors.box;
    const scale: [number, number, number] = [0.75, 0.75, 0.75];
    const cache = CAR_GEOMETRY_CACHE[type as keyof typeof CAR_GEOMETRY_CACHE] || CAR_GEOMETRY_CACHE.sedan;

    // Bounding Box Visual
    const BoundingBox = () => (
        <group>
             <mesh geometry={cache.bound} position={[0, 0, 0]}>
                <meshBasicMaterial color={boxColor} wireframe={true} transparent opacity={0.3} />
            </mesh>
            <lineSegments geometry={cache.boundEdge} position={[0, 0, 0]}>
                 <lineBasicMaterial color={boxColor} linewidth={2} />
            </lineSegments>
        </group>
    );

    const InnerModel = () => {
        if (type === 'sedan') {
            const sCache = cache as typeof CAR_GEOMETRY_CACHE.sedan;
            return (
                <group>
                    <mesh geometry={sCache.body} material={material} position={[0, 0.4, 0]} castShadow receiveShadow />
                    <mesh geometry={sCache.top} material={material} position={[0, 1.0, -0.3]} castShadow receiveShadow />
                    {showEffect && <group position={[0, 0.8, 0]}><BoundingBox /></group>}
                </group>
            )
        } else if (type === 'suv') {
            const sCache = cache as typeof CAR_GEOMETRY_CACHE.suv;
            return (
                <group>
                    <mesh geometry={sCache.body} material={material} position={[0, 0.6, 0]} castShadow receiveShadow />
                    <mesh geometry={sCache.top} material={material} position={[0, 1.3, -0.2]} castShadow receiveShadow />
                    {showEffect && <group position={[0, 0.9, 0]}><BoundingBox /></group>}
                </group>
            )
        } else if (type === 'truck') {
            const tCache = cache as typeof CAR_GEOMETRY_CACHE.truck;
            return (
                <group>
                    <mesh geometry={tCache.cab} material={material} position={[0, 1.1, 1.2]} castShadow receiveShadow />
                    <mesh geometry={tCache.cargo} material={material} position={[0, 1.1, -1.2]} castShadow receiveShadow />
                    <mesh geometry={tCache.base} material={material} position={[0, 0.5, 0]} castShadow receiveShadow />
                    {showEffect && <group position={[0, 1.1, 0]}><BoundingBox /></group>}
                </group>
            )
        }
        return null;
    };

    return (
        <group 
            scale={scale} 
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
            onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
        >
            <InnerModel />
        </group>
    );
});
