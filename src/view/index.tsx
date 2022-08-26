
import { render } from 'react-dom'
import * as React from 'react';
import { observer } from 'mobx-react';

import './style.sass'
import { Game_V } from './views/game.v';

import { state } from '../state';
import { GameOver_V } from './views/game-over.v';
import { initialSetup, startNewGame, continueSavedGame } from '../services/main.service';


initialSetup()

const Index = observer(() => {
  
  const {game, savedGame} = state

  return (
    <>
      {!game ?
        <pre-game>
          <start-button onClick={startNewGame}>
            Start New Game
          </start-button>
          
          {savedGame ?
            <continue-button onClick={continueSavedGame}>
              Continue Existing Game
            </continue-button> : <></>
          }
        </pre-game>
      : 
        game.gameOver ?
          <GameOver_V/> 
        : <Game_V {...{game}} />
      
      }
    </>
  )
  
})



render(<Index />, 
  document.body.appendChild(
    document.createElement('risk-management')
  )
)
