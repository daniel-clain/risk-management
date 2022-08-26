import { Game_A, Game_D } from "../types/game.type."
import { createPerson } from "./person.creator"

export const createGame = (gameData: Game_A): Game_D=>{

  const game: Game_D = {
    time: 0,
    level: 0,
    paused: true,
    ...gameData,
    person: createPerson(gameData.person),
  }
  
  return game

}