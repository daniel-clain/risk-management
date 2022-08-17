/* 
  - they ask inheritance vs composition, i say both
  - you can use classes but i think objects can be more elegant and less limitations
  - you can be over detailed in typescript, but i think you can do without and do some smart things at the root nodes so that everything can be inferred
*/

const Time = () => {
  let timeout
  return {
    time: 0,
    unpause(){
      console.log('start timer');
      timeout = setInterval(() => {
        this.time += 1
        console.log(this.time % 2 ? 'tick' : 'tock');
      }, 1000)
    },
    pause(){}
  }
}


const RiskManagement = (() => {
  const riskManagement = {
    game: {
      level: 0,
      ...Time()
    },
    savedGame: null,
    testMode: true,
    startNewGame(){
      this.game.unpause()
    },
    continueSavedGame(){

    }
  }
  return riskManagement
})()

RiskManagement.game

