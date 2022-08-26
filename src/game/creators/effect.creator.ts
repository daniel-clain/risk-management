
import { Effect_A, Effect_D } from "../types/effect.type"
import { createNode } from "./node.creator"

export const createEffect = (effectData: Effect_A): Effect_D =>{

  const effect: Effect_D = {
    ...createNode(),
    ...effectData

  }
  
  return effect

}
