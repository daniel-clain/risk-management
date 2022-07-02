import { makeObservable, observable } from "mobx"
export class Game{
  name = 'penis'
  constructor(){
    makeObservable(this, {
      name: observable
    })
  }
}