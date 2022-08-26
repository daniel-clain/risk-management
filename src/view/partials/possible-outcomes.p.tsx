
import { observer } from 'mobx-react';
import * as React from 'react';
import { Outcome_D } from '../../game/types/outcome.type';

import { Outcome_P } from './outcome.p';

export const PossibleOutcomes_P = observer((
  {possibleOutcomes}: 
  {possibleOutcomes: Outcome_D[]}
) => {

  return <>
    <possible-outcomes-container class='container'>
      {
        possibleOutcomes.length == 1 ? 
          <>
            <t-label>Outcome</t-label>
            <Outcome_P outcome={possibleOutcomes[0]!} />
          </>
        : possibleOutcomes.length ? 
          /* if multiple possible outcomes */
          <>
            <t-heading>Possible Outcomes</t-heading>
            {possibleOutcomes.
              filter(t => !t.completed && !t.disabled).
              map((outcome, i) => 
                <Outcome_P key={i} {...{outcome}} />              
              )
            }
          </> 
        : <>error: work has no possible outcomes</>
      }


    </possible-outcomes-container>
  </>
})