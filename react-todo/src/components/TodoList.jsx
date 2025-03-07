import React from "react";
import { useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";

const TodoList = () => {
    // Initialize state with some sample todos
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build a Todo App", completed: true },
    ]);
    const [newTodo, setNewTodo] = useState("");

    // Function to add a new todo
    const addTodo = () => {
        if (newTodo.trim() === "") return; // Prevent empty todos
        const newTask = {
            id: Date.now(), // Unique ID
            text: newTodo,
            completed: false
        };
        setTodos([...todos, newTask]); // Update state with new todo
        setNewTodo(""); // Clear input field
    };

    // Function to toggle completion status
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Function to delete a todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                        <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;