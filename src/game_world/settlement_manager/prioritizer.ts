import { ResourceValue } from "../../Bucket";

export type ChoreKind =
  | "Farming"
  | "CuttingTree"
  | "GatheringFood"
  | "Constructing"
  | "MiningIron";

export type ChorePriority = {
  priority: number;
  kind: ChoreKind;
};

type SettlementIndicators = {
    // 0 everyone is homeless, 1 everyone occupies a house, 1+ is there are some partially empty houses 
    living_spaces_per_person: number;
    // 0 there is no food, 1 there is enough for a day, 1+ is more 
    food_per_person_for_day: number;
}

export function calculate_indicators(stored_resources: ResourceValue[], population_count: number, house_space_count: number): SettlementIndicators {
    return {
        living_spaces_per_person: house_space_count/population_count,
        food_per_person_for_day: 0,
    }
}

type SettlementPriorities = ChorePriority[];

// construction needs
// militarism needs
// food needs