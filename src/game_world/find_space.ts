export type BoundingBox = {
  top_left: Point;
  bottom_right: Point;
};

export type Point = { x: number; y: number };

export function is_box_within_box(box: BoundingBox, bounding_box: BoundingBox): boolean {
  return (
    box.top_left.x >= bounding_box.top_left.x &&
    box.top_left.y >= bounding_box.top_left.y &&
    box.bottom_right.x <= bounding_box.bottom_right.x &&
    box.bottom_right.y <= bounding_box.bottom_right.y
  );
}

function is_point_within_box({ x, y }: Point, { top_left, bottom_right }: BoundingBox): boolean {
  return x >= top_left.x && x <= bottom_right.x && y >= top_left.y && y <= bottom_right.y;
}

function is_box_intersecting_box(box_1: BoundingBox, box_2: BoundingBox): boolean {
  return (
    box_1.top_left.x <= box_2.bottom_right.x &&
    box_1.top_left.y <= box_2.bottom_right.y &&
    box_1.bottom_right.x >= box_2.top_left.x &&
    box_1.bottom_right.y >= box_2.top_left.y
  );
}

function* get_adjacent_points({ x, y }: Point, distance: number): Iterable<Point> {
  const topY = y - distance;
  const bottomY = y + distance;
  const leftX = x - distance;
  const rightX = x + distance;

  for (let offset_x = -distance; offset_x <= distance; offset_x++) {
    const currentX = x + offset_x;
    yield { x: currentX, y: topY };
    yield { x: currentX, y: bottomY };
  }

  for (let offset_y = 1 - distance; offset_y <= distance - 1; offset_y++) {
    const currentY = y + offset_y;
    yield { x: leftX, y: currentY };
    yield { x: rightX, y: currentY };
  }
}

export function* get_surrounding_cells_including_self(origin: Point, main_box: BoundingBox): Iterable<Point> {
  let distance = 1;
  yield origin;
  while (
    !is_box_within_box(main_box, {
      top_left: { x: origin.x - distance, y: origin.y - distance },
      bottom_right: { x: origin.x + distance, y: origin.y + distance },
    })
  ) {
    for (const point of get_adjacent_points(origin, distance)) {
      if (is_point_within_box(point, main_box)) {
        yield point;
      }
    }
    distance++;
  }
}

export function get_box_around_point(point: Point, box_size: number): BoundingBox {
  return {
    top_left: {
      x: point.x * box_size - box_size / 2,
      y: point.y * box_size - box_size / 2,
    },
    bottom_right: {
      x: point.x * box_size + box_size / 2,
      y: point.y * box_size + box_size / 2,
    },
  };
}

export function get_grid_from_box(world_box: BoundingBox, box_size: number): BoundingBox {
  return {
    top_left: world_box.top_left,
    bottom_right: {
      x: world_box.bottom_right.x / box_size,
      y: world_box.bottom_right.y / box_size,
    },
  };
}

export function find_free_box(
  origin: Point,
  world_box: BoundingBox,
  box_size: number,
  occupied_boxes: BoundingBox[]
): Point | null {
  const cell = {
    x: Math.ceil(origin.x / box_size),
    y: Math.ceil(origin.y / box_size),
  };
  const grid_box = get_grid_from_box(world_box, box_size);
  console.log("findFreeBox: origin", { origin, cell, box_size });
  let counter = 150;
  for (const point of get_surrounding_cells_including_self(cell, grid_box)) {
    const box = get_box_around_point(point, box_size);
    counter--;
    if (counter === 0) throw new Error("Enough!");
    if (!occupied_boxes.some((occupied_box) => is_box_intersecting_box(box, occupied_box))) {
      return {
        x: point.x * box_size + box_size / 2,
        y: point.y * box_size + box_size / 2,
      };
    } else {
      console.warn(
        "Collision",
        occupied_boxes.find((occupied_box) => is_box_intersecting_box(box, occupied_box)),
        point
      );
    }
  }
  return null;
}
