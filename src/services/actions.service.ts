
import { Puzzle_D } from "../game/types/puzzle.type";
import { Work_D } from "../game/types/work.type";
import { randomNumber, twoDec } from "../helper-functions";
import { checkParentComplete, chooseOutcome, executeOutcome } from "./outcome.service";
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
        delete person.currentAction
        runInAction(() => {
          puzzle.completed = true
        })
        checkParentComplete({puzzle})
      }
    }
  }


  function handleWork(work: Work_D){
    runInAction(() => {
      work.workRemaining = twoDec(work.workRemaining - 0.1)
    })

    if(work.workRemaining <= 0){
      onWorkFinished()

      function onWorkFinished(){
        const chosenOutcome = chooseOutcome(work.possibleOutcomes)
        executeOutcome(chosenOutcome)
        delete person.currentAction
        if(!work.recurring){
          runInAction(() => {
            work.completed = true
          })
          checkParentComplete({work})
        }
      }
    }
  }
}
