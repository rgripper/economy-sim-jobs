import { generate_entity } from "../entities";
import { Location, CollisionBox } from "../Bucket";
import * as PIXI from "pixi.js";
import { blueprints, ConstructionKind } from "./Construction";
import { BaseObject } from "./BaseObject";

export class ConstructionZone extends BaseObject {
  kind!: ConstructionKind;
  static new(
    location: Location["location"],
    kind: ConstructionKind
  ): ConstructionZone {
    const graphics = create_graphics();
    return Object.assign(new ConstructionZone(), {
      location,
      kind,
      size: blueprints.find((x) => x.kind === kind)!.size,
      id: generate_entity(),
      graphics: Object.assign(graphics, location),
    });
  }
}

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
