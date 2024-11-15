// src/components/TaskForm.js
import React, { useState } from 'react';
import { RiAddLargeLine } from "react-icons/ri";
import '../styles/TaskForm.css'

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask({ id: Date.now(), title, description, dueDate, priority, completed: false });
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Medium');
    };

    return (
        <div className="task-form">
            <input 
                type="text" 
                placeholder="Task Title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}  
                required />
            <textarea 
                placeholder="Task Description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} />
                <input
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)}
                    required />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            <button className="submit-btn" type="submit"  onClick={handleSubmit}><RiAddLargeLine/></button>
        </div>
    );
};

export default TaskForm;
