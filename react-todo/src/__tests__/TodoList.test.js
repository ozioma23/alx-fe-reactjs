import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

// Test initial render
test("renders the TodoList component with initial todos", () => {
    render(<TodoList />);
    
    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
});

// Test adding a new todo
test("adds a new todo", () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add");
    
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);
    
    expect(screen.getByText("New Task")).toBeInTheDocument();
});

// Test toggling a todo
test("toggles a todo's completion status", () => {
    render(<TodoList />);
    
    const todoItemText = screen.getByText("Learn React");
    const todoItem = todoItemText.closest("li");
    
    fireEvent.click(todoItemText);
    expect(todoItem).toHaveStyle("text-decoration: line-through");
    
    fireEvent.click(todoItemText);
    expect(todoItem).toHaveStyle("text-decoration: none");
});

// Test deleting a todo
test("deletes a todo", () => {
    render(<TodoList />);
    
    const todoItemText = screen.getByText("Learn React");
    const listItem = todoItemText.closest("li");
    
    const deleteButton = within(listItem).getByRole("button", { name: "Delete" });
    
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
