import { makeObservable, observable, action, computed} from 'mobx'
import { Todo } from '../components/Todo'

const bTodo: Todo = new Todo("b todo")

export class TodoStoreClass{
  todos: Todo[] = [bTodo]

  constructor(){
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      toggleTodo: action,
      deleteTodo: action,
      status: computed,
      nextTodo: computed
    })
  }

  addTodo(title: string){
    const item: Todo = new Todo(title)
    this.todos.push(item)
    return true
  }

  toggleTodo(id: number){
    let found = this.todos.find(todo => todo.id === id)
    if(found){
      found.completed = !found.completed
    }else alert("todo not found")
  }

  deleteTodo(id: number){
    let temp = this.todos.filter(todo => todo.id !== id)
    this.todos = temp
    return true
  }

  updateTodo(id:number){
    let update = prompt("Update todo?", "")
    if(update !== null && update !== ""){
      let found = this.todos.find(todo => id === todo.id)
      if(found) found.title = update
    }else return false

    return true
  }

  get status(){
    let completed = 0
    let remaining = 0
    this.todos.forEach( todo =>{
      if(todo.completed) completed++
      else remaining++
    })
    return {completed,remaining}
  }

  get nextTodo(){
    let found = this.todos.find(todo => !todo.completed )
    if(found) return `Next todo: ${found.title}`
    return false
  }

}

declare global {
    interface Window {
        store:any;
    }
}

const TodoStore = window.store = new TodoStoreClass()
export default TodoStore
