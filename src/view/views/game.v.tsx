
import { observer } from 'mobx-react';
import * as React from 'react';
import {useEffect} from 'react';
import { Person_C } from '../components/person.c';
import background from './../images/house.jpg';
import { state } from '../state';
import { saveBeforeUnload } from '../actions.service';
import { Game } from '../../game/game';


export const Game_V = observer(({game}: {game: Game}) => {
  const {person} = game

  useEffect(saveBeforeUnload, [])


  return <>
    <game-view>
      <Person_C />


      <player-interface>
        <game-level>Level: {game.level}</game-level>


        <game-time>{game.time}</game-time>

        <pause-button onClick={() => game.togglePause()}>
          {game.isPaused() ? 'Unpause' : 'Pause'}
        </pause-button>

        <pass-time-button 
          onMouseDown={game.unpause.bind(game)}
          onMouseUp={game.pause.bind(game)}
        >
          Pass Time
        </pass-time-button>

      </player-interface>


      <existing-things>
        {person.knownThings.map(thing => 
          <thing-element key={thing.name}>
            {thing.name}
            {thing.actions?.map(a => a.name).toString()}
          </thing-element>
        )}
      </existing-things>

      <game-background>
        <img src={background} />
      </game-background>

    </game-view>
  </>
})