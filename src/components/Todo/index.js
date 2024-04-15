import { useState } from "react"
import './index.css';

function Todo() {
  const [todoList, setTodoList] = useState()


  const handleFetchTodo = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setTodoList(json))
      .catch((error) => console.log("Error:", error.message));
      console.log(todoList, "todo list ......")
  }



  return (
    <div className="Main">
      <header className="todo-header">
        <button onClick={handleFetchTodo}>Fetch Todos</button>
      </header>
      <section className="todoListMain">
        {}
      </section>
    </div>
  );
}

export default Todo;
