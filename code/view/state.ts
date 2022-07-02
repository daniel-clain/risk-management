

import { observable } from "mobx";
import { Game } from "../game/game";

export const state = observable<AppState>({})

export interface AppState{
  activeGame?: Game,
  existingGame?: Game
}
