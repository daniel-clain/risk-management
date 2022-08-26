import { action, runInAction } from "mobx";
import path from "path";
import { createThing } from "../game/creators/thing.creator";
import { Action_D } from "../game/types/action.type";
import { StateModifier } from "../game/types/effect.type";
import { FutureEvent_D } from "../game/types/future-event.type";
import { Node_D } from "../game/types/node.type";
import { Outcome_D } from "../game/types/outcome.type";
import { Puzzle_D } from "../game/types/puzzle.type";
import { Thing_D } from "../game/types/thing.type";
import { Work_D } from "../game/types/work.type";
import { randomNumber, deleteById } from "../helper-functions";
import { state } from "../state";
import { getPathToTop } from "./main.service";


export function chooseOutcome(possibleOutcomes: Outcome_D[]): Outcome_D{

  const remainingProbability = possibleOutcomes.reduce((x, po) => {
    return po.probability ? x - po.probability : x
  }, 1)

  if(remainingProbability < 0){
    console.log('error :>> remaining probability should never less than 0', remainingProbability);
  }
  if(remainingProbability == 0 && possibleOutcomes.some(po => !po.probability)){
    console.log('error :>> outcome with no probability set will receive 0 remaining probability because others have used it all', remainingProbability);
  }
  const noProbabilityCount = possibleOutcomes.filter(po => !po.probability).length

  const updatedPossibleOutcomes: Outcome_D[] = possibleOutcomes.map(po => ({...po, probability: po.probability ? po.probability : remainingProbability/noProbabilityCount}))

  const randomNum = randomNumber({from: 0, to: 100})/100
  let count = 0
  const selectedOutcome = updatedPossibleOutcomes.find(po => {
    if(randomNum < count + po.probability!)
      return po
    else {
      count += po.probability!
      return false
    }
  })
  if(!selectedOutcome)
    throw 'should have found possible outcome'
  return selectedOutcome
}


export function executeOutcome(outcome: Outcome_D){
  const {person} = state.game!

  runInAction(() => {
    outcome.completed = true

    outcome.effects.forEach(effect => {



      if(effect.stateModifier){
        modifyPersonState(effect.stateModifier!)
      }
    
      if(effect.delete){
        deleteFutureEvent()
    
        function deleteFutureEvent(){
          

          effect.delete!.futureEvents?.forEach(futureEvent => {
            const pathToTop: Node_D[] = getPathToTop({futureEvent})
            pathToTop[1]!.disabled = true       
            checkParentComplete({futureEvent})
          })
        }
      }
      if(effect.create){
        createThing()
    
        function createThing(){
          effect.create!.things?.forEach(thing => {
            
            console.log('creating :>> ', thing);
            runInAction(() => {
              state.game?.person.knownThings.push(thing)
            })
            
            
          })
        }
      }

    })
    
  })
}

export function modifyPersonState(stateModifier: StateModifier){
  const {person} = state.game!

  const {money, feeling, health, energy} = stateModifier
  person.money += money || 0
  person.feeling.entertainment += feeling?.entertainment || 0
  person.feeling.food += feeling?.food || 0
  person.feeling.social += feeling?.social || 0
  person.feeling.comfort += feeling?.comfort || 0
  person.feeling.accomplishment += feeling?.accomplishment || 0

  
  person.feeling.accomplishment += feeling?.accomplishment || 0

}

export function checkParentComplete(
  {outcome, work, puzzle, futureEvent}: 
  {
    outcome?: Outcome_D, 
    work?: Work_D, 
    puzzle?: Puzzle_D, 
    futureEvent?: FutureEvent_D
  }
){
  if(futureEvent){
    const pathToTop: Node_D[] = getPathToTop({futureEvent})    
    const futureEventThing = pathToTop[0] as Thing_D


    if(
      futureEventThing.work?.every(w => w.completed || w.disabled) &&
      futureEventThing.puzzles?.every(p => p.completed || p.disabled) &&
      futureEventThing.futureEvents?.every(fe => fe.completed || fe.disabled)
    ) {
      runInAction(() => {
        futureEventThing.completed = true
      })
      console.log('futureEventThing completed :>> ', futureEventThing);
    }
}
  if(outcome){
    const outcomePathToTop: Node_D[] = getPathToTop({outcome})    
    const outcomeParent = outcomePathToTop[outcomePathToTop.length - 2] as Action_D
    runInAction(() => {
      outcomeParent.completed = true
    })


    const outcomeThing = outcomePathToTop[0] as Thing_D
    if(
      outcomeThing.work?.every(w => w.completed || w.disabled) &&
      outcomeThing.puzzles?.every(p => p.completed || p.disabled) &&
      outcomeThing.futureEvents?.every(fe => fe.completed || fe.disabled)
    ) {
      runInAction(() => {
        outcomeThing.completed = true
      })
      console.log('outcomeThing completed :>> ', outcomeThing);
    }
  }
  if(work){
    const workPathToTop: Node_D[] = getPathToTop({work})    
    const workThing = workPathToTop[0] as Thing_D


    if(
      workThing.work?.every(w => w.completed || w.disabled) &&
      workThing.puzzles?.every(p => p.completed || p.disabled) &&
      workThing.futureEvents?.every(fe => fe.completed || fe.disabled)
    ) {
      runInAction(() => {
        workThing.completed = true
      })
      console.log('workThing completed :>> ', workThing);
    }
  }
  if(puzzle){
    const puzzlePathToTop: Node_D[] = getPathToTop({puzzle})    
    const puzzleThing = puzzlePathToTop[0] as Thing_D


    if(
      puzzleThing.work?.every(w => w.completed || w.disabled) &&
      puzzleThing.puzzles?.every(p => p.completed || p.disabled) &&
      puzzleThing.futureEvents?.every(fe => fe.completed || fe.disabled)
    ) {
      runInAction(() => {
        puzzleThing.completed = true
      })
      console.log('puzzleThing completed :>> ', puzzleThing);
    }
  }
  console.log('knownThings', state.game?.person.knownThings);
}


