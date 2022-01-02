import { CollisionBox, Location } from "../Bucket";

export function get_random_free_location(
  size: CollisionBox["size"],
  world_box: CollisionBox
): Location["location"] {
  return {
    x: Math.random() * world_box.size.x,
    y: Math.random() * world_box.size.y,
  };
}

export function get_free_location_near(
  ideal_location: Location,
  size: CollisionBox["size"],
  world_box: CollisionBox
): Location["location"] {
  return {
    x: Math.random() * 50 - 25 + ideal_location.location.x,
    y: Math.random() * 50 - 25 + ideal_location.location.y,
  };
}
