
import { Outcome_D, Outcome_A } from "../types/outcome.type"
import { createEffect } from "./effect.creator"
import { createNode } from "./node.creator"

export const createOutcome = (outcomeData: Outcome_A): Outcome_D =>{

  const outcome: Outcome_D = {
    ...createNode(),
    probability: 1,
    ...outcomeData,
    effects: outcomeData.effects?.map(createEffect) || [],

  }
  
  return outcome

}
