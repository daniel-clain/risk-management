
export const is = val => ({
  if: condition => condition ? val : '',
  in: (array: any[]) => array.includes(val) ? val : ''
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


export function twoDec(num: number){
  return (Math.round((num) * 100) / 100)
}

export function ifResult(val, nextFunction){
  val && nextFunction(val)
}

export function deleteById(array: {id:string}[], id: string){
  const index = array.findIndex(item => item.id == id)
  array.splice(index, 1)
}