import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
    test("renders TodoList component with initial todos", () => {
        render(<TodoList />);
        
        // Check if initial todos are displayed
        expect(screen.getByText("Learn React")).toBeInTheDocument();
        expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    });

    test("allows users to add a new todo", () => {
        render(<TodoList />);
        
        // Find the input field and add button
        const input = screen.getByPlaceholderText("Add a new todo...");
        const addButton = screen.getByText("Add");
    
        // Simulate typing a new todo
        fireEvent.change(input, { target: { value: "Write tests for TodoList" } });
    
        // Simulate clicking the Add button
        fireEvent.click(addButton);
    
        // Check if the new todo appears in the list
        expect(screen.getByText("Write tests for TodoList")).toBeInTheDocument();
    });

    test("allows users to toggle a todo's completion status", () => {
        render(<TodoList />);
        
        // Find a todo item
        const todoItem = screen.getByText("Learn React");
    
        // Click the todo item to toggle completion
        fireEvent.click(todoItem);
    
        // Check if the completed class is applied
        expect(todoItem).toHaveClass("completed");
    
        // Click again to undo completion
        fireEvent.click(todoItem);
        expect(todoItem).not.toHaveClass("completed");
    });

    test("allows users to delete a todo", () => {
        render(<TodoList />);
    
        // Find the todo item to delete
        const todoToDelete = screen.getByText("Learn React");
        const deleteButton = todoToDelete.nextSibling; // Assuming delete button is next to the todo item
    
        // Click the delete button
        fireEvent.click(deleteButton);
    
        // Check if the todo is removed
        expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
    });
});