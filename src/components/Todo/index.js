import { useState, useEffect } from "react";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(0)
  const [todo, setTodo] = useState([])

  const handleFetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      console.log("Todo Data.....", data);
      setTodoList(data.slice(0, 100));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.dark("Error Fetching todos");
      setLoading(false);
    }
    handleFetchUsers();
  };

  const handleFetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      console.log("User Data.....", users);
      setUsersData(users);
    } catch (error) {
      console.error("Error fetching users data:", error);
      toast.dark("Error Fetching User Data");
    }
  };

  useEffect(() => {
    let singleClickTimer;
    if (clicks === 1) {
      singleClickTimer = setTimeout(function() {
        handleSingleClick(todo)
        setClicks(0);
      }, 250);
    } else if (clicks === 2) {
        handleDoubleClick(todo.id)
        setClicks(0);
    }
    return () => clearTimeout(singleClickTimer);
  }, [clicks]);

  const handleOnClick= (e) =>{
    setClicks(clicks + 1)
    setTodo(e)
  }

  const handleSingleClick = (todo) => {
    console.log(todo, "todo clicked");
    const selectedUser = usersData.find((user) => user.id === todo.userId);

    if (selectedUser) {
      console.log(selectedUser, "single click...");
      // toast.dark(`UserName: ${selectedUser.name}, Email: ${selectedUser.email}`);
      toast.dark(
        <div>
          <div>UserName: {selectedUser.name}</div>
          <div>Email: {selectedUser.email}</div>
        </div>
      );
    } else {
      console.log("User not found");
    }
  };

  const handleDoubleClick = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <button className="fetch-btn" onClick={handleFetchTodos}>
        Fetch Todos
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="todo-item"
              onClick={() => handleOnClick(todo)}
              // onClick={() => handleTodoClick(todo)}
              // onDoubleClick={() => handleDoubleClick(todo.id)}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
}
export default Todo;
