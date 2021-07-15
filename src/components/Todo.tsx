import {makeObservable, observable } from 'mobx'

let _nextId = 0
function nextId(){ _nextId++; return _nextId }

export class Todo{
  id: number = nextId()
  title: string = ""
  completed: boolean = false

  constructor(title:string){
    this.title = title
    makeObservable(this, {
      id: observable,
      title: observable,
      completed: observable
    })
  }

  serialize(){
    return {
        id: this.id,
        title: this.title,
        completed: this.completed
    }
  }

  static deserialize(json: Object){
      const todo = new Todo(json['title'])
      todo.id = json['id'] || nextId()
      todo.title = json['title'] || ''
      todo.completed = json['completed'] || false
      return todo
  }

}
