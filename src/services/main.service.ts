import { action, runInAction } from "mobx";
import { createGame } from "../game/creators/game.creator";
import { FutureEvent_D } from "../game/types/future-event.type";
import { Game_D } from "../game/types/game.type.";
import { Outcome_D } from "../game/types/outcome.type";
import { Person_D } from "../game/types/person.type";
import { Puzzle_D } from "../game/types/puzzle.type";
import { Work_D } from "../game/types/work.type";
import { state } from "../state";

export function initialSetup(){
  if(state.testMode){
    startNewGame()
  }
  loadSavedGame()
}

export async function loadSavedGame(): Promise<void>{
  await fetch('/load-game')
  .then(response => response.json())
  .then(action((savedGame: Game_D) => {
    if(savedGame){
      state.savedGame = savedGame
    }
  }))
  .catch(x => {
    console.warn(`Failed to load game`, x)
  })
}

export function startNewGame() {
  runInAction(() => {
    state.game = createGame({
      person: {
        name: 'chris'
      }
    })
  })
}

export function continueSavedGame(){
  state.game = createGame(state.savedGame!)
}

export function resetGame(){
  state.savedGame = undefined
  state.game = undefined
}



/* function convertGameObject(): Game_D{
  return {
    ...state.game!,
    person: convertPersonObject()
  }
} */
/* function convertPersonObject(): Person_D{
  let personData: Person_D = {...state.game!.person}
  return personData
}


function save(){
  const gameData = convertGameObject()
  fetch('/save-game', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  })
} */




export function getPathToTop(
  {outcome, futureEvent, work, puzzle}:
  {
    outcome?: Outcome_D, 
    futureEvent?: FutureEvent_D, 
    work?: Work_D, 
    puzzle?: Puzzle_D
  }
): any[]{
  // search for outcome in known things, when found, store path to top
  let pathToTop

  if(outcome){
    state.game!.person.knownThings.find(t => 
      t.work?.find(w => 
        w.possibleOutcomes.find(o => {
        if(o.id == outcome.id){
          pathToTop = [t, w, o]
          return true
        } else return false
      })) ||
      t.puzzles?.find(p => p.possibleOutcomes.find(o => {
        if(o.id == outcome.id){
          pathToTop = [t, p, o]
          return true
        } else return false
      })) ||
      t.futureEvents?.find(fe => fe.possibleOutcomes.find(o => {
        if(o.id == outcome.id){
          pathToTop = [t, fe, o]
          return true
        } else return false
      }))
    )
  }


  if(futureEvent){
    state.game!.person.knownThings.find(t => 
      t.futureEvents?.find(fe => {
        if(fe.id == futureEvent.id){
          pathToTop = [t, fe]
          return true
        } else return false
      })
    )
  }
  
  if(work){
    state.game!.person.knownThings.find(t => 
      t.work?.find(w => {
        if(w.id == work.id){
          pathToTop = [t, w]
          return true
        } else return false
      })
    )
  }

  return pathToTop


}

export function findEvent(futureEventId){

  let event
  state.game!.person.knownThings.find(t => 
    t.futureEvents?.find(fe => {
      if(fe.id == futureEventId){
        event = fe
        return true
      } else return false
    })
  )

  if(!event){
    throw 'Should have found event'
  }

  return event
}