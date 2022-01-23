import { CollisionBox, Location, Point } from "../Bucket";
import { entities } from "./entities";
import { BoundingBox, find_free_box } from "./find_space";

export function get_random_free_location(size: CollisionBox["size"], world_box: CollisionBox): Location["location"] {
  return get_free_location_near(
    {
      location: {
        x: Math.random() * world_box.size.x,
        y: Math.random() * world_box.size.y,
      },
    },
    size,
    world_box
  );
}

export function get_random_free_location_near(
  ideal_location: Location,
  size: CollisionBox["size"],
  world_box: CollisionBox,
  distance: number
): Location["location"] {
  return get_free_location_near(
    {
      location: {
        x: ideal_location.location.x + (Math.random() - 0.5) * distance,
        y: ideal_location.location.y + (Math.random() - 0.5) * distance,
      },
    },
    size,
    world_box
  );
}

export function get_free_location_near(
  ideal_location: Location,
  size: CollisionBox["size"],
  world_box: CollisionBox
): Point {
  const point = find_free_box(
    ideal_location.location,
    {
      top_left: { x: 0, y: 0 },
      bottom_right: world_box.size,
    },
    Math.max(size.x, size.y),
    (entities as any[]).filter((x) => x.location).map(create_box_from_collision_box)
  );
  console.log("free point found: ", { ideal_location, point });
  return point!;
}

function create_box_from_collision_box(collision_box: CollisionBox & Location): BoundingBox {
  return {
    top_left: {
      x: collision_box.location.x - collision_box.size.x / 2 + 0.5,
      y: collision_box.location.y - collision_box.size.y / 2 + 0.5,
    },
    bottom_right: {
      x: collision_box.location.x + collision_box.size.x / 2 - 0.5,
      y: collision_box.location.y + collision_box.size.y / 2 - 0.5,
    },
  };
}
