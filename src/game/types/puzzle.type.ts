/* 
  - spent time thinking about it, chance to figure it out
  - can have levels of progress ( max 5 )
  - each level has a knowledge check check (all levels withing range)
*/

import { Action_A, Action_D } from "./action.type"
import { Knowledge } from "./knowledge.type"

export type Puzzle_D = Action_D & {
  knowledgeTest: Knowledge
  chanceToRealise: number
}


export type Puzzle_A = {
  [P in keyof  Omit<Puzzle_D, 'possibleOutcomes'>]?: Puzzle_D[P]
} & Action_A & {
}
