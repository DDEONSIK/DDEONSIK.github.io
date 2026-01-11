import { Vector3 } from 'three';
import { CONFIG } from '@/pages/Home/animation/config';
import { tempVec, tempVec2 } from '@/pages/Home/animation/utils';

export class CarAgent {
    id: number;
    origin: string;
    laneIdx: number;
    startPos: Vector3;
    pos: Vector3;
    dir: Vector3;
    type: string;
    speed: number;
    maxSpeed: number;
    acceleration: number;
    deceleration: number;
    state: string;
    delayTimer: number;
    action: string;
    turnProgress: number;
    p0: Vector3 | null;
    p1: Vector3 | null;
    p2: Vector3 | null;
    turnTargetDir: Vector3 | null;
    isHighlighted: boolean;

    constructor(id: number, origin: string, laneIdx: number, startPos: Vector3, dir: Vector3, type: string) {
        this.id = id;
        this.origin = origin; 
        this.laneIdx = laneIdx; 
        this.startPos = startPos.clone();
        this.pos = startPos.clone();
        this.dir = dir.clone();
        this.type = type;
        
        // Chance to be initially detected (highlighted with bbox)
        this.isHighlighted = Math.random() < CONFIG.TRAFFIC.HIGHLIGHT_CHANCE;

        const { SPEED_MIN, SPEED_VAR, ACCEL, DECEL } = CONFIG.TRAFFIC;
        this.speed = 0;
        this.maxSpeed = SPEED_MIN + Math.random() * SPEED_VAR;
        this.acceleration = ACCEL;
        this.deceleration = DECEL; 
        
        this.state = 'spawn_delay'; 
        this.delayTimer = Math.random() * 20; 
        
        this.action = (laneIdx === 0 && Math.random() > 0.4) ? 'turn_left' : 'straight';

        this.turnProgress = 0;
        this.p0 = null;
        this.p1 = null;
        this.p2 = null;
        this.turnTargetDir = null;
    }

    reset() {
        this.pos.copy(this.startPos);
        this.speed = 0;
        this.state = 'spawn_delay';
        this.delayTimer = Math.random() * 5;
        this.turnProgress = 0;
        
        if (this.origin === 'SOUTH') this.dir.set(0, 0, -1);
        else if (this.origin === 'NORTH') this.dir.set(0, 0, 1);
        else if (this.origin === 'EAST') this.dir.set(-1, 0, 0);
        else if (this.origin === 'WEST') this.dir.set(1, 0, 0);

        this.action = (this.laneIdx === 0 && Math.random() > 0.4) ? 'turn_left' : 'straight';
    }

