import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Work_D } from '../../game/types/work.type';
import { state } from '../../state';
import { PossibleOutcomes_P } from './possible-outcomes.p';

export const Work_P = observer((
  {work}:  {work: Work_D}
) => {
  const {person} = state.game!
  const {possibleOutcomes, id, workRating, skillTest, completed, workRemaining} = work
  return <>
    <work-item-container class='group'>
      <t-row>
        <t-label>Work Rating</t-label>
        <t-data>{workRating}</t-data>
      </t-row>
      
      <t-row>
        <t-label>Work Remaining</t-label>
        <t-data>{workRemaining}</t-data>
      </t-row>

      <PossibleOutcomes_P {...{possibleOutcomes}}/>
      

      <button className='do-work-button'
        onMouseDown={action(() => person.currentAction = work)}
        onMouseUp={action(() => person.currentAction = undefined)}
      >
        Do Work
      </button>
      
    </work-item-container>
  </>
})