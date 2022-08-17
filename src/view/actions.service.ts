import { action, runInAction } from "mobx";
import { createGame, Game_D, Game_P } from "../game/game";
import { Person_P } from "../game/person";
import { state } from "./state";

export function initialSetup(){
  console.log('initialSetup');
  if(state.testMode){ //temp
    startNewGame()
  }
  loadSavedGame()
}

export async function loadSavedGame(): Promise<void>{
  await fetch('/load-game')
  .then(response => response.json())
  .then(action((savedGame: Game_D) => {
    if(savedGame){
      console.info(`Successfully fetched saved game data`, savedGame)
      state.savedGame = savedGame
      //temp
      //continueSavedGame()
    }
  }))
  .catch(x => {
    console.warn(`Failed to load game`, x)
  })
}

export function startNewGame() {
  runInAction(() => {
    state.game = createGame({
      personData: {
        gender: 'female',
        name: 'chris'
      }
    })
  })
}

export function continueSavedGame(){
  state.game = createGame(<Game_P>state.savedGame)
}

export function saveBeforeUnload(){
  // TD: make sure that this actually works
  function listener(){
    state.game!.save()
    return confirm()
  }

  document.addEventListener('beforeunload', listener);

  function removeEventListener(){
    document.removeEventListener('beforeunload', listener)
  }
  return removeEventListener

}

export function resetGame(){
  state.savedGame = undefined
  state.game = undefined
}