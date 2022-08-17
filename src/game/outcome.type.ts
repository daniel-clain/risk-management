import { Energy_O, Feeling_O, Health_O } from "./person"

export type Outcome = {
  name: string
  moneyDiff?: number
  feelingDiff?: Feeling_O
  energyDiff?: Energy_O
  healthDiff?: Health_O
}