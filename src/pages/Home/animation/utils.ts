import { Vector3, Object3D, Matrix4 } from 'three';

// Reuse vectors to avoid Garbage Collection (GC) thrashing
export const tempVec = new Vector3();
export const tempVec2 = new Vector3();
export const tempObj = new Object3D();
export const tempMatrix = new Matrix4();
