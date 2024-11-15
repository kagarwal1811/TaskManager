// src/components/TaskList.js
import React from 'react';
import Task from './Task';
import '../styles/TaskList.css';


const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {

    const getFilteredTasks = (status) => tasks.filter(task => task.completed === status);
    const getOverdueTasks = () => tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date());
  
    const upcomingTasks = getFilteredTasks(false).filter(task => new Date(task.dueDate) >= new Date());
    const overdueTasks = getOverdueTasks();
    const completedTasks = getFilteredTasks(true);
  
    return (
      <div className="task-list">
        <div className="task-column">
          <h2> </h2>
          {upcomingTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
              icon="🟡"
            />
          ))}
        </div>
  
        <div className="task-column">
          <h2> </h2>
          {overdueTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
              icon="🔴"
            />
          ))}
        </div>
  
        <div className="task-column">
          <h2> </h2>
          {completedTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
              icon="✅"
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default TaskList;
