// src/utils/taskUtils.js
export const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
export const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));