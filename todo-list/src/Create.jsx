/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import TaskModal from "./TaskModal";

function Create() {
  const [task, setTask] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsModalOpen(true);
    }
  };

  const handleSaveTask = (taskDetails) => {
    const { description, dueDate, time } = taskDetails;
    console.log(taskDetails);
    axios
      .post("http://localhost:3001/add", {
        task: task,
        description: description,
        dueDate: dueDate,
        time: time,
      })
      .then((result) => {
        console.log("Task added successfully:", result.data);
        location.reload();
      })
      .catch((err) => console.log(err));

    setIsModalOpen(false);
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyPress}
        id="tsknameinp"
      />
      {isHovered ? (
        <BsPlusCircleFill
          className="createtaskbtn"
          onClick={handleAdd}
          onMouseLeave={() => setIsHovered(false)}
        />
      ) : (
        <BsPlusCircle
          className="createtaskbtn"
          onClick={handleAdd}
          onMouseEnter={() => setIsHovered(true)}
        />
      )}
      <TaskModal isOpen={isModalOpen} onSave={handleSaveTask} />
    </div>
  );
}

export default Create;
