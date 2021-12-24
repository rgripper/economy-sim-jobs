import { useCallback } from "react";
import * as PIXI from "pixi.js";
import "./App.css";

function App() {
  const initApp = useCallback((ref: HTMLElement | null) => {
    if (ref) {
      createApp(ref);
    }
  }, []);

  return <div ref={initApp}></div>;
}

export default App;

function createApp(ref: HTMLElement) {
  const app = new PIXI.Application({ width: 1200, height: 800 });

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  ref.innerHTML = "";
  ref.appendChild(app.view);

  const createWorker = ({ x, y }: { x: number; y: number }) => {
    const size = 4;
    const gr = new PIXI.Graphics();
    //gr.beginFill();
    //gr.lineStyle(2, 0xffefcf, 1, 0);
    gr.beginFill(0xffefcf, 1);
    gr.drawCircle(size / 2, size / 2, size);
    gr.endFill();
    gr.x = x;
    gr.y = y;
    return gr;
  };

  const createMushroomArea = ({ x, y }: { x: number; y: number }) => {
    const maxSize = 2;
    const maxNumber = 6;
    const maxArea = 30;

    const gr = new PIXI.Graphics();
    //gr.beginFill();
    //gr.lineStyle(2, 0xffefcf, 1, 0);
    gr.beginFill(0xff3f1f, 1);

    const mushrooms = new Array(Math.ceil(1 + Math.random() * (maxNumber - 1)))
      .fill(0)
      .map(() => ({
        size: 1 + Math.random() * (maxSize - 1),
        x: Math.random() * maxArea,
        y: Math.random() * maxArea,
      }));

    mushrooms.forEach(({ size, x, y }) => gr.drawCircle(x, y, size));

    gr.endFill();
    gr.x = x;
    gr.y = y;
    return gr;
  };

  const createFarm = ({ x, y }: { x: number; y: number }) => {
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

    console.log(rows, colCount);

    const points = rows.flat();

    points.forEach(({ x, y }) => {
      gr.moveTo(x - area / 2, y - area / 2);
      gr.lineTo(x - area / 2, y - area / 2 + 4);
    });

    gr.endFill();
    gr.x = x;
    gr.y = y;
    return gr;
  };

  const createHouse = ({ x, y }: { x: number; y: number }) => {
    const area = 40;

    const gr = new PIXI.Graphics();
    gr.beginFill( 0xdfaf7f, 1);
    gr.lineStyle(2, 0xaf7f3f, 1, 0);

    const half = area / 2;
    gr.drawRect(0 - half, 0 - half, area, area);

    gr.moveTo(1, 0 - area / 2);
    gr.lineTo(1, area / 2);

    gr.lineStyle(2, 0x3f3f00, 1, 0);
    gr.drawCircle(area / 4 - half, area / 4 - half, 4);

    gr.endFill();
    gr.x = x;
    gr.y = y;
    return gr;
  };

  const createTree = ({ x, y }: { x: number; y: number }) => {
    const size = 14;
    const gr = new PIXI.Graphics();
    gr.beginFill();
    gr.lineStyle(1, 0x3fff7f, 1, 0);
    gr.drawPolygon(
      [
        [0, size],
        [size / 2, 0],
        [size, size],
      ].map(([x, y]) => new PIXI.Point(x - size / 2, y - size / 2))
    );
    gr.x = x;
    gr.y = y;
    gr.endFill();
    return gr;
  };

  const trees = new Array(50).fill(0).map(() =>
    createTree({
      x: Math.random() * app.view.width,
      y: Math.random() * app.view.height,
    })
  );

  const mushroomAreas = new Array(5).fill(0).map(() =>
    createMushroomArea({
      x: Math.random() * app.view.width,
      y: Math.random() * app.view.height,
    })
  );

  const workers = new Array(5).fill(0).map(() =>
    createWorker({
      x: Math.random() * app.view.width,
      y: Math.random() * app.view.height,
    })
  );

  const farms = new Array(3).fill(0).map(() =>
    createFarm({
      x: Math.random() * app.view.width,
      y: Math.random() * app.view.height,
    })
  );

  const houses = new Array(3).fill(0).map(() =>
    createHouse({
      x: Math.random() * app.view.width,
      y: Math.random() * app.view.height,
    })
  );

  // app.stage.addChild(createWorker());
  trees.forEach((x) => app.stage.addChild(x));
  workers.forEach((x) => app.stage.addChild(x));
  mushroomAreas.forEach((x) => app.stage.addChild(x));
  farms.forEach((x) => app.stage.addChild(x));
  houses.forEach((x) => app.stage.addChild(x));

  // Add the bunny to the scene we are building
  // app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
  });
}

// Tree (cutting wood) -> Wood
// Farm (farming) -> Food
// Block with mushrooms (collecting) -> Food
