
import { Work_D, Work_A } from "../types/work.type"
import { createNode } from "./node.creator"
import { createOutcome } from "./outcome.creator"

export const createWork = (workData: Work_A): Work_D =>{

  const work: Work_D = {
    ...createNode(),
    workRemaining: 1,
    workRating: 1,
    skillTest: {
      areas: []
    },
    ...workData,
    possibleOutcomes: workData.possibleOutcomes?.map(createOutcome) || [],

  }
  
  return work

}