    update(delta: number, trafficState: string, otherCars: CarAgent[]) {
        const { DETECT_DIST_STOP, DETECT_DIST_SLOW, TURN_DURATION_BASE } = CONFIG.TRAFFIC;

        if (this.state === 'spawn_delay') {
            this.delayTimer -= delta;
            if (this.delayTimer <= 0) {
                // Check if spawn area is clear using optimized loop
                // Only check cars with same origin and lane
                let isClear = true;
                for (let i = 0; i < otherCars.length; i++) {
                    const c = otherCars[i];
                    if (c.id === this.id || c.state === 'spawn_delay') continue;
                    if (c.origin !== this.origin || c.laneIdx !== this.laneIdx) continue;
                    
                    if (c.pos.distanceToSquared(this.pos) < 64) { // 8 * 8
                        isClear = false;
                        break;
                    }
                }

                if (isClear) this.state = 'moving';
                else this.delayTimer = CONFIG.TRAFFIC.SPAWN_RETRY;
            }
            return;
        }

        let targetSpeed = this.maxSpeed;
        const distToCenter = this.pos.length();
        const isApproaching = this.pos.dot(this.dir) < 0; 

        // Leader detection
        let leaderDist = Infinity;
        for (let i = 0; i < otherCars.length; i++) {
            const other = otherCars[i];
            if (other.id === this.id || other.state === 'spawn_delay') continue;
            // Only care about same lane
            if (other.origin !== this.origin || other.laneIdx !== this.laneIdx) continue;
            
            // Vector to other: other.pos - this.pos
            tempVec.subVectors(other.pos, this.pos);
            
            // Check if in front
            if (tempVec.dot(this.dir) > 0) {
                const d = tempVec.length(); // distance
                if (d < leaderDist) leaderDist = d;
            }
        }

        if (leaderDist < DETECT_DIST_STOP) targetSpeed = 0;
        else if (leaderDist < DETECT_DIST_SLOW) targetSpeed = Math.min(targetSpeed, (leaderDist - DETECT_DIST_STOP) * 3);

        const stopZoneStart = CONFIG.ROAD.STOP_LINE + 10;
        const stopZoneEnd = CONFIG.ROAD.STOP_LINE;
        
        let canGo = false;
        if (this.origin === 'SOUTH' && trafficState === 'SOUTH_GO') canGo = true;
        if (this.origin === 'NORTH' && trafficState === 'NORTH_GO') canGo = true;
        if (this.origin === 'EAST' && trafficState === 'EAST_GO') canGo = true;
        if (this.origin === 'WEST' && trafficState === 'WEST_GO') canGo = true;

        if (!canGo && isApproaching && distToCenter < stopZoneStart && distToCenter > stopZoneEnd) {
             targetSpeed = 0;
        }

        // Turning Logic
        if (this.action === 'turn_left' && this.state !== 'turning') {
            if (distToCenter <= CONFIG.ROAD.STOP_LINE - 2) { 
                this.state = 'turning';
                this.turnProgress = 0;
                this.p0 = this.pos.clone();
                const targetLaneOffset = 2.0; 
                
                // Initialize bezier points
                if (this.origin === 'SOUTH') { 
                    this.p1 = new Vector3(2, 0, -2);
                    this.p2 = new Vector3(-30, 0, -targetLaneOffset);
                    this.turnTargetDir = new Vector3(-1, 0, 0);
                } else if (this.origin === 'NORTH') {
                    this.p1 = new Vector3(-2, 0, 2);
                    this.p2 = new Vector3(30, 0, targetLaneOffset);
                    this.turnTargetDir = new Vector3(1, 0, 0);
                } else if (this.origin === 'EAST') {
                    this.p1 = new Vector3(-2, 0, -2);
                    this.p2 = new Vector3(-targetLaneOffset, 0, 30);
                    this.turnTargetDir = new Vector3(0, 0, 1);
                } else if (this.origin === 'WEST') {
                    this.p1 = new Vector3(2, 0, 2);
                    this.p2 = new Vector3(targetLaneOffset, 0, -30);
                    this.turnTargetDir = new Vector3(0, 0, -1);
                }
            }
        }

        // Speed update
        if (this.speed < targetSpeed) {
            this.speed += this.acceleration * delta;
            if (this.speed > targetSpeed) this.speed = targetSpeed;
        } else {
            this.speed -= this.deceleration * delta;
            if (this.speed < 0) this.speed = 0;
        }

        // Position update
        if (this.state === 'turning' && this.p0 && this.p1 && this.p2) {
            this.turnProgress += (delta / TURN_DURATION_BASE) * (this.speed / 15);
            
            if (this.turnProgress >= 1) {
                this.state = 'moving';
                this.pos.copy(this.p2);
                if (this.turnTargetDir) this.dir.copy(this.turnTargetDir);
                this.action = 'straight'; 
            } else {
                const t = this.turnProgress;
                const a = (1-t)*(1-t);
                const b = 2*(1-t)*t;
                const c = t*t;
                
                // Bezier calculation without new vector allocation
                // pos = a*p0 + b*p1 + c*p2
                this.pos.set(
                    a * this.p0.x + b * this.p1.x + c * this.p2.x,
                    0,
                    a * this.p0.z + b * this.p1.z + c * this.p2.z
                );
                
                // Calculate direction (derivative) approx by next pos diff or analytic?
                // Analytic derivative of Quad Bezier: 2(1-t)(p1-p0) + 2t(p2-p1)
                // tempVec = p1 - p0
                tempVec.subVectors(this.p1, this.p0).multiplyScalar(2 * (1-t));
                // tempVec2 = p2 - p1
                tempVec2.subVectors(this.p2, this.p1).multiplyScalar(2 * t);
                tempVec.add(tempVec2).normalize(); // Direction
                
                if (tempVec.lengthSq() > 0.0001) this.dir.copy(tempVec);
            }
        } else {
            // Straight movement: pos += dir * speed * delta
            tempVec.copy(this.dir).multiplyScalar(this.speed * delta);
            this.pos.add(tempVec);
        }

        if (distToCenter > CONFIG.BUILDING.RANGE && !isApproaching) {
            this.reset();
        }
    }
}
