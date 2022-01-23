import { useState } from "react";
import {
  get_surrounding_cells_including_self,
  get_box_around_point,
  get_grid_from_box
} from "./space_helper";
import "./styles.css";

const world_box = { width: 400, height: 400 };
const box_size = 14;
export function get_random_box(size, world_box) {
  const top_left = {
    x: Math.max(0, Math.random() * world_box.width - size),
    y: Math.max(0, Math.random() * world_box.height - size)
  };
  return {
    top_left,
    bottom_right: {
      x: top_left.x + size,
      y: top_left.y + size
    }
  };
}

const init_occupied_boxes = new Array(20)
  .fill(0)
  .map(() => get_random_box(box_size, world_box));

const bounding_box_world = {
  top_left: { x: 0, y: 0 },
  bottom_right: { x: world_box.width, y: world_box.height }
};

export default function App() {
  const [occupied_boxes, set_occupied_boxes] = useState(init_occupied_boxes);
  const [found_boxes, set_found_boxes] = useState([]);

  const showBoxFinding = (x, y) => {
    console.log({
      x,
      y,
      col: Math.ceil(x / box_size - 0.5),
      row: Math.ceil(y / box_size - 0.5),
      box_size
    });
    const cell = {
      x: Math.ceil(x / box_size - 0.5),
      y: Math.ceil(y / box_size - 0.5)
    };

    const world_grid_box = get_grid_from_box(bounding_box_world, box_size);
    const iterator = get_surrounding_cells_including_self(cell, world_grid_box);
    addBox(true);
    function addBox(isInitial) {
      const { value: currentCell, done } = iterator.next();
      if (!done) {
        set_found_boxes((bs) => [
          ...bs,
          {
            ...get_box_around_point(currentCell, box_size),
            isInitial,
            cell: currentCell
          }
        ]);
        setTimeout(() => {
          addBox(false);
        }, 1);
      } else {
        // throw new Error("its done!");
      }
    }
  };
  return (
    <div
      style={{ ...world_box, border: "1px solid black", position: "relative" }}
      className="App"
      onClick={(e) => {
        showBoxFinding(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }}
    >
      {occupied_boxes.map((box) => (
        <div
          title={`(${box.top_left.x}, ${box.top_left.y})`}
          key={[
            box.bottom_right.x,
            box.bottom_right.y,
            box.top_left.x,
            box.top_left.y
          ].toString()}
          style={{
            position: "absolute",
            backgroundColor: "red",
            border: "1px solid black",
            left: box.top_left.x,
            top: box.top_left.y,
            width: box.bottom_right.x - box.top_left.x,
            height: box.bottom_right.y - box.top_left.y
          }}
        ></div>
      ))}

      {found_boxes.map((box) => (
        <div
          title={`(${box.top_left.x}, ${box.top_left.y}); cell = (${box.cell.x}, ${box.cell.y});`}
          key={[
            box.bottom_right.x,
            box.bottom_right.y,
            box.top_left.x,
            box.top_left.y
          ].toString()}
          style={{
            position: "absolute",
            opacity: 0.5,
            backgroundColor: box.isInitial ? "yellow" : "white",
            border: "1px solid black",
            left: box.top_left.x,
            top: box.top_left.y,
            width: box.bottom_right.x - box.top_left.x,
            height: box.bottom_right.y - box.top_left.y
          }}
        ></div>
      ))}
    </div>
  );
}
