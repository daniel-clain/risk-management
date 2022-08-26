
import { observer } from 'mobx-react';
import * as React from 'react';
import { resetGame } from '../../services/main.service';
import { state } from '../../state';


export const GameOver_V = observer(() => {
  const game = state.game!
  const {reason} = game.gameOver!



  return <>
    <game-over-view>
      
      <h1>You have died</h1>

      <p>You lost because of ${reason}</p>

      <hr/>

      <button onClick={resetGame}>Back To Start</button>

    </game-over-view>
  </>
})