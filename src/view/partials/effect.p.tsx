import { observer } from 'mobx-react';
import * as React from 'react';
import { Effect_D } from '../../game/types/effect.type';
import { FutureEvent_P } from './future-event';
import { Outcome_P } from './outcome.p';

export const Effect_P = observer(({effect}: {effect: Effect_D}) => {
  return <>  
    <effect-container class='container'>
      {effect.stateModifier ?
        <state-modifier-container class='container'>
          <t-heading>State Modifier</t-heading>
          <t-row>
            <t-label>money</t-label>
            <t-data>{effect.stateModifier?.money}</t-data>
          </t-row>
        </state-modifier-container> : <></>
      }

      {effect.workModifier ?
        <work-modifier-container class='group'>
          <t-heading>Work Modifier</t-heading>
          <t-row>
            <t-label>money</t-label>
            <t-data>{effect.stateModifier?.money}</t-data>
          </t-row>
        </work-modifier-container> : <></>
      }

      {effect.puzzleModifier ?
        <puzzle-modifier-container class='group'>
          <t-heading>Puzzle Modifier</t-heading>
          <t-row>
            <t-label>money:</t-label>
            <t-data>{effect.stateModifier?.money}</t-data>
          </t-row>
        </puzzle-modifier-container> : <></>
      }

      {effect.outcomeModifier ?
        <effect-modifier-container class='group'>
          <t-heading>effect Modifier</t-heading>
          <t-row>
            <t-label>Existing Ref</t-label>
            <t-data>{effect.outcomeModifier.existingRef.id}</t-data>
          </t-row>
          <t-row>
            <t-label>Update</t-label>
            <Outcome_P outcome={effect.outcomeModifier.updated} />
          </t-row>
        </effect-modifier-container> : <></>
      }

      {effect.delete ?
        <delete-container class='group'>
          <t-heading>Delete</t-heading>
          {effect.delete?.futureEvents ? 

            <future-events-container id='container'>
              <t-heading>Future Events</t-heading>
              {effect.delete?.futureEvents.map(futureEvent => 
                <FutureEvent_P key={futureEvent.id} {...{futureEvent}} />
              )}
            </future-events-container> : <></>

          }
        </delete-container> : <></>
      }
    </effect-container>
  </>
})