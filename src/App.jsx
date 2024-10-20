import React, { useState, useRef, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function TodoItem({ todoItem, updateTodo, removeTodo })
{
  function onCheck(e)
  {
    updateTodo(todoItem);
  }

  function onRemove(e)
  {
    removeTodo(todoItem);
  }

  return <div className='todo-parent'>
    <div className='todo-item'>
      <span className='todo-item1'>
        Task : {todoItem.value}
      </span>
      <span className='todo-item2'>
        <label>
          <input type='checkbox' checked={todoItem.completed} onChange={onCheck} />
        </label>
      </span>
    </div>
    <br />
    <button className="remove-button" onClick={onRemove}>Remove</button>
  </div>
}

function App()
{
  const [count, setCount] = useState(0);

  let [todos, setTodo] = useState([{
    id: "0",
    value: "Learn React Basics",
    completed: false
  }]);

  let formData = useRef("");

  function renderTodos()
  {
    return (<div>
      {todos.map((element, index) =>
      (
        <React.Fragment key={index}>
          <TodoItem todoItem={element} updateTodo={updateTodo} removeTodo={removeTodo} />
        </React.Fragment>
      ))
      }
    </div >)
  }

  function onChange(e)
  {
    formData.current = e.target.value;
  }

  function updateTodo(todoItem)
  {
    const newTodos = todos.map((value) => value.value === todoItem.value ? { ...value, completed: !todoItem.completed } : value);
    setTodo(newTodos);
  }

  function addTodo(e)
  {
    e.preventDefault();
    console.log(formData.current);

    setTodo([...todos, { id: todos.length, value: formData.current, completed: false }]);
  }

  function removeTodo(todoItem)
  {
    let newTodos = Array.from(todos);
    newTodos = newTodos.filter((value, index) => (value != todoItem));
    setTodo(newTodos);
  }

  function renderForm()
  {
    return (
      <React.Fragment>
        <form onSubmit={addTodo}>
          <span className='formTitle'>Task Name :{" "}</span>
          <label htmlFor='name'></label>
          <textarea className='formInput' id='name' name='name' ref={formData} onChange={onChange}></textarea>
          {" "}
          <span style={{ paddingLeft: "20px", position: "relative", top: "-20px" }}> <button type='submit'>Add Todo</button></span>
        </form>
      </React.Fragment >)
  }

  return (
    <React.Fragment>
      < h1 className='header' > TODO List</h1 >
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        {renderForm()}
      </div>

      <div className='topbar-container'>
        <span className='topbar-item1'>Tasks </span>
        <span className='topbar-item2'>Status</span>
      </div>

      <div className='todo-container'>
        {renderTodos()}
      </div>
    </React.Fragment >
  )
}

export default App
