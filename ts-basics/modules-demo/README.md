# script vs module — why `export {}` matters

Three tiny files that demonstrate the single most invisible rule in TypeScript: **a file without any `import`/`export` is a script, and everything in it lands in the global scope.**

## The three files

- `script-a.ts` — declares `function helper()`
- `script-b.ts` — declares `function helper()` again (same name, different file)
- `module-b.ts` — the same code, but with one line at the top: `export {};`

## Try it yourself

**1. Two scripts collide:**

```bash
npx tsc --noEmit --ignoreConfig script-a.ts script-b.ts
```

Expected output:

```
script-a.ts(2,10): error TS2393: Duplicate function implementation.
script-b.ts(2,10): error TS2393: Duplicate function implementation.
```

Both files are scripts, so both `helper` functions live in the same global scope — for the compiler it is one function declared twice.

**2. Add `export {};` and the collision disappears:**

```bash
npx tsc --noEmit --ignoreConfig script-a.ts module-b.ts
```

No errors: `module-b.ts` has an `export`, so it is a **module** with its own scope. Its `helper` is private to that file.

## The rule

| File contains                    | It is  | Where its declarations live                                     |
| -------------------------------- | ------ | --------------------------------------------------------------- |
| no `import` / `export`           | script | global scope — shared with every other script                   |
| at least one `import` / `export` | module | its own file scope; visible outside only if explicitly exported |

`export {};` exports nothing — it exists purely to mark the file as a module.

## Why it matters in real projects

- **Name collisions** between files that have nothing to do with each other (`TS2393`).
- **Hidden dependencies**: file A silently uses a variable declared in file B, with no import to show it.
- **Tooling** (bundlers, linters, test runners) expects modules; Playwright specs get `import { test } from "@playwright/test"` and are modules for free.

If a file needs to be usable from elsewhere, export properly instead of using the empty marker:

```ts
export function statusColor(status: TestStatus): string { ... }
// then, in another file:
// import { statusColor } from "./exercise.js";
```
