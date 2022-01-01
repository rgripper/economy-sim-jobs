import { Entity, generate_entity } from "../entities";
import {
  Location,
  PhysicalObject,
  CollisionBox,
} from "../Bucket";
import * as PIXI from "pixi.js";
import { ConstructionKind } from "./Construction";

export type ConstructionZone = PhysicalObject & {
  id: Entity;
  kind: ConstructionKind;
  graphics: PIXI.Graphics;
};

export const ConstructionZone = {
  new(
    location: Location,
    size: CollisionBox["size"],
    kind: ConstructionKind
  ): ConstructionZone {
    return {
      ...location,
      kind,
      size,
      id: generate_entity(),
      graphics: create_graphics(),
    };
  },
};

const create_graphics = () => {
  const area = 40;

  const gr = new PIXI.Graphics();
  gr.beginFill(0xcccccc, 1);
  gr.lineStyle(2, 0xaf7f3f, 1, 0);

  const half = area / 2;
  gr.drawRect(0 - half, 0 - half, area, area);

  gr.endFill();
  return gr;
};
