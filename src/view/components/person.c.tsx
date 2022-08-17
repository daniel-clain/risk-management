import { observer } from 'mobx-react';
import * as React from 'react';
import { state } from '../state';

export const Person_C = observer(() => {
  const {game} = state
  const {person} = game!
  const {name,money,feeling,energy,health,skill} = person
  return <>
    <person-element>
      <t-container id='person-info'>
          <t-row>
            <t-label>Name: </t-label>
            <t-data>{name}</t-data>
          </t-row>
          <t-row>
            <t-label>Money: </t-label>
            <t-data>{money}</t-data>
          </t-row>
          <t-row>
            <t-label>Skill: </t-label>
            <t-data>{skill}</t-data>
          </t-row>

          <t-row>
            <t-heading>Feeling: </t-heading>
            <t-container id='feeling'>
              <t-row>
                <t-label>Entertainment: </t-label>
                <t-data>{feeling.entertainment}</t-data>
              </t-row> 
              <t-row>
                <t-label>Food: </t-label>
                <t-data>{feeling.food}</t-data>
              </t-row> 
              <t-row>
                <t-label>Comfort: </t-label>
                <t-data>{feeling.comfort}</t-data>
              </t-row> 
              <t-row>
                <t-label>Social: </t-label>
                <t-data>{feeling.social}</t-data>
              </t-row> 
              <t-row>
                <t-label>Accomplishment: </t-label>
                <t-data>{feeling.accomplishment}</t-data>
              </t-row> 
            </t-container>
          </t-row>

          <t-row>
            <t-heading>Energy: </t-heading>
            <t-container id='feeling'>
              <t-row>
                <t-label>Sleep: </t-label>
                <t-data>{energy.sleep}</t-data>
              </t-row> 
              <t-row>
                <t-label>Food: </t-label>
                <t-data>{energy.food}</t-data>
              </t-row> 
              <t-row>
                <t-label>Mental: </t-label>
                <t-data>{energy.mental}</t-data>
              </t-row> 
              <t-row>
                <t-label>Drugs: </t-label>
                <t-data>{energy.drugs}</t-data>
              </t-row> 
            </t-container>
          </t-row> 

          <t-row>
            <t-heading>Health: </t-heading>
            <t-container id='health'>
              <t-row>
                <t-label>Sleep: </t-label>
                <t-data>{health.sleep}</t-data>
              </t-row> 
              <t-row>
                <t-label>Food: </t-label>
                <t-data>{health.food}</t-data>
              </t-row> 
              <t-row>
                <t-label>Mental: </t-label>
                <t-data>{health.mental}</t-data>
              </t-row> 
              <t-row>
                <t-label>Medication: </t-label>
                <t-data>{health.medication}</t-data>
              </t-row>
            </t-container>
          </t-row>
      </t-container>
    </person-element>
  </>
})