

import { action, autorun, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Game, GameData } from "../game/game";

export class AppStore{
  game: Game | null = null
  savedGame: GameData | null = null
  cats: number | null = null

  constructor() {
    makeAutoObservable(this)
    this.initialSetup()
  }
  initialSetup(){
    this.loadSavedGame()
  }

  
  startGame = () => {
    this.game = new Game()
    this.game!.start()
  }

  private async loadSavedGame(): Promise<void>{
    console.log('load game');
    const savedGame: GameData = await 
      fetch('/load-game')
      .then(response => response.json())

      this.savedGame = savedGame
      
  }

  continueSavedGame = () => {
    this.game = new Game(this.savedGame!)
  }
  
  test(){
    const testGame =new Game({level: 69, time: 69, paused: true})
    this.game = testGame
    this.game.saveCurrentGame()
  }

}


//export const state = new AppState()

autorun(x => {
  console.log('z :>> ', x);
})
