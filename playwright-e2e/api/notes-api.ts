import type { APIRequestContext } from "@playwright/test";

type RegisterUserData = {
  name: string;
  email: string;
  password?: string;
};

type LoginData = {
  email: string;
  password: string;
};

type CreateNoteData = {
  title: string;
  description: string;
  category: "Home" | "Work" | "Personal";
};

export class NotesApi {
  private readonly request: APIRequestContext;
  private readonly baseUrl = "https://practice.expandtesting.com/notes/api";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  healthCheck() {
    return this.request.get(`${this.baseUrl}/health-check`);
  }

  registerUser(data: RegisterUserData) {
    return this.request.post(`${this.baseUrl}/users/register`, { form: data });
  }

  login(data: LoginData) {
    return this.request.post(`${this.baseUrl}/users/login`, { form: data });
  }

  deleteAccount(token: string) {
    return this.request.delete(`${this.baseUrl}/users/delete-account`, {
      headers: {
        "x-auth-token": token,
      },
    });
  }

  getProfile(token: string) {
    return this.request.get(`${this.baseUrl}/users/profile`, {
      headers: {
        "x-auth-token": token,
      },
    });
  }

  createNote(data: CreateNoteData, token: string) {
    return this.request.post(`${this.baseUrl}/notes`, {
      headers: {
        "x-auth-token": token,
      },
      form: data,
    });
  }

  getNote(noteId: string, token: string) {
    return this.request.get(`${this.baseUrl}/notes/${noteId}`, {
      headers: {
        "x-auth-token": token,
      },
    });
  }

  deleteNote(noteId: string, token: string) {
    return this.request.delete(`${this.baseUrl}/notes/${noteId}`, {
      headers: {
        "x-auth-token": token,
      },
    });
  }
}
