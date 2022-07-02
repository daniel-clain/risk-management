
import { render } from 'react-dom'
import * as React from 'react';
//import { observer } from 'mobx-react';
import { Game_V } from './game.v';
import { continueExistingGame, initialSetup, previousGameExists, startGame } from '../game/game.service';
import './style.sass'
import { AppState, state } from './state';
import { is } from '../helper-functions';

initialSetup()

const Index = () => {
  const {activeGame, existingGame} = state

  console.log('existingGame :>> ', existingGame);
  if(!!activeGame)
    return <Game_V game={activeGame} /> 

  else
    return <>

      <start-button onClick={startGame}>
        Start New Game
      </start-button>
      
      {is(
        <continue-button onClick={continueExistingGame}>
          Continue Existing Game
        </continue-button>
      ).if(existingGame)}

  </>

}



const reactRenderingTag = document.createElement('risk-management')
document.body.appendChild(reactRenderingTag)
render(<Index />, reactRenderingTag)