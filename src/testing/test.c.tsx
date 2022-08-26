

import * as React from 'react';
import { useEffect } from 'react';
import { state } from '../state';
import { giveBobHungryThought } from './bob-hunger-thought-toast-thing';





export const Test_C = () => {
  useEffect(() => {
    window['state'] = state
  }, [])



  return <>
    <test-element>
      

      <test-button onClick={giveBobHungryThought}
      >
        giveBobHungryThought
      </test-button>


      
      <test-button onClick={() => {
        console.log('Click :>> ');
      }}>
        Click
      </test-button>



    </test-element>
  </>
}