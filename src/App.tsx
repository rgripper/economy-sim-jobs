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

  const workers = new Array(5).fill(0).map(() =>
    createWorker({
      x: Math.random() * app.view.width,
      y: Math.random() * app.view.height,
    })
  );

  // app.stage.addChild(createWorker());
  trees.forEach((x) => app.stage.addChild(x));
  workers.forEach((x) => app.stage.addChild(x));

  // Add the bunny to the scene we are building
  // app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
  });
}
