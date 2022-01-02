import {
  CollisionBox,
  PhysicalObject,
  ResourceValue,
  Location,
  PlaceholderBox,
  PlaceholderGap,
} from "../Bucket";
import * as PIXI from "pixi.js";
import { Entity, generate_entity } from "../entities";
import { BaseObject } from "./BaseObject";

export type ConstructionKind = "Farm" | "House" | "Mine" | "Workshop";

export type ConstructionBlueprint = CollisionBox & {
  graphics: PIXI.Graphics;
  kind: ConstructionKind;
  resources: ResourceValue[];
  work_units: number; // Defines how long a worker would build it for. Could be decreased by having multiple workers, or worker having a better Construction skill
};

export class Construction extends BaseObject implements PlaceholderGap {
  placeholder_gap!: { x: number; y: number; };
  kind!: ConstructionKind;
  resources!: ResourceValue[];
  work_units!: number;

  static new(location: Location, kind: ConstructionKind): Construction {
    const blueprint = blueprints.find((x) => x.kind === kind)!;
    return Object.assign(new Construction(), {
      ...location,
      placeholder_gap: { x: 8, y: 8 },
      size: blueprint.size,
      graphics: blueprint.graphics,
      id: generate_entity(),
      kind,
    });
  }
}

const create_farm = () => {
  const area = 8 * 10;

  const gr = new PIXI.Graphics();
  gr.beginFill();
  gr.lineStyle(2, 0xffefcf, 1, 0);

  const colCount = Math.ceil(area / 8);

  const rowCount = Math.ceil(area / 4);

  const rows = new Array(rowCount)
    .fill(0)
    .map((_, row) =>
      new Array(colCount)
        .fill(0)
        .map((_, col) => ({ x: col * 8 + (row % 2 ? 0 : 4), y: row * 4 }))
    );

  const points = rows.flat();

  points.forEach(({ x, y }) => {
    gr.moveTo(x - area / 2, y - area / 2);
    gr.lineTo(x - area / 2, y - area / 2 + 4);
  });

  gr.endFill();
  return gr;
};

const create_house = () => {
  const area = 40;

  const gr = new PIXI.Graphics();
  gr.beginFill(0xdfaf7f, 1);
  gr.lineStyle(2, 0xaf7f3f, 1, 0);

  const half = area / 2;
  gr.drawRect(0 - half, 0 - half, area, area);

  gr.moveTo(1, 0 - area / 2);
  gr.lineTo(1, area / 2);

  gr.lineStyle(2, 0x3f3f00, 1, 0);
  gr.drawCircle(area / 4 - half, area / 4 - half, 4);

  gr.endFill();
  return gr;
};

export const blueprints: ConstructionBlueprint[] = [
  {
    kind: "Farm",
    resources: [{ kind: "Wood", value: 1 }],
    work_units: 1,
    graphics: create_farm(),
    size: { x: 18, y: 18 },
  },
  {
    kind: "House",
    resources: [{ kind: "Wood", value: 1 }],
    work_units: 1,
    graphics: create_house(),
    size: { x: 10, y: 10 },
  },
  // {
  //   kind: "Mine",
  //   resources: [{ kind: "Wood", value: 1 }],
  //   work_units: 1,
  // },
  // {
  //   kind: "Workshop",
  //   resources: [{ kind: "Wood", value: 1 }],
  //   work_units: 1,
  // },
];
