// In theory we should mine IronOre and have Iron smelting, but for now we simplify. Same for food.
// In more complex case we could have alternative resources for buildings and weapons (Wood vs ClayBlock, Iron vs Bronze, etc.)

import { Entity } from "./entities";
import { ChoreKind } from "./game_world/settlement_manager/prioritizer";

// Assumptions: villagers never die from hunger, but become severely slowed/somehow debilitated

export type WorkerChore = {
  worker_id: Entity;
  chore_kind: ChoreKind;
};

export type ResourceKind = "Wood" | "Food" | "Iron";

export type ResourceValue = { kind: ResourceKind; value: number };

// This means the amount of resources to have in advance, to quickly react to a need to build or repair something and prevent famine?
function get_min_resource_needs(population: number): ResourceValue[] {
  return [
    { kind: "Wood", value: 4 },
    { kind: "Food", value: 4 },
    { kind: "Iron", value: 4 },
  ];
}

export type Point = { x: number; y: number };
export type Location = { location: Point };
export type CollisionBox = { size: Point };
export type PlaceholderGap = { placeholder_gap: Point };
export type PhysicalObject = Location & CollisionBox;
export type MovingTo = { moving_to: Point };
// Chores
// Min requirements
// Actual requirements (orders to construct buildings, craft more weapons/armor)
//

// if house_count < population then build a house
