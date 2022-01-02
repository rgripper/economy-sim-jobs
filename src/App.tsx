import { useCallback } from "react";
import * as PIXI from "pixi.js";
import "./App.css";
import { initialize_game_world } from "./game_world/initializer";
import { plan_constructions } from "./game_world/settlement_manager/manager";

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
  const app = new PIXI.Application({
    width: 1200,
    height: 800,
    backgroundColor: 0x80e95b,
  });

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  ref.innerHTML = "";
  ref.appendChild(app.view);

  const world_box = {
    size: { x: app.view.width, y: app.view.height },
  };
  const new_entities = initialize_game_world(world_box);

  app.stage.addChild(...new_entities.map((x) => x.graphics));

  // const trees = new Array(50).fill(0).map(() =>
  //   createTree({
  //     x: Math.random() * app.view.width,
  //     y: Math.random() * app.view.height,
  //   })
  // );

  // const mushroomAreas = new Array(5).fill(0).map(() =>
  //   createMushroomArea({
  //     x: Math.random() * app.view.width,
  //     y: Math.random() * app.view.height,
  //   })
  // );

  // const workers = new Array(5).fill(0).map(() =>
  //   createWorker({
  //     x: Math.random() * app.view.width,
  //     y: Math.random() * app.view.height,
  //   })
  // );

  // const farms = new Array(3).fill(0).map(() =>
  //   createFarm({
  //     x: Math.random() * app.view.width,
  //     y: Math.random() * app.view.height,
  //   })
  // );

  // const houses = new Array(3).fill(0).map(() =>
  //   createHouse({
  //     x: Math.random() * app.view.width,
  //     y: Math.random() * app.view.height,
  //   })
  // );

  // // app.stage.addChild(createWorker());
  // trees.forEach((x) => app.stage.addChild(x));
  // workers.forEach((x) => app.stage.addChild(x));
  // mushroomAreas.forEach((x) => app.stage.addChild(x));
  // farms.forEach((x) => app.stage.addChild(x));
  // houses.forEach((x) => app.stage.addChild(x));

  // Add the bunny to the scene we are building
  // app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    const construction_zones = plan_constructions(world_box);
    console.log(construction_zones)
    if (construction_zones.length) {
      app.stage.addChild(...construction_zones.map((x) => x.graphics));
    }

    // each frame we spin the bunny around a bit
  });
}

// Tree (cutting wood) -> Wood
// Farm (farming) -> Food
// Block with mushrooms (collecting) -> Food
