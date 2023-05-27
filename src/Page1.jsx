import React, { useState } from 'react';
import './App.css';
import Database from './Database';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('low');
  const [idCounter, setIdCounter] = useState(0);

  const addTodo = (event) => {
    event.preventDefault();
    if(input.trim() === '') return;
    
    const newTodo = {
      id: idCounter,
      text: input,
      priority,
      date: new Date().toLocaleString(),
      completed: false
    };
    setTodos([...todos, newTodo]);
    setIdCounter(idCounter + 1);
    setInput('');
    setPriority('low');
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
    setTodos(newTodos);
  };

  return (
    <div className="app">

      <div>
      <h1>My App</h1>
      <Database />
      </div>
      <h3 className="title">Todo List:</h3>
      <form className="form">
        <input value={input} onChange={event => setInput(event.target.value)} />
        <select value={priority} onChange={event => setPriority(event.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTodo} type="submit">Add Todo</button>
      </form>
      <ul className="menu">
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
              {todo.text} ({todo.priority}) - {todo.date}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>Delete</button>
            <button onClick={() => completeTodo(todo.id)} style={{ marginLeft: '10px' }}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Page1 = () => (
  <div className="page">
    <h2>Page 1</h2>
    <TodoApp />
  </div>
);

export default Page1;
