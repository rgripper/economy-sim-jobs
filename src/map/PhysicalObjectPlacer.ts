import { CollisionBox, Location } from "../Bucket";

export function get_random_free_location(
  box: CollisionBox,
  world_box: CollisionBox
): Location["location"] {
  return {
    x: Math.random() * world_box.size.x,
    y: Math.random() * world_box.size.y,
  };
}

export function get_free_location_near(
  ideal_location: Location,
  box: CollisionBox,
  world_box: CollisionBox
): Location {
  return ideal_location;
}
