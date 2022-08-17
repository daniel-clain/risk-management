import { Thing } from "../thing.type";

const eat: Thing = {
  name: 'Eat Food',
  actions: [
    {
      name: 'Eat the food',
      progress: 0,
      requirement: {
        money: 1
      },
      outcome: {
        name: 'Has eaten food',
        feelingDiff: {
          food: 5
        },
        energyDiff:{
          food: 8
        },
        healthDiff:{
          food: 3
        }

      }
    }
  ]
}