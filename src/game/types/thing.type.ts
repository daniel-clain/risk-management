
import { FutureEvent_A, FutureEvent_D } from "./future-event.type"
import { Node_D } from "./node.type"
import { Puzzle_A, Puzzle_D } from "./puzzle.type"
import { Work_A, Work_D } from "./work.type"



export type Thing_D = Node_D & {
  work: Work_D[]
  puzzles: Puzzle_D[]
  futureEvents: FutureEvent_D[]
}

export type Thing_A = {
  [P in keyof Omit<Thing_D, 'work' | 'puzzles' | 'futureEvents'>]?: Thing_D[P]
} & {
  work?: Work_A[]
  puzzles?: Puzzle_A[]
  futureEvents?: FutureEvent_A[]
}
