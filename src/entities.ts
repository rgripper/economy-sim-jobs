import { v4 } from "uuid";

export type Entity = string;

export const generate_entity = (): Entity => v4();

export const constructions = [];
