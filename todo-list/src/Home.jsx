/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsFillCheckSquareFill,
  BsFillTrashFill,
  BsSquare,
  BsPencilFill,
} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.css";
import racoon from "./assets/racoon.png";
import music from "./assets/fellas.mp3";
import pfp from "./assets/pfp.png";
import TaskModal from "./TaskModal";

function TaskItem({ todo, handleDone, handleDelete, handleEdit }) {
  return (
    <div className="row task" key={todo._id}>
      <div className="col-md-10 checkbox" onClick={() => handleDone(todo._id)}>
        {todo.done ? (
          <BsFillCheckSquareFill className="icon" />
        ) : (
          <BsSquare className="icon" />
        )}
        <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
      </div>
      <div className="col-md-1 edit">
        <BsPencilFill className="icon" onClick={() => handleEdit()} />
      </div>
      <div className="col-md-1 trash">
        <BsFillTrashFill
          className="icon"
          onClick={() => handleDelete(todo._id)}
        />
      </div>
    </div>
  );
}

function Home() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDone = (id) => {
    axios
      .put("http://localhost:3001/done/" + id)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };
  
  const handleSaveTask = (id, taskDetails) => {
    const { description, dueDate, time } = taskDetails;
    console.log(taskDetails);
    axios
      .put("http://localhost:3001/update" + id, {
        description: description,
        dueDate: dueDate,
        time: time,
      })
      .then((result) => {
        console.log("Task saved successfully:", result.data);
        location.reload();
      })
      .catch((err) => console.log(err));

    setIsModalOpen(false);
  };

  const sortTasks = (tasks) => {
    const uncheckedTasks = tasks.filter((task) => !task.done);
    const checkedTasks = tasks.filter((task) => task.done);
    return [...uncheckedTasks, ...checkedTasks];
  };

  return (
    <div className="home row">
      <div className="leftcontainer col-md-12">
        <div className="row userdiv">
          <p className="user">
            <img src={pfp} alt="user-pfp" className="pfp" /> User
          </p>
        </div>
        <div className="row headdiv">
          <p className="heading">Just do it....</p>
        </div>
        <div className="row createfield">
          <Create />
        </div>
        <div className="row taskarea">
          {todos.length === 0 ? (
            <div>
              <p className="norec">No Tasks!</p>
            </div>
          ) : (
            sortTasks(todos).map((todo) => (
              <div className="indivtask">
                <TaskItem
                  key={todo._id}
                  todo={todo}
                  handleDone={handleDone}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} onSave={handleSaveTask} />
    </div>
  );
}

export default Home;
