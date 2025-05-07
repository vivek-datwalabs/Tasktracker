import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import {
  fetchTasks,
  createTask as createTaskAPI,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
} from './api/api.js';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        console.log(data)
        setTasks(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadTasks();
  }, []);

  const addTask = async (text) => {
    try {
      const newTask = await createTaskAPI(text);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    try {
      const updated = await updateTaskAPI(id, { completed: !task.completed });
      setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskAPI(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Task Tracker</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
