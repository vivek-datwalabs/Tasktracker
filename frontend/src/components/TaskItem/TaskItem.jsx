import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  console.log(toggleComplete);
  
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleComplete(task._id)}>{task.title}</span>
      <button onClick={() => deleteTask(task._id)}>❌</button>
    </li>
  );
};

export default TaskItem;
