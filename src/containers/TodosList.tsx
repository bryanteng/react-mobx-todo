import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { TodoStoreClass } from './TodoStore'

interface TodosListProps{
  todoStore: TodoStoreClass
}

export const TodosList: React.FC<TodosListProps> = observer(({todoStore}) => {

  const [value, setValue] = useState<string>("")

  return (
  <div>
    <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
    <button onClick={()=> todoStore.addTodo(value) && setValue("")}> submit </button>
    <div>
      Completed: {todoStore.status.completed}
      <br/>
      Remaining: {todoStore.status.remaining}
    </div>
    <ul>
      {todoStore.todos.map(todo => <li id={`${todo.id}`}>
          {todo.title} completion status:
          <input type="checkbox" checked={todo.completed} onChange={(event)=>todoStore.toggleTodo(todo.id)} />
        </li>)}
    </ul>
  </div>
)})

export default TodosList
