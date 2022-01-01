import { CollisionBox } from "../Bucket";
import { Campfire } from "../physical_objects/Campfire";
import { Tree } from "../physical_objects/Tree";
import { Worker } from "../physical_objects/Worker";
import { entities } from "./entities";
import { get_free_location_near, get_random_free_location } from "./locations";

export function initialize_game_world(world_box: CollisionBox) {
  const campfire = Campfire.new({
    x: world_box.size.x / 2,
    y: world_box.size.y / 2,
  });
  const new_entities = [
    campfire,
    ...new Array(50)
      .fill(0)
      .map(() => Tree.new(get_random_free_location(Tree.size, world_box))),
    ...new Array(4)
      .fill(0)
      .map(() => Worker.new(get_free_location_near(campfire, Worker.size, world_box))),
  ];
  entities.push(...new_entities);

  return new_entities;
}
