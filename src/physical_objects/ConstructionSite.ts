import { generate_entity } from "../entities";
import { Location, Point } from "../Bucket";
import * as PIXI from "pixi.js";
import { blueprints, ConstructionKind } from "./House";
import { BaseObject } from "./BaseObject";

export class ConstructionSite extends BaseObject {
  kind!: ConstructionKind;
  static new(location: Location["location"], kind: ConstructionKind): ConstructionSite {
    const { size } = blueprints.find((x) => x.kind === kind)!;
    const graphics = create_graphics(size);
    return Object.assign(new ConstructionSite(), {
      location,
      kind,
      size,
      id: generate_entity(),
      graphics: Object.assign(graphics, location),
    });
  }
}

const create_graphics = (size: Point) => {
  const gr = new PIXI.Graphics();
  gr.beginFill(0xcccccc, 1);
  gr.lineStyle(2, 0xaf7f3f, 1, 0);

  const half_x = size.x / 2;
  const half_y = size.y / 2;
  gr.drawRect(0 - half_x, 0 - half_y, size.x, size.y);

  gr.endFill();
  return gr;
};
