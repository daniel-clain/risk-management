
import { Action_D } from "./action.type"
import { action, autorun, observable, runInAction } from "mobx"
import { state } from "../view/state"
import { Thought } from "./thought"
import {Thing} from './thing.type';
import { createGame, Game_P } from "./game";

export type Feeling = {
  food
  entertainment
  social
  comfort
  accomplishment
}
export type Feeling_O = { //make everything optional
  [P in keyof Feeling]?: Feeling[P]
}



export type Energy = {
  sleep
  food
  mental
  drugs
}
export type Energy_O = { //make everything optional
  [P in keyof Energy]?: Energy[P]
}

export type Health = {
  sleep
  food
  mental
  medication
}
export type Health_O = { //make everything optional
  [P in keyof Health]?: Health[P]
}

export type Person_D = {
  gender: 'male' | 'female'
  name: string
  energy: Energy
  health: Health
  money: number
  feeling: Feeling
  currentAction: Action_D | undefined
  knownThings: Thing[]
  skill: number
}

type Person_O = { //make everything optional
  [P in keyof Person_D]?: Person_D[P]
}

export type Person_P = Person_O & { //reset required props
  name: string;
  gender: 'male' | 'female'
}

export type Person = Person_D & {
  convertToDataObject
}

export const createPerson = (personData: Person_P): Person => {
  
  const person: Person = observable({

    feeling: {
      food: 5,
      entertainment: 5,
      social: 5,
      comfort: 5,
      accomplishment: 5
    },
    energy: {
      sleep: 5,
      food: 5,
      mental: 5,
      drugs: 5
    },
    health: {
      sleep: 5,
      food: 5,
      mental: 5,
      medication: 5
    },
    money: 100,
    skill: 0,
    knownThings: [],
    ...personData,
    currentAction: undefined,
    currentThought: undefined,
    convertToDataObject
  })

  autorun(() => {
    console.log('currentAction has been set :>> ', person.currentAction);
  })
  
  return person


  /* function doHighestPressureAction(){
    const action = person.knownThings?.find(t => t.actions?.length)?.actions?.[0]
    person.currentAction = action
    action ?
      console.log(`${action.name} set to current action`) :
      console.log('no actions found, no current action');
  }
  
  function haveAThought(thought: Thought){
    console.log(`${person.name} had a thought about ${thought.thing.name} added to known things`);
    person.currentThought = thought
  } */

  function convertToDataObject(): Person_D{
    const {convertToDataObject, ...data} = person
    return data
  }
}

export const personAlgorithm = () => {

}



