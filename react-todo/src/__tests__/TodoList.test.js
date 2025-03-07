import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
    test("renders TodoList component with initial todos", () => {
        render(<TodoList />);

        // Ensure initial todos are displayed
        expect(screen.getByText("Learn React")).toBeInTheDocument();
        expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    });

    test("allows users to add a new todo", () => {
        render(<TodoList />);
        
        // Find input and button
        const input = screen.getByPlaceholderText("Add a new todo...");
        const addButton = screen.getByRole("button", { name: /add/i });

        // Simulate user input
        fireEvent.change(input, { target: { value: "Write tests for TodoList" } });

        // Simulate button click
        fireEvent.click(addButton);

        // Verify the new todo appears
        expect(screen.getByText("Write tests for TodoList")).toBeInTheDocument();
    });

    test("allows users to toggle a todo's completion status", () => {
        render(<TodoList />);

        // Find a todo item
        const todoItem = screen.getByText("Learn React");

        // Click the todo item to toggle completion
        fireEvent.click(todoItem);

        // Check if it has the completed class
        expect(todoItem).toHaveClass("completed");

        // Click again to remove completion
        fireEvent.click(todoItem);
        expect(todoItem).not.toHaveClass("completed");
    });

    test("allows users to delete a todo", () => {
        render(<TodoList />);

        // Find todo and delete button
        const todoToDelete = screen.getByText("Learn React");
        const deleteButton = todoToDelete.nextSibling; // Assuming delete button is next to the todo

        // Simulate delete action
        fireEvent.click(deleteButton);

        // Verify the todo is removed
        expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
    });
});