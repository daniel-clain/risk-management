
import { observer } from 'mobx-react';
import * as React from 'react';
import { Thing_P } from '../partials/thing.p';
import { state } from '../../state';

export const ExistingThings_C = observer(() => {
  const {game} = state
  const {person} = game!

  return <>
    <existing-things-modal>
      <existing-things>      
        {person.knownThings?.
          filter(t => !t.completed && !t.disabled).
          map(thing => 
            <Thing_P key={thing.id} {...{thing}}/>
          )
        }
      </existing-things>
    </existing-things-modal>

  </>
})
