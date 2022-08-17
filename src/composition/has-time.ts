import { runInAction } from "mobx";
import { twoDec } from "../helper-functions";


export type HasTime = {
  time: number
  isPaused(): boolean
  pause()
  unpause()
  togglePause()
}

export const hasTime = (time: number = 0): HasTime => {

  console.log('time created');

  let timeout


  const returnObj = {
    paused: true,
    time: time,
    isPaused(){return this.paused},
    pause(){
      console.log('pause');
      this.paused = true
      this.stopTimer()
    },
    unpause(){
      console.log('unpaused');
      this.paused = false
      this.startTimer()
    },
    togglePause(){
      this.paused ? this.unpause() : this.pause()
    },
    startTimer(){
      console.log('start timer');
      timeout = setInterval(() => {
        runInAction(() => {
          console.log('time up');
          this.time = twoDec(this.time + .1)
        })
      }, 100)
    },
    stopTimer(){
      console.log('stop timer');
      clearTimeout(timeout)
    }
  }
  

  return returnObj

}