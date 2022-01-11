import { generate_entity } from "../entities";
import { Location, CollisionBox } from "../Bucket";
import * as PIXI from "pixi.js";
import { blueprints, ConstructionKind } from "./House";
import { BaseObject } from "./BaseObject";

export class ConstructionSite extends BaseObject {
  kind!: ConstructionKind;
  static new(
    location: Location["location"],
    kind: ConstructionKind
  ): ConstructionSite {
    const graphics = create_graphics();
    return Object.assign(new ConstructionSite(), {
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
