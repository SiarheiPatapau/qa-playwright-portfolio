# ts-basics — TypeScript for a Java engineer

A single annotated file that walks through TypeScript fundamentals from the perspective of someone who has written Java for 13 years. Every section is commented with the Java equivalent, so the mental mapping is explicit.

## Run it

```bash
npm install
npm run build && npm start
npm run check        # type-check only, no build
npm test             # run unit tests (Vitest)
npm run test:watch   # re-run tests on save
npm run format       # format everything with Prettier
npm run format:check # verify formatting (this is what CI runs)
```

## What it covers

1. **Variables** — `let` / `const`, and why `const` does not make an object immutable
2. **Primitive types** — one `number` instead of `int`/`long`/`double`/`float`
3. **Arrays and tuples** — fixed-shape tuples, which Java does not have out of the box
4. **Union types** — `string | number`, with the narrowing the compiler forces on you
5. **`any` vs `unknown`** — the difference between switching checks off and being told to check
6. **Objects and interfaces** — structural typing (duck typing) instead of `implements`
7. **Literal types** — `"new" | "passed" | "failed"` as a type-safe replacement for enums
8. **`null` / `undefined`** — why NPE-style bugs are caught at compile time under `strict`
9. **Optional chaining and nullish coalescing** — `?.` and `??`

## Extra: `null` vs `undefined`

`null` and `undefined` are two different kinds of "nothing", and the difference bites in API testing:

- `undefined` — the value was never assigned (JS engine puts it there);
- `null` — empty on purpose (a human puts it there).

Run `npm start` after the build and look at the `demo-null.ts` section: `JSON.stringify({ a: undefined, b: null })` produces `{"b":null}` — **a key holding `undefined` disappears from JSON, while `null` stays**. In an API response those are two different states: the field is missing entirely, or the field is present and empty.

The `errors-demo/` folder holds a deliberately broken file showing what the compiler refuses to accept:

```bash
npx tsc --noEmit --strict --ignoreConfig --target ES2022 --module ESNext errors-demo/errors.ts
```

Expected: `TS2322` (null/undefined not assignable to `string`) and `TS18047` (possibly `null`). It is excluded from the build on purpose — it exists to be read, not compiled.

`modules-demo/` shows the script-vs-module rule: two files without `import`/`export` collide in the global scope (`TS2393`), and one line of `export {}` fixes it. See [`modules-demo/README.md`](./modules-demo/README.md).

## Key takeaways

- **Types are erased.** They exist for the compiler only; there is nothing to inspect at runtime, so `instanceof` on an interface is impossible.
- **Structural typing.** A value fits an interface if its shape matches — no explicit `implements` needed. Java asks "what is your passport", TypeScript asks "what can you do".
- **`strict` is not optional.** With `strictNullChecks`, a possible `undefined` cannot be used until it is handled.
