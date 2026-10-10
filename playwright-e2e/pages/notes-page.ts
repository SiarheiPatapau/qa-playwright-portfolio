import type { Page } from "@playwright/test";

export class NotesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoWithToken(token: string) {
    await this.page.addInitScript((authToken) => {
      window.localStorage.setItem("token", authToken);
    }, token);
    await this.page.goto("https://practice.expandtesting.com/notes/app/");
  }

  noteCard(title: string) {
    return this.page.getByTestId("note-card").filter({
      has: this.page.getByTestId("note-card-title").getByText(title, {
        exact: true,
      }),
    });
  }

  noteTitle(title: string) {
    return this.noteCard(title).getByTestId("note-card-title");
  }

  noteDescription(title: string) {
    return this.noteCard(title).getByTestId("note-card-description");
  }
}
