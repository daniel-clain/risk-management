
import { render } from 'react-dom'
import * as React from 'react';
//import { observer } from 'mobx-react';
import { Game_V } from './game.v';
import './style.sass'
import { AppStore } from './store';
import { is } from '../helper-functions';
import { observer } from 'mobx-react';
import { Game } from '../game/game';
import { runInAction } from 'mobx';

const appStore = new AppStore() 

const Index = observer(() => {
  const {game, savedGame, startGame, test, continueSavedGame, cats} = appStore
  
  if(game)
    return <Game_V {...{game}} /> 

  else
    return <pre-game>

      <start-button onClick={startGame}>
        Start New Game
      </start-button>
      
      <test-button onClick={test}>
        Test
      </test-button>
      {is(
        <continue-button onClick={continueSavedGame}>
          Continue Existing Game
        </continue-button>
      ).if(savedGame)}

  </pre-game>

})



const reactRenderingTag = document.createElement('risk-management')
document.body.appendChild(reactRenderingTag)
render(<Index />, reactRenderingTag)
