import { useCallback } from "react";
import * as PIXI from "pixi.js";
import "./App.css";
import { initialize_game_world } from "./game_world/initializer";
import { plan_constructions } from "./game_world/settlement_manager/planner";
import { entities } from "./game_world/entities";
import { Worker } from "./physical_objects/Worker";
import { Location, MovingTo } from "./Bucket";

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

  app.ticker.add(() => {
    const construction_sites = plan_constructions(world_box);
    if (construction_sites.length) {
      app.stage.addChild(...construction_sites.map((x) => x.graphics));
    }

    const moving_workers = entities.filter(
      (x) => x instanceof Worker && x.moving_to
    ) as Worker[];
    moving_workers.forEach((worker) => {
      if (!worker.moving_to) {
        return;
      }

      if (
        worker.moving_to.x - worker.location.x < 4 &&
        worker.moving_to.y - worker.location.y < 4
      ) {
        worker.moving_to = undefined;
      } else {
        worker.moving_to.x +=
          worker.moving_to.x < worker.location.x
            ? -worker.velocity
            : worker.velocity;
        worker.moving_to.y +=
          worker.moving_to.y < worker.location.y
            ? -worker.velocity
            : worker.velocity;
      }
    });
    // each frame we spin the bunny around a bit
  });
}

// Tree (cutting wood) -> Wood
// Farm (farming) -> Food
// Block with mushrooms (collecting) -> Food
