
import { observer } from 'mobx-react';
import * as React from 'react';
import { Person_C } from '../components/person.c';
import background from './../images/house.jpg';
import { Game_D } from '../../game/types/game.type.';
import { ExistingThings_C } from '../components/existing-things';
import { pause, unpause } from '../../services/time.service';


export const Game_V = observer(({game}: {game: Game_D}) => {


  return <>
    <game-view>
      <Person_C />


      <player-interface>
        <game-level>Level: {game.level}</game-level>


        <game-time>{game.time}</game-time>

        <pause-button onClick={() => game.paused ? unpause() : pause()}>
          {game.paused ? 'Unpause' : 'Pause'}
        </pause-button>

        <pass-time-button 
          onMouseDown={unpause.bind(game)}
          onMouseUp={pause.bind(game)}
        >
          Pass Time
        </pass-time-button>

      </player-interface>

      
      <ExistingThings_C/>

      <game-background>
        <img src={background} />
      </game-background>

    </game-view>
  </>
})

