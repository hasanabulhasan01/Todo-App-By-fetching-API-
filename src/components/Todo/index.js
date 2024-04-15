import { useState } from "react";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      console.log("Todo Data.....", data);
      setTodoList(data.slice(0, 60));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
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
    }
  };

  const handleTodoClick = (todo) => {
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
              onClick={() => handleTodoClick(todo)}
              onDoubleClick={() => handleDoubleClick(todo.id)}
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
