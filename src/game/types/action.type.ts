import { Node_D } from "./node.type"
import { Outcome_A, Outcome_D } from "./outcome.type"

export type Action_D = Node_D & {
  possibleOutcomes: Outcome_D[]
}
export type Action_A = {
  possibleOutcomes?: Outcome_A[]
}