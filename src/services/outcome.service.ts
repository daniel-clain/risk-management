import { runInAction } from "mobx";
import { createThing } from "../game/creators/thing.creator";
import { Outcome_D } from "../game/types/outcome.type";
import { Thing_D } from "../game/types/thing.type";
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
  console.log('executeOutcome :>> ', executeOutcome);
  const {person} = state.game!

  outcome.effects.forEach(effect => {
    const {stateModifier} = effect
    if(stateModifier){
      const {money, feeling} = effect.stateModifier!
      person.money += money || 0
      person.feeling.entertainment += feeling?.entertainment || 0
      person.feeling.food += feeling?.food || 0
      person.feeling.social += feeling?.social || 0
      person.feeling.comfort += feeling?.comfort || 0
      person.feeling.accomplishment += feeling?.accomplishment || 0
    }
    
    if(effect.delete){
      deleteFutureEvent()
  
      function deleteFutureEvent(){
        effect.delete!.futureEvents?.forEach(futureEvent => {
          
          console.log('deleting :>> ', futureEvent);
          const outcomePathToTop = getPathToTop({futureEvent})
          if(!outcomePathToTop){
            console.log('outcomePathToTop :>> ', outcomePathToTop);
          }
          const parentThing: Thing_D = outcomePathToTop[outcomePathToTop.length - 2]
          deleteById(parentThing.futureEvents, futureEvent.id)
          
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

 



  cleanup()

  


  function cleanup(){

    runInAction(() => {
      outcome.completed = true
    })

  }
}


