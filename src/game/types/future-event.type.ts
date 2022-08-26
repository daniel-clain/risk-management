import { Action_A, Action_D } from "./action.type"


export type FutureEvent_D = Action_D & {
  timeLeft: number
}

export type FutureEvent_A = {
  [P in keyof Omit<FutureEvent_D, 'possibleOutcomes'>]?: FutureEvent_D[P]
} & Action_A & {

}

