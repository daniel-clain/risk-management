
import { Outcome } from "./outcome.type"


export type Action_D = {
  name
  progress?: number
  requirement: {
    skill?: number
    money?: number
    energy?: number
  }
  outcome?: Outcome
  chanceOfFailure?: number
  delayBeforeAction?: number
  delayAfterAction?: number
  subActions?: Action_D[]
}
