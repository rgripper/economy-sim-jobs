import { CollisionBox } from "../../Bucket";
import { Worker } from "../../physical_objects/Worker";
import { Campfire } from "../../physical_objects/Campfire";
import { House } from "../../physical_objects/House";
import { ConstructionSite } from "../../physical_objects/ConstructionSite";
import { entities } from "../entities";
import { get_free_location_near } from "../locations";

export function plan_constructions(world_box: CollisionBox) {
  const population_count = entities.filter((x) => x instanceof Worker).length;

  const house_count = entities.filter(
    (x) =>
      x instanceof House ||
      (x instanceof ConstructionSite && x.kind === "House")
  ).length;

  const campfire = entities.find((x) => x instanceof Campfire)! as Campfire;

  const new_house_count = population_count - house_count;
  if (new_house_count <= 0) {
    return [];
  }

  const construction_sites = new Array(new_house_count)
    .fill(0)
    .map(() =>
      ConstructionSite.new(
        get_free_location_near(campfire, campfire.size, world_box),
        "House"
      )
    );

  entities.push(...construction_sites);

  return construction_sites;
}
