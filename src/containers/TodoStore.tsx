import { makeObservable, observable, action, computed} from 'mobx'

interface TodoItem{
  id: number
  title: string
  completed: boolean
}

let _nextId = 0
function nextId(){ _nextId++; return _nextId }

const aTodo: TodoItem ={
  id: nextId(),
  title: "a todo",
  completed: false
}

export class TodoStoreClass{
  todos: TodoItem[] = [aTodo]

  constructor(){
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      toggleTodo: action,
      status: computed
    })
  }

  addTodo(title: string){
    const item: TodoItem ={
      id: nextId(),
      title,
      completed: false
    }
    this.todos.push(item)
    return true
  }

  toggleTodo(id: number){
    let found = this.todos.find(todo => todo.id === id)
    if(found){
      found.completed = !found.completed
    }else alert("todo not found")
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

}

declare global {
    interface Window {
        store:any;
    }
}

const TodoStore = window.store = new TodoStoreClass()
export default TodoStore
