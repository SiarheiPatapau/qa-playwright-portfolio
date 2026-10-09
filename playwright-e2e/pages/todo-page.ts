import type { Page, Locator } from "@playwright/test";

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder("What needs to be done?");
    this.todoTitles = page.getByTestId("todo-title");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://demo.playwright.dev/todomvc/#/");
  }

  async addTodo(title: string): Promise<void> {
    await this.newTodoInput.fill(title);
    await this.newTodoInput.press("Enter");
  }

  todoItem(title: string): Locator {
    return this.page.getByTestId("todo-item").filter({
      has: this.page.getByText(title, { exact: true }),
    });
  }

  async completeTodo(title: string): Promise<void> {
    const todoItem = this.todoItem(title);
    const checkbox = todoItem.getByRole("checkbox");
    await checkbox.check();
  }
}
