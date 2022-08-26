import { Action_A, Action_D } from "./action.type"
import { Skill } from "./skill.type"

/* 
  - work has steady progress over time
  - work can be left and come back to later
*/
export type Work_D = Action_D & {
  workRating: number
  workRemaining: number
  skillTest: Skill
  energy?: number
}


export type Work_A = {
  [P in keyof Omit<Work_D, 'possibleOutcomes'>]?: Work_D[P]
} & Action_A & {
}

