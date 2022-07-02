
export const is = val => ({
  if: condition => condition ? val : ''
})


export const randomNumber = ({from,to}) => {
  return Math.round(Math.random()*(to-from))
}

export function numberLoop(amount, func: (number: number) => void): any[] {
  let returnVal: any[] = []
  for(let number = 1; number <= amount; number++){
    returnVal.push(func(number))
  }
  return returnVal
}

