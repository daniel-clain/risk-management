
import { action, runInAction } from "mobx"
import { FutureEvent_D } from "../game/types/future-event.type"
import { twoDec } from "../helper-functions"
import { state } from "../state"
import { handleCurrentAction } from "./actions.service"
import { chooseOutcome, executeOutcome } from "./outcome.service"

let timeout

export function pause(){
  state.game!.paused = true
  clearTimeout(timeout)
}
export function unpause(){
  
  if(state.game!.paused == false) 
    throw 'should not have tried to unpause while unpaused'
  
  state.game!.paused = false
  timeout = setInterval(onTimePasses, 100)
}


export function onTimePasses(){
  const {game} = state
  const {person, time} = game!

  runInAction(() => {
    game!.time = twoDec(time + .1)
  })
  if(person.currentAction){
    handleCurrentAction()
  }
  updateFutureEvents()

  function updateFutureEvents(){
    person.knownThings.forEach(t => {
      t.futureEvents?.forEach(fe => {
        runInAction(() => {
          fe.timeLeft = twoDec(fe.timeLeft - 0.1)
        })
        if(fe.timeLeft <= 0){
          onTimesUp(fe)
          
        }
      })
    })

    
    function onTimesUp(futureEvent: FutureEvent_D){
      console.log('FutureEvent onTimesUp');
      const chosenOutcome = chooseOutcome(futureEvent.possibleOutcomes)
      executeOutcome(chosenOutcome)

      deleteFutureEvent()

      function deleteFutureEvent(){    
        console.log('delete FutureEvent');

        runInAction(() => {
          futureEvent.completed
        })

      }
    }

  }
  
}

