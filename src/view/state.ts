
import { observable } from "mobx";
import { Game, Game_D } from "../game/game";

export type MainState = {
  game?: Game
  savedGame?: Game_D
  testMode: boolean
}

export const state: MainState = observable({testMode: true})