import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { NotesApi } from "../api/notes-api";
import { NotesPage } from "../pages/notes-page";

test("get health check success", async ({ request }) => {
  const api = new NotesApi(request);
  const response = await api.healthCheck();
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.status).toBe(200);
  expect(body.message).toBe("Notes API is Running");
  expect(body.success).toBe(true);
});

test("rejects registration without a password", async ({ request }) => {
  const api = new NotesApi(request);
  const response = await api.registerUser({
    name: "QA Learner",
    email: "qa-lesson@example.com",
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.message).toBe("Password must be between 6 and 30 characters");
  expect(body.success).toBe(false);
  expect(body.status).toBe(400);
});

test("registers a new user", async ({ request }) => {
  const email = `qa-${randomUUID().slice(0, 8)}@example.com`;
  const password = `password-${randomUUID().slice(0, 8)}`;
  const name = `QA Learner`;
  let token: string | undefined;
  const api = new NotesApi(request);

  try {
    const registerResponse = await api.registerUser({
      name,
      email,
      password,
    });

    const loginResponse = await api.login({ email, password });

    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    token = loginBody.data.token;
    expect(registerResponse.status()).toBe(201);
    const registerBody = await registerResponse.json();
    expect(registerBody.success).toBe(true);
    expect(registerBody.data.name).toBe(name);
    expect(registerBody.data.email).toBe(email);
    expect(registerBody.data).not.toHaveProperty("password");
  } finally {
    if (token) {
      const deleteResponse = await api.deleteAccount(token);

      expect(deleteResponse.status()).toBe(200);
      const getProfileResponse = await api.getProfile(token);

      expect(getProfileResponse.status()).toBe(401);
    }
  }
});

test("shows an API-created note in the UI", async ({ request, page }) => {
  const email = `qa-${randomUUID().slice(0, 8)}@example.com`;
  const password = `password-${randomUUID().slice(0, 8)}`;
  const name = `QA Learner`;
  let token: string | undefined;
  let noteId: string | undefined;
  const api = new NotesApi(request);
  const notesPage = new NotesPage(page);

  try {
    const registerResponse = await api.registerUser({
      name,
      email,
      password,
    });

    expect(registerResponse.status()).toBe(201);
    const registerBody = await registerResponse.json();
    const loginResponse = await api.login({ email, password });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    token = loginBody.data.token;
    if (!token) {
      throw new Error("Login response did not contain a token");
    }

    expect(registerBody.success).toBe(true);

    const title = `Work note ${randomUUID().slice(0, 8)}`;
    const description = "Prepare API tests for the portfolio";
    const category = "Work";

    const createNoteResponse = await api.createNote(
      { title, description, category },
      token,
    );

    const createNoteBody = await createNoteResponse.json();
    noteId = createNoteBody.data?.id;
    expect(createNoteResponse.status()).toBe(200);
    if (typeof noteId !== "string" || noteId.length === 0) {
      throw new Error("Create note response did not contain a valid ID");
    }
    expect(createNoteBody.success).toBe(true);
    expect(createNoteBody.data.title).toBe(title);
    expect(createNoteBody.data.description).toBe(description);
    expect(createNoteBody.data.category).toBe(category);
    expect(noteId).toEqual(expect.any(String));
    expect(noteId).not.toBe("");
    const getNoteResponse = await api.getNote(noteId, token);

    expect(getNoteResponse.status()).toBe(200);
    const getNoteBody = await getNoteResponse.json();
    expect(getNoteBody.success).toBe(true);
    expect(getNoteBody.data.title).toBe(title);
    expect(getNoteBody.data.description).toBe(description);
    expect(getNoteBody.data.category).toBe(category);
    expect(getNoteBody.data.id).toBe(noteId);
    await notesPage.gotoWithToken(token);
    await expect(notesPage.noteCard(title)).toHaveCount(1);
    await expect(notesPage.noteTitle(title)).toHaveText(title);
    await expect(notesPage.noteDescription(title)).toHaveText(description);
  } finally {
    if (token) {
      try {
        if (noteId) {
          const deleteNoteResponse = await api.deleteNote(noteId, token);
          expect(deleteNoteResponse.status()).toBe(200);
          const getNoteResponse = await api.getNote(noteId, token);

          expect(getNoteResponse.status()).toBe(404);
        }
      } finally {
        const deleteResponse = await api.deleteAccount(token);

        expect(deleteResponse.status()).toBe(200);
        const getProfileResponse = await api.getProfile(token);
        expect(getProfileResponse.status()).toBe(401);
      }
    }
  }
});
