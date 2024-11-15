// src/components/Task.js
import React, {useState} from 'react';

import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { LuCheckCircle } from "react-icons/lu";


import '../styles/Task.css'

const Task = ({ task, onDeleteTask, onUpdateTask, icon }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    const handleComplete = () => {
        onUpdateTask({ ...task, completed: true });
    };
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditedTask({ ...task }); // Reset the form with the current task details
    };

    const handleSave = () => {
        onUpdateTask(editedTask);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };
    return (
    <div className="task-card">
        <div className='div1'>
            <div className="task-icon">{icon}</div>
            <div className="div11"><button className="" onClick={handleComplete}><LuCheckCircle/></button>
            <button className="" onClick={() => onDeleteTask(task.id)}><MdDeleteOutline/></button>
            <button className="" onClick={handleEditToggle}><MdOutlineModeEdit/></button></div>
        </div>
        <div className="task-content">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="title"
                            value={editedTask.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            value={editedTask.description}
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            name="dueDate"
                            value={editedTask.dueDate}
                            onChange={handleChange}
                        />
                        <select
                            name="priority"
                            value={editedTask.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleEditToggle}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="div2">
                            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <div className="task-priority">{task.priority}</div>
                        </div>
                    </>
                )}
        </div>
    </div>
    );
};

export default Task;


