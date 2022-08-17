import { autorun, observable, runInAction } from "mobx"
import { HasTime, hasTime } from "../composition/has-time"
import { twoDec } from "../helper-functions"
import { state } from "../view/state"
import { createPerson, Person, Person_D, Person_P } from "./person"

export type Game_D = {
  time: number
  level: number
  personData: Person_D
}


type Game_O = {
  [P in keyof Game_D]?: Game_D[P]
}
export type Game_P = Omit<Game_O, 'personData'> & {
  personData: Person_P
}

type GameOver = {
  reason: string
}

export type Game = Omit<Game_D, 'personData'> & HasTime & {
  level: number
  person: Person
  save()
  convertToDataObject()
  gameOver?: GameOver
}

export const createGame = (gameData: Game_P): Game =>{

  console.log('Create Game');


  const game: Game = Object.assign({
    level: 0,
    person: createPerson(gameData.personData),
    ...gameData,
    convertToDataObject,
    save,
  }, hasTime(gameData.time)) 
  



  return game
}


autorun((x) => {
  console.log('x :>> ', x);
  if(!state.game) return
  onTimePassed()
})


function onTimePassed(){
  console.log('time: ', state.game!.time)

  const {person} = state.game!
  const {currentAction, knownThings } = person
  
  person.feeling.entertainment += .01

  /* updateBaseStats()
  checkThingsForTimeEvent()
  saveEvery10Seconds()
  if(currentAction){
    workCurrentAction()
  } */

  /* implementation */

  function checkThingsForTimeEvent(){
    knownThings?.forEach(t => {
      t.futureEvents?.filter(e => {
        e.timeLeft --
        if(e.timeLeft == 0){
          e.effect()
          return false
        }
        return true
      })
    })
  }


  function updateBaseStats(){
    const {feeling, health, energy} = person
    
    runInAction(() => {
      {
        const {food,entertainment,social,comfort,accomplishment} = feeling
        person.feeling = {
          food: twoDec(food - .01),
          entertainment: twoDec(entertainment - .01),
          social: twoDec(social - .01),
          accomplishment: twoDec(accomplishment - .01),
          comfort: twoDec(comfort - .01)
        }
      }
      {        
        const {food,sleep,mental,drugs} = energy
        person.energy = {
          food: twoDec(food - .01),
          mental: twoDec(mental - .01),
          sleep: twoDec(sleep - .01),
          drugs: twoDec(drugs - .01)
        }
      }
      {
        const {food,sleep,mental,medication} = health
        person.health = {
          food: twoDec(food - .01),
          mental: twoDec(mental - .01),
          sleep: twoDec(sleep - .01),
          medication: twoDec(medication - .01)
        }
      }
    })

  }

  function workCurrentAction(){
    const skillModifier = person.skill/currentAction!.requirement.skill! 
    currentAction!.progress! += 1 * skillModifier

  }

  function saveEvery10Seconds(){
    if(!(Math.round(state.game!.time)%10)){
      state.game?.save()
    }
  }

}


function convertToDataObject(): Game_D{
  const {time, level, person} = state.game!
  return {
    time,
    level,
    personData: person.convertToDataObject()
  }
}

function save(){
  const gameData = state.game?.convertToDataObject()
  fetch('/save-game', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  })
}