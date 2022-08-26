
import { Thing } from "../game/thing.type";
import { Thought } from "../game/thought";
import { state } from "../state";
import './test.sass'

const makeToast: Thing = {
  name: 'make toast',
  futureEvents: [],
  actions: [
    {
      name: 'put toast in toaster',
      requirement: {
        money: .5,
        energy: 1
      },
      delayAfterAction: 6,
      subActions: [
        {
          name: 'get toast',
          requirement: {
            energy: 1
          }
        }
      ],
      outcome: {
        name: 'eat toast',
        feelingDiff: 5,
        energyDiff: 3
      }
    }
  ]
}

const hungryThought: Thought = {
  thing: makeToast
}



export const giveBobHungryThought = () => {
  if(!(state?.game?.person)){
    console.log('cant give bob hungry thought. bob doesnt exist yet');
    return 
  }
  const {person} = state.game
  console.log(`feed ${person.name}`);
  person.haveAThought(hungryThought)
}



/* 
const getFishAndChips: Thing = {
  name: 'get fish and chips',
  cost: {
    work:[
      {
        description: 'walk across road to get it',
        skillRequirement: 1, 
        energy: 2, 
        time: 4, 
      }
    ],
    
    money: [
      {amount: 10, description: 'cost of fish and chips'}
    ]
  },
  subThings: [
    {
      name: 'call',
      cost: {
        work:[
          {
            description: 'put toast in toaster',
            skillRequirement: 1, 
            energy: 1, 
            time: 1, 
          }
        ],
      }
    }
  ]
    

}


const theMailWillBeDroppedOff: Thing = {
  name: 'mail getting dropped off',
  futureEvents: [
    
  ]
}
   */