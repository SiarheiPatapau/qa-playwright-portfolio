type TestStatus = "passed" | "failed" | "skipped" | "flaky";

interface TestRun {
  id: string;
  status: TestStatus;
  durationMs?: number; // нет значения, если тест не выполнялся (skipped)
}

export function statusColor(status: TestStatus): string {
  switch (status) {
    case "passed":
      return "green";
    case "failed":
      return "red";
    case "skipped":
      return "gray";
    case "flaky":
      return "orange";
    default:
      const unexpected: never = status;
      return unexpected;
  }
}

export function failedIds(runs: TestRun[]): string[] {
  return runs.filter((run) => run.status === "failed").map((run) => run.id);
}

export function formatRun(run: TestRun): string {
  if (run.durationMs === undefined) {
    return `${run.id} — ${run.status}`;
  }
  return `${run.id} — ${run.status} (${run.durationMs}ms)`;
}
