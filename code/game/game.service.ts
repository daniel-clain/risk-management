import { state } from "../view/state";

let existingGame = null


export async function previousGameExists(): Promise<boolean>{
  console.log( 'previous game');
  return !!getExistingGame()
}

export function startGame(){

}


export function continueExistingGame(){

}

async function getExistingGame(){
  console.log('get existing');
  return Promise.resolve(existingGame) || 
  fetch('/existing-game')
  .then(response => console.log(response))
}

export function initialSetup(){
  getExistingGame().then(result => {
    console.log('result :>> ', result);
    state.existingGame = result
  })
}