
import { Puzzle_D, Puzzle_A } from "../types/puzzle.type"
import { createNode } from "./node.creator"
import { createOutcome } from "./outcome.creator"

export const createPuzzle = (puzzleData: Puzzle_A): Puzzle_D =>{

  const puzzle: Puzzle_D = {
    ...createNode(),
    chanceToRealise: 1,
    knowledgeTest: {
      areas: []
    },
    ...puzzleData,
    possibleOutcomes: puzzleData.possibleOutcomes?.map(createOutcome) || [],

  }
  
  return puzzle

}