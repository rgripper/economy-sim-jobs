import { Location, PhysicalObject } from "../Bucket";
import * as PIXI from "pixi.js";
import { Entity, generate_entity } from "../entities";

export type Tree = PhysicalObject & {
  id: Entity;
  graphics: PIXI.Graphics;
};

export const Tree = {
  new(location: Location["location"]): Tree {
    const graphics = create_graphics();
    return {
      id: generate_entity(),
      graphics: Object.assign(graphics, location),
      location,
      size: Tree.size,
    };
  },
  size: { x: 5, y: 5 },
};

const create_graphics = () => {
  const size = 14;
  const gr = new PIXI.Graphics();
  gr.beginFill(0x3a7f4f, 1);
  // gr.lineStyle(1, 0x3fff7f, 1, 0);
  gr.drawPolygon(
    [
      [0, size],
      [size / 2, 0],
      [size, size],
    ].map(([x, y]) => new PIXI.Point(x - size / 2, y - size / 2))
  );
  gr.endFill();
  return gr;
};
