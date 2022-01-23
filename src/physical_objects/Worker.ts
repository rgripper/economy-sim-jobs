import { Location, MovingTo, Point } from "../Bucket";
import * as PIXI from "pixi.js";
import { generate_entity } from "../entities";
import { BaseObject } from "./BaseObject";

export class Worker extends BaseObject implements Partial<MovingTo> {
  velocity: number = 2;
  moving_to?: {
    x: number;
    y: number;
  };

  static new(location: Location["location"]): Worker {
    const graphics = create_graphics(Worker.size);
    return Object.assign(new Worker(), {
      id: generate_entity(),
      graphics: Object.assign(graphics, location),
      location,
      size: Worker.size,
    });
  }

  static size = { x: 4, y: 4 };
}

const create_graphics = (size: Point) => {
  const gr = new PIXI.Graphics();
  //gr.beginFill();
  gr.lineStyle(1, 0x3f3f7f, 1, 0);
  gr.beginFill(0xafafff, 1);
  gr.drawCircle(size.x / 2, size.x / 2, size.x);
  gr.endFill();
  return gr;
};
