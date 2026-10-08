import { test, expect } from "@playwright/test";

test("adds a new todo", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  const newTodo = page.getByPlaceholder("What needs to be done?");
  await newTodo.fill("Learn Playwright");
  await newTodo.press("Enter");
  await expect(page.getByTestId("todo-title")).toHaveText("Learn Playwright");
  await expect(newTodo).toHaveValue("");
});

test("marks a todo as completed", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  const newTodo = page.getByPlaceholder("What needs to be done?");
  await newTodo.fill("Learn Playwright");
  await newTodo.press("Enter");
  await expect(page.getByTestId("todo-title")).toHaveText("Learn Playwright");
  await expect(newTodo).toHaveValue("");
  const todoItem = page.getByTestId("todo-item");
  const checkbox = todoItem.getByRole("checkbox");
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await expect(todoItem).toHaveClass(/\bcompleted\b/);
});

test("completes only the selected todo", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  const newTodo = page.getByPlaceholder("What needs to be done?");
  await newTodo.fill("Learn Playwright");
  await newTodo.press("Enter");
  await newTodo.fill("Write API tests");
  await newTodo.press("Enter");
  await expect(newTodo).toHaveValue("");
  const firstTodo = page
    .getByTestId("todo-item")
    .filter({ hasText: "Learn Playwright" });
  const secondTodo = page
    .getByTestId("todo-item")
    .filter({ hasText: "Write API tests" });
  await expect(firstTodo.getByTestId("todo-title")).toHaveText(
    "Learn Playwright",
  );
  await expect(secondTodo.getByTestId("todo-title")).toHaveText(
    "Write API tests",
  );
  await secondTodo.getByRole("checkbox").check();
  await expect(firstTodo.getByRole("checkbox")).not.toBeChecked();
  await expect(secondTodo.getByRole("checkbox")).toBeChecked();

  await expect(firstTodo).not.toHaveClass(/\bcompleted\b/);
  await expect(secondTodo).toHaveClass(/\bcompleted\b/);
});
