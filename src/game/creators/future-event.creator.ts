
import { FutureEvent_D, FutureEvent_A } from "../types/future-event.type"
import { createNode } from "./node.creator"
import { createOutcome } from "./outcome.creator"

export const createFutureEvent = (futureEventData: FutureEvent_A): FutureEvent_D =>{

  const futureEvent: FutureEvent_D = {
    ...createNode(),
    timeLeft: 0,
    ...futureEventData,
    possibleOutcomes: futureEventData.possibleOutcomes?.map(createOutcome) || [],

  }
  
  return futureEvent

}