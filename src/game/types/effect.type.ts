import { Energy } from "./energy.type"
import { Feeling } from "./feeling.type"
import { FutureEvent_D } from "./future-event.type"
import { Health } from "./health.type"
import { Knowledge } from "./knowledge.type"
import { Node_A, Node_D } from "./node.type"
import { Outcome_D } from "./outcome.type"
import { Puzzle_D } from "./puzzle.type"
import { Skill } from "./skill.type"
import { Thing_D } from "./thing.type"
import { Work_D } from "./work.type"

export type Effect_D = Node_D & {
  create?: {
    futureEvents?: FutureEvent_D[]
    puzzles?: Puzzle_D[]
    work?: Work_D[]
    outcomes?: Outcome_D[]
    things?: Thing_D[]
  }
  delete?: {
    futureEvents?: FutureEvent_D[]
    puzzles?: Puzzle_D[]
    work?: Work_D[]
    outcomes?: Outcome_D[]
    things?: Thing_D[]
  }
  stateModifier?: {
    money?: number
    feeling?: Feeling
    energy?: Energy
    health?: Health
    skill?: Skill
    knowledge?: Knowledge
  }
  outcomeModifier?:{
    existingRef: Outcome_D
    updated: Outcome_D
  }
  workModifier?: {
    existingRef: Work_D
    updated: Work_D
  }
  puzzleModifier?: {
    existingRef: Puzzle_D
    updated: Puzzle_D
  }
}

export type Effect_A = {
  [P in keyof Effect_D]?: Effect_D[P]
} & {
}

