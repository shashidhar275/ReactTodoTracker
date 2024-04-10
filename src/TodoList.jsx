import { TodoItem } from "./TodoItem";
export function TodoList( { todos, toggleTodo, deleteTodo } ) {
  return (
    <ul className="list">
      {todos.length === 0 && <p>No Todos</p>}
      {/* If you are returning an array of elements inside of react with map...we need to make sure each element at the very top level has a key property... and key must be a unique identifier*/}
      {todos.map((todo) => {
        return (
          <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>//Instead of individually providing the props details we can use the mentioned syntax
        );
      })}
    </ul>
  );
}
