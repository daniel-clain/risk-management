import { Thing_D, Thing_A } from "../types/thing.type"
import { createFutureEvent } from "./future-event.creator"
import { createNode } from "./node.creator"
import { createPuzzle } from "./puzzle.creator"
import { createWork } from "./work.creator"

export const createThing = (thingData: Thing_A): Thing_D =>{

  const thing: Thing_D = {
    ...createNode(),
    ...thingData,
    futureEvents: thingData.futureEvents?.map(createFutureEvent) || [],
    work: thingData.work?.map(createWork) || [],
    puzzles: thingData.puzzles?.map(createPuzzle) || [],
  }
  
  return thing

}