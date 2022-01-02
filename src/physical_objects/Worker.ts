import { Location } from "../Bucket";
import * as PIXI from "pixi.js";
import { generate_entity } from "../entities";
import { BaseObject } from "./BaseObject";

export class Worker extends BaseObject {
  static new(location: Location["location"]): Worker {
    const graphics = create_graphics();
    return Object.assign(new Worker(), {
      id: generate_entity(),
      graphics: Object.assign(graphics, location),
      location,
      size: Worker.size,
    });
  }

  static size = { x: 4, y: 4 };
}

const create_graphics = () => {
  const size = 4;
  const gr = new PIXI.Graphics();
  //gr.beginFill();
  gr.lineStyle(1, 0x3f3f7f, 1, 0);
  gr.beginFill(0xafafff, 1);
  gr.drawCircle(size / 2, size / 2, size);
  gr.endFill();
  return gr;
};
