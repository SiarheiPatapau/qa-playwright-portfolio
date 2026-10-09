import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";

test("adds a new todo", async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo("Learn Playwright");

  await expect(todoPage.todoTitles).toHaveText("Learn Playwright");
  await expect(todoPage.newTodoInput).toHaveValue("");
});

test("marks a todo as completed", async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo("Learn Playwright");

  await expect(todoPage.todoTitles).toHaveText("Learn Playwright");
  await expect(todoPage.newTodoInput).toHaveValue("");

  await todoPage.completeTodo("Learn Playwright");

  const todoItem = todoPage.todoItem("Learn Playwright");

  await expect(todoItem.getByRole("checkbox")).toBeChecked();
  await expect(todoItem).toHaveClass(/\bcompleted\b/);
});

test("completes only the selected todo", async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo("Learn Playwright");
  await todoPage.addTodo("Write API tests");

  await expect(todoPage.todoTitles).toHaveText([
    "Learn Playwright",
    "Write API tests",
  ]);
  await expect(todoPage.newTodoInput).toHaveValue("");

  await todoPage.completeTodo("Learn Playwright");

  const firstTodo = todoPage.todoItem("Write API tests");
  await expect(firstTodo.getByRole("checkbox")).not.toBeChecked();
  await expect(firstTodo).not.toHaveClass(/\bcompleted\b/);

  const secondTodo = todoPage.todoItem("Learn Playwright");
  await expect(secondTodo.getByRole("checkbox")).toBeChecked();
  await expect(secondTodo).toHaveClass(/\bcompleted\b/);
});

test("completes the exact todo when titles overlap", async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo("Learn Playwright");
  await todoPage.addTodo("Learn Playwright advanced");

  await expect(todoPage.todoTitles).toHaveText([
    "Learn Playwright",
    "Learn Playwright advanced",
  ]);
  await expect(todoPage.newTodoInput).toHaveValue("");

  await todoPage.completeTodo("Learn Playwright");

  const advancedTodo = todoPage.todoItem("Learn Playwright advanced");
  await expect(advancedTodo.getByRole("checkbox")).not.toBeChecked();
  await expect(advancedTodo).not.toHaveClass(/\bcompleted\b/);

  const basicTodo = todoPage.todoItem("Learn Playwright");
  await expect(basicTodo.getByRole("checkbox")).toBeChecked();
  await expect(basicTodo).toHaveClass(/\bcompleted\b/);
});
