import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Puzzle_D } from '../../game/types/puzzle.type';
import { state } from '../../state';
import { PossibleOutcomes_P } from './possible-outcomes.p';

export const Puzzle_P = observer(({puzzle}: {puzzle: Puzzle_D}) => {
  const {chanceToRealise, knowledgeTest, possibleOutcomes} = puzzle
  const {person} = state.game!
  return <>
    <puzzle-container class='container'>
      <t-heading>Discoverable Things</t-heading>
          
        <t-row>
          <t-label>Chance To Realise</t-label>
          <t-data>{chanceToRealise}</t-data>
        </t-row>  


        <t-container>
          <t-heading>Knowledge Test</t-heading>
            {knowledgeTest.areas.map(a => 
              <t-row>                
                <t-label>{a.name}</t-label>
                <t-data>{a.level}</t-data>
              </t-row>  
            )}
        </t-container>

        <PossibleOutcomes_P {...{possibleOutcomes}}/>

        <button className='figure-out-button'
          onMouseDown={action(() => person.currentAction = puzzle)}
          onMouseUp={action(() => person.currentAction = undefined)}
        >
          Figure Out
        </button>

    </puzzle-container>
  </>
})