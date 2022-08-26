import { observer } from 'mobx-react';
import * as React from 'react';
import { Thing_D } from '../../game/types/thing.type';
import { FutureEvent_P } from './future-event';
import { Puzzle_P } from './puzzle.p';
import { Work_P } from './work.p';

export const Thing_P = observer(({thing}: {thing: Thing_D}) => {
  return <>
    <thing-container class='container'>

      <t-heading>{thing.id}</t-heading>

      {thing.puzzles.length ?
        <puzzles-container class='container'>
          <t-heading>Puzzles</t-heading>
          {thing.puzzles.
            filter(t => !t.completed && !t.disabled).
            map(puzzle => 
              <Puzzle_P key={puzzle.id} {...{puzzle}} />
            )
          }
        </puzzles-container> : <></>
      }


      {thing.work.length ?
        <work-container class='container'>
          <t-heading>Work</t-heading>
          {thing.work.
            filter(t => !t.completed && !t.disabled).
            map(work => 
              <Work_P key={work.id} {...{work}}/>
            )
          }
        </work-container> : <></>
      }       


      {thing.futureEvents.length ?
        <future-events-container class='container'>
          <t-heading>Future Events</t-heading>
          {thing.futureEvents.
            filter(fe => !fe.completed && !fe.disabled).
            map(futureEvent => 
              <FutureEvent_P key={futureEvent.id} {...{futureEvent}} />
            )
          }
        </future-events-container> : <></>
      }


    </thing-container>
  </>
})