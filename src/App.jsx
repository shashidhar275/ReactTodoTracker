import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';
import './style.css'
import {useState} from 'react'
export default function App(){
  const [todos, setTodos] = useState([]);

  function addTodo(title){
    setTodos(currentTodos =>{//Set function with function as parameter 
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: title,
          completed: false
        }
      ]
    })
  }

  //Remember states are immutable!!!!
  function toggleTodo(id, completed){
    setTodos(currentTodos =>{
      return currentTodos.map(todo => {
        if(todo.id === id)
        {
          //todo.completed = completed //❌This line mutating the current state -> it will not going to work....Anytime we dealing with state we cannot change it!!
          return {...todo,completed} //Always remember any time we change the state make sure we not actually mutating instead we are creating a brand new state
        }
        return todo;
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
    <NewTodoForm addTodo={addTodo}/>
      <h1 className='header'>Todo List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}