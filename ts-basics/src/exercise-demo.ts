import { formatRun, failedIds, statusColor } from "./exercise.js";

console.log(formatRun({id: "api-login", status: "passed", durationMs: 120}));
console.log(failedIds([{id: "api-login", status: "passed", durationMs: 120}, {id: "api-logout", status: "failed", durationMs: 100}]));
console.log(statusColor("passed"));