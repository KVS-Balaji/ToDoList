import { useState } from "react";
import PropTypes from "prop-types";
import "./TaskModal.css";

function TaskModal({ isOpen, onSave }) {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    // Pass the entered values to the onSave callback
    onSave({ description, dueDate, time });
  };

  return (
    <div className={`task-modal ${isOpen ? "show" : "hidden"}`}>
      <div className="task-details">
        <h2>Add Task Details</h2>
        <div className="form-group gp1">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group gp2">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group gp3">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskModal;
