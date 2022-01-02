import { PhysicalObject } from "../Bucket";
import * as PIXI from "pixi.js";

export class BaseObject implements PhysicalObject {
    location!: { x: number; y: number };
    size!: { x: number; y: number };
    id!: string;
    graphics!: PIXI.Graphics;
}
