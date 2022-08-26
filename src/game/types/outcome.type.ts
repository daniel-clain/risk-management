import { Effect_A, Effect_D } from "./effect.type"
import { Node_A, Node_D } from "./node.type"


export type Outcome_D = Node_D & {
  effects: Effect_D[]
  probability: number // defaults to equal chance as other undefined
}


export type Outcome_A = {
  [P in keyof Omit<Outcome_D, 'effects'>]?: Outcome_D[P]
} & {
  effects?: Effect_A[]
}

