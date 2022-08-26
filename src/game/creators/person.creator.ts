import { Person_A, Person_D } from "../types/person.type"
import { testThings } from "../test-things"

export const createPerson = (personData: Person_A): Person_D => {
  
  const person: Person_D = {
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
    skill: {
      areas:[
        {
          name: 'Circle',
          level: 2
        },
        {
          name: 'Triangle',
          level: 1
        }
      ]
    },
    knowledge: {
      areas:[
        {
          name: 'Green',
          level: 1
        },
        {
          name: 'Blue',
          level: 3
        }
      ]
    },
    knownThings: testThings,
    ...personData,
    currentAction: undefined
  }

  
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

}