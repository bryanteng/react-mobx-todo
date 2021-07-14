import React from 'react';
import './App.css';
import TodosList from './containers/TodosList'
import TodoStore from './containers/TodoStore'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodosList todoStore={TodoStore}/>
      </header>
    </div>
  );
}

export default App;
