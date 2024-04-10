import './style.css'
import {useState} from 'react'
export default function App(){
  const [newItem,setNewItem] = useState('');
  const [todos, setTodos] = useState([]);

  function handleSubmit(e){
    e.preventDefault();

    setTodos(currentTodos =>{//Set function with function as parameter 
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false
        }
      ]
    })

    setNewItem('');
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
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input 
            type="text" 
            id='item'
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
          />  
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todos.length === 0 &&  <p>No Todos</p>}//Short circuiting
        {/* If you are returning an array of elements inside of react with map...we need to make sure each element at the very top level has a key property... and key must be a unique identifier*/}
        {todos.map(todo =>{
          return (
            <li key={todo.id}>
              <label>
                <input 
                  type="checkbox"  
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button onClick={()=> deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}