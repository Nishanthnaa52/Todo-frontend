import React, { useState, useEffect } from 'react';
import API from './services/api.js';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(''); // State for the new todo title
    const [description, setDescription] = useState(''); // State for the new todo description
    const [completed, setCompleted] = useState(false); // State for the completed status

    // Fetch Todos from Backend
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await API.get('todos/');
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error.response || error.message);
            }
        };

        fetchTodos();
    }, []);

    // Add a New Todo
    const addTodo = async (e) => {
        e.preventDefault(); // Prevent page reload
        if (!newTodo.trim() || !description.trim()) return; // Prevent empty submissions

        const newTodoData = {
            title: newTodo,
            description: description,
            completed: completed,
        };

        try {
            const response = await API.post('todos/', newTodoData);
            setTodos([...todos, response.data]); // Update the state with the new todo
            setNewTodo(''); // Clear the title input
            setDescription(''); // Clear the description input
            setCompleted(false); // Reset the completed checkbox
        } catch (error) {
            console.error('Error adding todo:', error.response || error.message);
        }
    };

    // Delete a Todo
    const deleteTodo = async (id) => {
        try {
            await API.delete(`todos/${id}/`);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error.response || error.message);
        }
    };

    return (
        <div className="container">
            <h1>Todo List</h1>

            {/* Form to Add a New Todo */}
            <form onSubmit={addTodo} className="add-todo-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="todo-input"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="todo-textarea"
                />
                <label className="checkbox-label">
                    Completed:
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        className="checkbox"
                    />
                </label>
                <button type="submit" className="add-btn">
                    Add
                </button>
            </form>

            {/* Display Todos */}
            {todos.length > 0 ? (
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                            <p>
                                <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
                            </p>
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-todos">No todos available</p>
            )}
        </div>
    );
};

export default App;
