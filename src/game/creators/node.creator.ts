import { randomNumber } from "../../helper-functions"
import { Node_D } from "../types/node.type"

export const createNode = (): Node_D =>{

  const node: Node_D = {
    id: randomNumber({from: 100000, to: 10000000000}).toString(),
    completed: false,
    disabled: false

  }
  
  return node

}