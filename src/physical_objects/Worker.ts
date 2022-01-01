import { Location, PhysicalObject } from "../Bucket";
import * as PIXI from "pixi.js";
import { Entity, generate_entity } from "../entities";

export type Worker = PhysicalObject & {
  id: Entity;
  graphics: PIXI.Graphics;
};

export const Worker = {
  new(location: Location["location"]): Worker {
    const graphics = create_graphics();
    return {
      id: generate_entity(),
      graphics: Object.assign(graphics, location),
      location,
      size: { x: 4, y: 4 },
    };
  },
};

const create_graphics = () => {
  const size = 4;
  const gr = new PIXI.Graphics();
  //gr.beginFill();
  //gr.lineStyle(2, 0xffefcf, 1, 0);
  gr.beginFill(0xffefcf, 1);
  gr.drawCircle(size / 2, size / 2, size);
  gr.endFill();
  return gr;
};
