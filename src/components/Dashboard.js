// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { getTasks, saveTasks } from '../utils/taskUtils';

import { RiSortAsc } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import {FaFilter} from  "react-icons/fa";

import '../styles/Dashboard.css'

const Dashboard = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [tasks, setTasks] = useState(getTasks());
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilters, setPriorityFilters] = useState({ Low: false, Medium: false, High: false });
    const [statusFilters, setStatusFilters] = useState({ completed: false, overdue: false, upcoming: false });
    const [showFilterDropdown, setShowFilterDropdown] = useState(false); // Toggle for dropdown
    // Temporary filter states
    const [tempPriorityFilters, setTempPriorityFilters] = useState({ Low: false, Medium: false, High: false });
    const [tempStatusFilters, setTempStatusFilters] = useState({ completed: false, overdue: false, upcoming: false });
    
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const toggleTheme = () => setDarkMode(!darkMode);
    const addTask = (task) => setTasks([...tasks, task]);
    const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
    const updateTask = (updatedTask) => setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));

    // // Filter tasks based on search query
    // const filteredTasks = tasks.filter(task => 
    //     task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     task.description.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // Clear search query
    const clearSearch = () => setSearchQuery('');

     // Toggle filter dropdown visibility
     const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

     // Apply filters by copying temporary selections to main filters
     const applyFilters = () => {
        setPriorityFilters({...tempPriorityFilters});
        setStatusFilters({...tempStatusFilters});
        setShowFilterDropdown(false);
    };

     // Clear all filters
     const clearFilters = () => {
        setTempPriorityFilters({ Low: false, Medium: false, High: false });
        setTempStatusFilters({ completed: false, overdue: false, upcoming: false });
        setPriorityFilters({ Low: false, Medium: false, High: false });
        setStatusFilters({ completed: false, overdue: false, upcoming: false });
        setShowFilterDropdown(false);
    };

    const handleTempPriorityChange = (priority) => {
        setTempPriorityFilters(prev => ({ ...prev, [priority]: !prev[priority] }));
    };

    const handleTempStatusChange = (status) => {
        setTempStatusFilters(prev => ({ ...prev, [status]: !prev[status] }));
    };
 
    // // Handle checkbox changes for priority and status filters
    // const handlePriorityChange = (priority) => {
    //     setPriorityFilters(prev => ({ ...prev, [priority]: !prev[priority] }));
    // };

    // const handleStatusChange = (status) => {
    //     setStatusFilters(prev => ({ ...prev, [status]: !prev[status] }));
    // };

     // Filter tasks based on search query, priority, and status
    const filteredTasks = tasks.filter(task => {
        const matchesSearchQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    task.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPriority = Object.values(priorityFilters).every(v => v === false) || priorityFilters[task.priority];
         
        let matchesStatus = true;
        if (statusFilters.completed) matchesStatus = task.completed;
        if (statusFilters.overdue) matchesStatus = !task.completed && new Date(task.dueDate) < new Date();
        if (statusFilters.upcoming) matchesStatus = !task.completed && new Date(task.dueDate) >= new Date();
 
        return matchesSearchQuery && matchesPriority && matchesStatus;
    });

    return (
        <div className={`dashboard${darkMode?'dark':''}`}>
            <header className="dashboard-header">
                <div className="dashboard-logo">
                    <span role="img" aria-label="logo"><FaBarsStaggered/></span>
                    <h1>Task Manager</h1>
                </div>
                <div className="search-bar">
                    <FiSearch/>
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}/>
                    {searchQuery && (
                        <button className="clear-search" onClick={clearSearch}>
                            <RxCross1 />
                        </button>
                    )}
                </div>
                <button onClick={toggleFilterDropdown}><FaFilter/></button>

                {/* Filter dropdown menu */}
                {showFilterDropdown && (
                    <div className="filter-dropdown">
                        <h4>Priority</h4>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tempPriorityFilters.Low}
                                    onChange={() => handleTempPriorityChange("Low")}
                                />
                                Low
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tempPriorityFilters.Low}
                                    onChange={() => handleTempPriorityChange("Low")}
                                />
                                Medium
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tempPriorityFilters.Low}
                                    onChange={() => handleTempPriorityChange("Low")}
                                />
                                High
                            </label>
                        </div>

                        <h4>Status</h4>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tempStatusFilters.completed}
                                    onChange={() => handleTempStatusChange("completed")}
                                />
                                Completed
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tempStatusFilters.completed}
                                    onChange={() => handleTempStatusChange("completed")}
                                />
                                Overdue
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tempStatusFilters.completed}
                                    onChange={() => handleTempStatusChange("completed")}
                                />
                                Upcoming
                            </label>
                        </div>

                        <button onClick={applyFilters} className="apply-filter-button">Apply</button>
                        <button onClick={clearFilters} className="clear-filter-button">Clear</button>
                    </div>
                )}

                <button className="theme-toggle" onClick={toggleTheme}>{darkMode ? '🌞' : '🌙'}</button>
            </header>
            <main>
                <TaskForm onAddTask={addTask} />
                <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
            </main>
        </div>
    );
};

export default Dashboard;
