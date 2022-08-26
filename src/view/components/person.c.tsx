import { observer } from 'mobx-react';
import * as React from 'react';
import { state } from '../../state';

export const Person_C = observer(() => {
  const {game} = state
  const {person} = game!
  const {name,money,feeling,energy,health,skill,knowledge} = person
  return <>
    <person-element>
      <person-info-container class='container'>

        <t-row>
          <t-label>Name</t-label>
          <t-data>{name}</t-data>
        </t-row>

        <t-row>
          <t-label>Money</t-label>
          <t-data>{money}</t-data>
        </t-row>

        <t-container id='skill'>
          <t-heading>Skill</t-heading>
          {skill.areas.map((areas, i) => 
            <t-row key={i}>
              <t-label>{areas.name}</t-label>
              <t-data>{areas.level}</t-data>
            </t-row>
          )}
        </t-container>

        <t-container id='knowledge'>              
          <t-heading>Knowledge</t-heading>
          {knowledge.areas.map((areas, i) => 
            <t-row key={i}>
              <t-label>{areas.name}</t-label>
              <t-data>{areas.level}</t-data>
            </t-row>
          )}
        </t-container>  

        <person-feeling-container class='container'>
          <t-heading>Feeling</t-heading>
          <t-row>
            <t-label>Entertainment</t-label>
            <t-data>{feeling.entertainment}</t-data>
          </t-row> 
          <t-row>
            <t-label>Food</t-label>
            <t-data>{feeling.food}</t-data>
          </t-row> 
          <t-row>
            <t-label>Comfort</t-label>
            <t-data>{feeling.comfort}</t-data>
          </t-row> 
          <t-row>
            <t-label>Social</t-label>
            <t-data>{feeling.social}</t-data>
          </t-row> 
          <t-row>
            <t-label>Accomplishment</t-label>
            <t-data>{feeling.accomplishment}</t-data>
          </t-row> 
        </person-feeling-container>

        <person-energy-container class='container'>
          <t-heading>Energy</t-heading>
          <t-row>
            <t-label>Sleep</t-label>
            <t-data>{energy.sleep}</t-data>
          </t-row> 
          <t-row>
            <t-label>Food</t-label>
            <t-data>{energy.food}</t-data>
          </t-row> 
          <t-row>
            <t-label>Mental</t-label>
            <t-data>{energy.mental}</t-data>
          </t-row> 
          <t-row>
            <t-label>Drugs</t-label>
            <t-data>{energy.drugs}</t-data>
          </t-row> 
        </person-energy-container>

        <person-health-container class='container'>
          <t-heading>Health</t-heading>
          <t-row>
            <t-label>Sleep</t-label>
            <t-data>{health.sleep}</t-data>
          </t-row> 
          <t-row>
            <t-label>Food</t-label>
            <t-data>{health.food}</t-data>
          </t-row> 
          <t-row>
            <t-label>Mental</t-label>
            <t-data>{health.mental}</t-data>
          </t-row> 
          <t-row>
            <t-label>Medication</t-label>
            <t-data>{health.medication}</t-data>
          </t-row>
        </person-health-container>
      </person-info-container>
    </person-element>
  </>
})