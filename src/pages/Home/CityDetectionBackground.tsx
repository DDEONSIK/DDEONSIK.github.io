import { Canvas } from '@react-three/fiber';
import { useTheme } from '@/context/ThemeContext';
import './Home.css';

import { THEME_COLORS } from '@/pages/Home/animation/config';
import { Buildings } from '@/pages/Home/animation/Buildings';
import { RoadLines, InfiniteFloor } from '@/pages/Home/animation/Road';
import { TrafficController } from '@/pages/Home/animation/TrafficController';

const CityDetectionBackground = () => {
    const { actualTheme } = useTheme();
    const colors = THEME_COLORS[actualTheme as keyof typeof THEME_COLORS] || THEME_COLORS.light;

    return (
        <div className="city-bg-container">
            <Canvas
                camera={{ position: [120, 300, 120], fov: 15 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance on high-res screens
                onCreated={(state) => state.camera.lookAt(0, 0, 0)}
            >
                <fog attach="fog" args={[colors.fog, 100, 450]} />
                <ambientLight intensity={1.5} />
                <pointLight position={[30, 60, 30]} intensity={1.0} />
                <pointLight position={[-30, 60, -30]} intensity={0.5} />

                <InfiniteFloor colors={colors} />
                <RoadLines colors={colors} />
                <Buildings colors={colors} />

                <TrafficController colors={colors} />

            </Canvas>
            <div className="city-bg-overlay"></div>
        </div>
    );
};

export default CityDetectionBackground;
