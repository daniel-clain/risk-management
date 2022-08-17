import { Action_D } from "./action.type"

export type Thing = {
  name: string
  details?: string
  actions?: Action_D[]
  futureEvents?: FutureEvent[]
}


type FutureEvent = {
  name
  timeLeft: number
  effect: () => Thing
}
