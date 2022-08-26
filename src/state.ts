
import { observable, reaction } from "mobx";
import { Game_D } from "./game/types/game.type.";
import { onTimePasses, pause, unpause } from "./services/time.service";

export type MainState = {
  game?: Game_D
  savedGame?: Game_D
  testMode: boolean
}

export const state: MainState = observable({testMode: true})


reaction(
  () => state?.game?.person.currentAction, (currentAction) => 
    currentAction ? unpause() : pause()
)