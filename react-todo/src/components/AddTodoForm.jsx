import { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
    const [newTodo, setNewTodo] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (newTodo.trim() === "") return; // Prevent empty todos
        onAddTodo(newTodo); // Call parent function
        setNewTodo(""); // Clear input field
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;