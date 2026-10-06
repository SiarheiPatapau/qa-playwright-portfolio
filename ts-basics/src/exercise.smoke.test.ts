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
});
