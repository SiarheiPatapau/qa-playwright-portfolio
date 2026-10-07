type TestStatus = "passed" | "failed" | "skipped" | "flaky";

interface TestRun {
  id: string;
  status: TestStatus;
  durationMs?: number;  // нет значения, если тест не выполнялся (skipped)
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
    return runs.filter(run => run.status === "failed").map(run => run.id);
  }

  export function formatRun(run: TestRun): string {
    let duration = "";
    if (run.durationMs===undefined) {
        duration = "skipped";
        return `${run.id} — ${duration}`;
    } else {
        duration = `${run.durationMs}ms`;
        return `${run.id} — ${run.status} (${duration})`;
    }
}