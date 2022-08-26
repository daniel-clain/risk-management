
import { action, runInAction } from "mobx"
import { FutureEvent_D } from "../game/types/future-event.type"
import { Person_D } from "../game/types/person.type"
import { is, twoDec } from "../helper-functions"
import { state } from "../state"
import { handleCurrentAction } from "./actions.service"
import { chooseOutcome, executeOutcome, modifyPersonState } from "./outcome.service"

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

  addTime()

  if(person.currentAction){
    handleCurrentAction()
  }
  updateFutureEvents()

  personStatsDecay()

  function addTime(){    
    runInAction(() => {
      game!.time = twoDec(time + .1)
    })
  }

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

  function personStatsDecay(){
    const {person} = state.game!
    modifyPersonState({
      energy: {
        drugs: -.1,
        food: -.1,
        sleep: -.1,
        mental: -.1
      },
      feeling: {
        food: -.1,
      }
    })

    Object.keys(person).
    filter(key => is(key).in(
      <(keyof Person_D)[]>['energy', 'feeling', 'health']
    )).
    forEach(key => {
      Object.keys(person[key]).forEach(prop => {
        console.log(`taking .1 off ${key} ${prop}`);
        person[key][prop] -= .1
      })
    })
  }
  
}

const test: (keyof Person_D)[] = ["energy"]
