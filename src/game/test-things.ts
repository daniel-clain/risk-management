
import { createFutureEvent } from "./creators/future-event.creator";
import { createThing } from "./creators/thing.creator";
import { FutureEvent_D } from "./types/future-event.type";
import { Thing_D, Thing_A } from "./types/thing.type";
import { Work_A } from "./types/work.type";
import { Effect_A } from "./types/effect.type";
import { createEffect } from "./creators/effect.creator";

const workA: Work_A = {
  workRating: 1,
  workRemaining: 2,
  possibleOutcomes: [
    {
      probability: 0.3,
      effects: [{stateModifier: {money: 500}}]
    },
    {
      probability: 0.3,
      effects: [{stateModifier: {money: 100}}]
    },
    {
      probability: 0.3,
      effects: [{stateModifier: {money: -200}}]
    }
  ]
}

const thing1Data: Thing_A = {
  work: [workA]
}

const testThing1: Thing_D = createThing(thing1Data)


const badFutureEvent: FutureEvent_D = createFutureEvent({
  timeLeft: 5,
  possibleOutcomes: [{
    effects: [{
      stateModifier: {money: -500}
    }]
  }]
})


const testThing3: Thing_D =  createThing({
  futureEvents:[badFutureEvent],
  work: [
    {
      workRating: 1,
      workRemaining: 3,
      possibleOutcomes: [
        {
          probability: 1,
          effects: [
            {
              delete: {
                futureEvents: [badFutureEvent]
              }
            }
          ]
        }
      ]
    }
  ]
})

const playMinecraft = createThing({
  id: 'play Minecraft',
  work: [{
    workRemaining: 5,
    recurring: true,
    possibleOutcomes: [{
      probability: 1,
      effects: [{
        stateModifier: {
          feeling: {
            entertainment: 0.1
          }
        }
      }]
    }]
  }]
})


const testThing4: Thing_D = createThing({
  id: 'setup minecraft server',
  futureEvents:[],
  puzzles: [
    {
      possibleOutcomes: [
      {
        probability: 1,
        effects: [
          {
            create: {
              things: [playMinecraft]
            }
          }
        ]
      }
    ]

    }
  ]
})

const testThing5: Thing_D = createThing({
  id: 'random chance ends in 3 seconds',
  work: [{
    possibleOutcomes: [
      {
        probability: .5,
        effects: [
          {
            stateModifier: {
              money: -400
            }
          }
        ]
      },
      {
        probability: .5,
        effects: [
          {
            stateModifier: {
              money: 500
            }
          }
        ]
      }
    ]
  }]
})


testThing5.futureEvents.push(
  createFutureEvent({
    timeLeft: 3,
    possibleOutcomes: [
      {
        effects: [{
          delete: {
            things: [testThing5]
          }
        }]
      }
    ]
  })
)

console.log('testThing5 :>> ', testThing5);

/* testThing5.futureEvents?.push(
  {
    id: 'future event end thing',
    timeLeft: 15,
    possibleOutcomes: [{
      outcomeGroup: [
        {
          id: 'outcome to end thing',
          delete: {
            things: [testThing5]
          }
        }
      ]
    }],
  }
) */


const eatFood = createThing({
  id: 'Eat Food',
  work: [{
    workRemaining: 5,
    recurring: true,
    possibleOutcomes: [{
      probability: 1,
      effects: [{
        stateModifier: {
          feeling: {
            food: 1
          },
          energy: {
            food: 1
          },
          health: {
            food: 1
          },
          money: -1
        }
      }]
    }]
  }]
})

export const testThings: Thing_D[] = [
  testThing1,
  //testThing2,
  testThing3,
  testThing4,
  //testThing5
]

/* 
let testCount = 0
export const createRandomTestThing = ():Thing => {

  const skillAreaKey: string = `
    area${randomNumber({from: 1, to: 6})}
  `
  const skill: Skill = {}
  skill[skillAreaKey] = randomNumber({from: 1, to: 2})
  

  const knowledgeAreaKey: string = `
    area${randomNumber({from: 1, to: 6})}
  `
  const knowledge: Knowledge = {}
  skill[knowledgeAreaKey] = randomNumber({from: 1, to: 2})



  testCount++  
  const thing: Thing = {
    name: `Test ${testCount}`,
    actions: [{
      name: 'test action',
      requirement: {skill, knowledge}
    }]
  }

  return thing
} */