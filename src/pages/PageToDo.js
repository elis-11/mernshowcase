import React from "react";
// import "../todos.scss";
import { GrFormAdd } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";

const ToDo = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list" className="todo">
      <form onSubmit={handleSubmit} className="create">
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="Input Task"
        />
        <label type="submit">
          <GrFormAdd />
        </label>
      </form>
      <table className="tasks ">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Todo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className="text">
              <td></td>
              <td className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
              </td>
              <td>
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    placeholder={todo.text + " Edit"}
                    autofocus
                    // placeholder={todo.text}
                    // placeholder={"Edit" + todo.text}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </td>
              <td className="action">
                {todo.id === todoEditing ? (
                  <label onClick={() => submitEdits(todo.id)}>
                    <AiFillCheckCircle />
                  </label>
                ) : (
                  <label onClick={() => setTodoEditing(todo.id)}>
                    <AiFillEdit />
                  </label>
                )}
              </td>
              <td>
                <label onClick={() => deleteTodo(todo.id)}>
                  <BsFillTrashFill />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Todoes = () => {
  return (
    <div>
      <div className="layer-headline">
        <h1>Personal Taskmanager Localstorage</h1>
      </div>
      <div className="layer-todo">
        <div className="todo-app">
          <ToDo />
        </div>
      </div>
    </div>
  );
};

export default Todoes;
