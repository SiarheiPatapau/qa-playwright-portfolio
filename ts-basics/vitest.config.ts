import { defineConfig } from "vitest/config";

// Конфиг тестового раннера — аналог surefire/failsafe конфигурации в Maven,
// только здесь он редко нужен: Vitest из коробки находит *.test.ts и умеет TS.
export default defineConfig({
  test: {
    // где искать тесты
    include: ["src/**/*.test.ts"],
    // подробный вывод по каждому тесту
    reporters: ["verbose"],
  },
});
