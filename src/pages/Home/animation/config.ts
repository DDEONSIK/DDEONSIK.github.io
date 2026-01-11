// ==========================================
// GLOBAL CONFIGURATION
// ==========================================
export const CONFIG = {
    ROAD: {
        WIDTH: 30,
        LANE_WIDTH: 3.5,
        SIDEWALK_WIDTH: 6,
        LENGTH: 250,
        STOP_LINE: 18, // ROAD_WIDTH/2 + 3
        LANE_COUNT: 3, // Number of lanes per side (excluding center)
    },
    BUILDING: {
        SIZE: 8,
        GAP: 1,
        RANGE: 300,
        MIN_DIST_OFFSET: 0, // Offset from road edge
    },
    TRAFFIC: {
        SPAWN_DIST: 240,
        SPEED_MIN: 20,
        SPEED_VAR: 5,
        ACCEL: 15,
        DECEL: 35,
        SPAWN_RETRY: 0.5,
        TURN_DURATION_BASE: 1.8,
        DETECT_DIST_STOP: 4.6,
        DETECT_DIST_SLOW: 12,
        CARS_PER_LANE: 4,
        HIGHLIGHT_CHANCE: 0.4,
    },
    GRID: {
        SIZE: 600,
        STEP: 5,
        COUNT: 120, // 600 / 5
    }
};

// Theme Colors
export const THEME_COLORS = {
    light: {
        fog: '#f8fafc',
        floor: '#f8fafc',
        roadCenter: '#f59e0b',
        roadDashed: '#cbd5e1',
        roadSolid: '#94a3b8',
        roadCurb: '#cbd5e1',
        sidewalk: '#e2e8f0',
        roadGrid: '#f1f5f9',
        building: '#cbd5e1',
        carLight: '#e2e8f0',
        carDark: '#f1f5f9',
        vehicle: {
            sedan: '#1e293b', // Slate-800
            suv: '#475569',   // Slate-600
            truck: '#94a3b8', // Slate-400
        },
        highlight: '#3b82f6',
        box: '#000000ff',
    },
    dark: {
        fog: '#0f172a',
        floor: '#0f172a',
        roadCenter: '#fbbf24',
        roadDashed: '#64748b',
        roadSolid: '#475569',
        roadCurb: '#334155',
        sidewalk: '#1e293b',
        roadGrid: '#1e293b',
        building: '#475569',
        carLight: '#f8fafc',
        carDark: '#cbd5e1',
        vehicle: {
            sedan: '#f8fafc', // Slate-50
            suv: '#cbd5e1',   // Slate-300
            truck: '#94a3b8', // Slate-400
        },
        highlight: '#60a5fa',
        box: '#ffffffff',
    }
};
