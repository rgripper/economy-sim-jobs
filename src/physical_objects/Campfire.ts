import { Location, PhysicalObject } from "../Bucket";
import * as PIXI from "pixi.js";
import { Entity, generate_entity } from "../entities";

export type Campfire = PhysicalObject & {
  id: Entity;
  graphics: PIXI.Graphics;
};

const points = [
  [15.352820592559878, 45.17809361889958],
  [6.118624184397051, 41.53072487016907],
  [0, 33.86434380384162],
  [0.3142616922035817, 24.082928777486085],
  [6.693758679367603, 16.49194615334272],
  [13.768848500587046, 9.447844550013542],
  [16.220100490190084, 0],
  [21.805374246276912, 0.415696132928133],
  [27.540350500307973, 8.400953501381444],
  [28.362084870971735, 16.68344454243779],
  [35.09173162523657, 17.421143008768556],
  [39.07933829408139, 26.487546529842074],
  [37.03117111204192, 36.033509494829914],
  [29.784874789696183, 42.802971067000186],
  [24.318271337915213, 42.72001206064597],
  [24.091951424535367, 33.26931241145357],
  [18.715885072387756, 25.034738487750285],
  [14.394174069352447, 24.701696120202545],
  [10.058038246538489, 33.450579449627554],
  [13.336127666209359, 42.706600168033034],
].map(([x, y]) => [x * 0.5, y * 0.5]);

const size_x = Math.max(...points.map(([x, y]) => x));
const size_y = Math.max(...points.map(([x, y]) => y));

export const Campfire = {
  new(location: Location["location"]): Campfire {
    const graphics = create_graphics();
    return {
      id: generate_entity(),
      graphics: Object.assign(graphics, location),
      location,
      size: Campfire.size,
    };
  },
  size: { x: size_x, y: size_y },
};

const create_graphics = () => {
  const gr = new PIXI.Graphics();
  gr.beginFill(0xff4f3f, 1);
  // gr.lineStyle(1, 0x3fff7f, 1, 0);

  // draws a star:
  gr.drawPolygon(
    points.map(([x, y]) => new PIXI.Point(x - size_x / 2, y - size_y / 2))
  );

  gr.endFill();
  return gr;
};
