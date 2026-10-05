/**
 * Этот файл СОБРАН НАМЕРЕННО НЕПРАВИЛЬНО — чтобы показать, что компилятор запрещает.
 * Запуск: npx tsc --noEmit --strict errors.ts
 */

// 1. В Java так можно (любая ссылка может быть null). В TS при strict — НЕЛЬЗЯ:
const bad1: string = null; // ❌ Type 'null' is not assignable to type 'string'
const bad2: string = undefined; // ❌ Type 'undefined' is not assignable to type 'string'

// 2. Чтобы разрешить — говорим об этом явно (аналог @Nullable, но проверяемый компилятором):
const ok1: string | null = null; // ✅
const ok2: string | undefined = undefined; // ✅

// 3. И компилятор не даст использовать, не проверив:
const mayBeNull: string | null = Math.random() > 0.5 ? "текст" : null;
const length1: number = mayBeNull.length; // ❌ 'mayBeNull' is possibly 'null'

// 4. А вот так — можно:
const length2: number = mayBeNull?.length ?? 0; // ✅
