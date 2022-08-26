import { Person_A, Person_D } from "./person.type"


export type Game_D = {
  time: number
  level: number
  person: Person_D
  paused: boolean
  gameOver?: {
    reason: string
  }
}


export type Game_A = {
  [P in keyof Omit<Game_D, 'person'>]?: Game_D[P]
} & {
  person: Person_A
}


