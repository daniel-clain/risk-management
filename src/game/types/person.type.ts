import { Energy } from "./energy.type"
import { Feeling } from "./feeling.type"
import { Health } from "./health.type"
import { Knowledge } from "./knowledge.type"
import { Puzzle_D } from "./puzzle.type"
import { Skill } from "./skill.type"
import { Thing_D } from "./thing.type"
import { Work_D } from "./work.type"


export type Person_D = {
  name: string
  energy: Energy
  health: Health
  money: number
  feeling: Feeling
  currentAction: Work_D | Puzzle_D | undefined
  knownThings: Thing_D[]
  knowledge: Knowledge
  skill: Skill
}


export type Person_A = {
  [P in keyof Person_D]?: Person_D[P]
} & {
  name: string
}
