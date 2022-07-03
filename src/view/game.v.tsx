
import { observer } from 'mobx-react';
import * as React from 'react';
import { Game } from "../game/game";



export const Game_V = observer(
({game}:{game: Game}) => {
  const {saveBeforeUnload, togglePause} = game
  React.useEffect(() => {
    const removeEventListeners = saveBeforeUnload()
    return removeEventListeners
  }, [])


  return (
    <game-view>
      <game-background>
        <pause-button onClick={togglePause}>
          {game.paused ? 'Unpause' : 'Pause'}
        </pause-button>
        <game-time>{game.time}</game-time>
        <the-guy/>
      </game-background>
    </game-view>
  )
})