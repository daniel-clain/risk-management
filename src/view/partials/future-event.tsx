
import { observer } from 'mobx-react';
import * as React from 'react';
import { FutureEvent_D } from '../../game/types/future-event.type';
import { PossibleOutcomes_P } from './possible-outcomes.p';

export const FutureEvent_P = observer((
  {futureEvent: {possibleOutcomes, id, timeLeft}}: 
  {futureEvent: FutureEvent_D}
) => {
  return <>
    <future-event-container class='container'>
      <t-row>
        <t-label>id</t-label>
        <t-data>{id}</t-data>
      </t-row>
      <t-row>
        <t-label>Time Left</t-label>
        <t-data>{timeLeft}</t-data>
      </t-row>
      

      <PossibleOutcomes_P {...{possibleOutcomes}}/>


    </future-event-container>
  </>
})