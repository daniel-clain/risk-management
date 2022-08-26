import { observer } from 'mobx-react';
import * as React from 'react';
import { Outcome_D } from '../../game/types/outcome.type';
import { Effect_P } from './effect.p';

export const Outcome_P = observer(({outcome}: {outcome: Outcome_D}) => {
  return <>  
    <outcome-container class='group'>
      <t-row>
        <t-label>Probability</t-label>
        <t-data>{outcome.probability}</t-data>
      </t-row>

      <effects-container class='container'>
        <t-heading>Effects</t-heading>
        {outcome.effects.
          filter(t => !t.completed && !t.disabled).
          map(effect =>
            <Effect_P key={effect.id} {...{effect}}/>
          )
        }
      </effects-container>
    </outcome-container>
  </>
})