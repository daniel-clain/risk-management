
import { Puzzle_D } from "../game/types/puzzle.type";
import { Work_D } from "../game/types/work.type";
import { randomNumber, twoDec } from "../helper-functions";
import { chooseOutcome, executeOutcome } from "./outcome.service";
import { state } from "../state";
import { runInAction } from "mobx";
import { Outcome_D } from "../game/types/outcome.type";
import { FutureEvent_D } from "../game/types/future-event.type";
import { Node_D } from "../game/types/node.type";
import { getPathToTop } from "./main.service";
import { Action_D } from "../game/types/action.type";
import { Thing_D } from "../game/types/thing.type";

export function handleCurrentAction(){
  const {person} = state.game!
  const {currentAction} = person


  if(currentAction){
    if('skillTest' in currentAction){
      handleWork(currentAction as Work_D)
    }
    if('knowledgeTest' in currentAction){
      handlePuzzle(currentAction as Puzzle_D)
    }
  }



  function handlePuzzle(puzzle: Puzzle_D){
    const randomNum = randomNumber({from: 0, to: 100}) / 100
    if(puzzle.chanceToRealise > randomNum){
      onPuzzleSolved()

      function onPuzzleSolved(){
        console.log('puzzle solved, executing outcome');
        const chosenOutcome = chooseOutcome(puzzle.possibleOutcomes)
        executeOutcome(chosenOutcome)
        deletePuzzle()
      }
  
      function deletePuzzle(){    
        console.log('delete puzzle');
        delete person.currentAction
        runInAction(() => {
          puzzle.completed = true
        })
  
      }
    }
  }


  function handleWork(work: Work_D){
    runInAction(() => {
      work.workRemaining = twoDec(work.workRemaining - 0.1)
    })

    if(work.workRemaining <= 0){
      onWorkFinished()
    }

    function onWorkFinished(){
      console.log('work finished, executing outcome');
      const chosenOutcome = chooseOutcome(work.possibleOutcomes)
      executeOutcome(chosenOutcome)
      deleteWork()
    }

    function deleteWork(){    
      console.log('delete work');
      delete person.currentAction
      runInAction(() => {
        work.completed = true
      })

    }
  }
}
export function checkParentComplete(
  {outcome, work, puzzle, futureEvent}: 
  {
    outcome: Outcome_D, 
    work: Work_D, 
    puzzle: Puzzle_D, 
    futureEvent: FutureEvent_D
  }
){
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

}