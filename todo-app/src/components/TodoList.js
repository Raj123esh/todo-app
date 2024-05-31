// src/components/TodoList.js
import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim()) {
            const newTask = { id: Date.now(), text: taskInput.trim(), completed: false };
            setTasks([...tasks, newTask]);
            setTaskInput('');
        }
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const filteredTasks = tasks.filter(task => 
        filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
    );

    return (
        <div>
            <h1>To-Do List</h1>
            <input 
                type="text" 
                value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)} 
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        <span 
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleCompletion(task.id)}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => removeTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
