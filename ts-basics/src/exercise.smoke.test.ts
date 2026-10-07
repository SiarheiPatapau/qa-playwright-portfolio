/**
 * SMOKE-ТЕСТ — образец структуры, а не выполненное задание.
 * Он существует, чтобы проверить: цепочка «код → тест → отчёт» работает.
 *
 * Запуск:   npm test           (один прогон)
 *           npm run test:watch (перезапуск при сохранении файла)
 *
 * Твоя задача — написать настоящие тесты рядом (можно в этом же файле):
 *   statusColor  — все четыре статуса
 *   failedIds    — пустой массив / один упавший / все упавшие / ни одного упавшего
 *   formatRun    — с durationMs, без durationMs, и с durationMs = 0
 */
import { describe, it, expect } from "vitest";
import { statusColor, failedIds, formatRun, type TestRun } from "./exercise.js";

describe("statusColor", () => {
  it("passed → green", () => {
    expect(statusColor("passed")).toBe("green");   
  });

  it("failed → red", () => {
    expect(statusColor("failed")).toBe("red");   
  });

  it("skipped → gray", () => {
    expect(statusColor("skipped")).toBe("gray");   
  });

  it("flaky → orange", () => {
    expect(statusColor("flaky")).toBe("orange");   
  });
});

describe("failedIds", () => {
  it("empty array", () => {
    expect(failedIds([])).toEqual([]);
  });

  it("one failed", () => {
    expect(failedIds([{id: "api-login", status: "failed", durationMs: 100}])).toEqual(["api-login"]);
  });

  it("all failed", () => {
    expect(failedIds([{id: "api-login", status: "failed", durationMs: 100}, {id: "api-logout", status: "failed", durationMs: 200}]))
    .toEqual(["api-login", "api-logout"]);
  });

  it("no failed", () => {
    expect(failedIds([{id: "api-login", status: "passed", durationMs: 100}, {id: "api-logout", status: "skipped", durationMs: undefined}]))
    .toEqual([]);
  });
});

describe("formatRun", () => {
  it("passed with duration", () => {
    expect(formatRun({id: "api-login", status: "passed", durationMs: 120})).toBe("api-login — passed (120ms)");
  });

  it("passed without duration", () => {
    expect(formatRun({id: "ui-cart", status: "passed", durationMs: undefined})).toBe("ui-cart — skipped");
  });

  it("passed with duration 0", () => {
    expect(formatRun({id: "api-login", status: "passed", durationMs: 0})).toBe("api-login — passed (0ms)");
  });
});
