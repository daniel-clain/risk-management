
import { observer } from 'mobx-react';
import * as React from 'react';
import {useEffect} from 'react';
import { Person_C } from '../components/person.c';
import background from './../images/house.jpg';
import { state } from '../state';
import { resetGame, saveBeforeUnload } from '../actions.service';


export const GameOver_V = observer(() => {
  const game = state.game!
  const {reason} = game.gameOver!

  useEffect(saveBeforeUnload, [])


  return <>
    <game-over-view>
      
      <h1>You have died</h1>

      <p>You lost because of ${reason}</p>

      <hr/>

      <button onClick={resetGame}>Back To Start</button>

    </game-over-view>
  </>
})