/**
 * null vs undefined — рабочий пример. Запуск: node dist/demo-null.js
 */

// ── 1. Намеренное «ничего» (null) и «ещё не присвоено» (undefined)
const nothing: null = null; // тип null имеет РОВНО одно значение — null
const missing: undefined = undefined; // у undefined тоже одно значение
console.log("1. значения:", nothing, missing, "| типы:", typeof nothing, typeof missing);

// ── 2. Откуда берётся undefined без нашего участия
const obj: { a?: string; b?: string } = { a: "есть" };
console.log("2. отсутствующее свойство:", obj.b, "| ty:", typeof obj.b);

function noReturn(): undefined {
  // нет return → JS вернёт undefined
}
console.log("2. функция без return:", noReturn());

function withArg(x?: number): void {
  console.log("2. непереданный аргумент:", x);
}
withArg(); // undefined

// ── 3. Ловушка: typeof null — это "object" (исторический баг JS, жив с 1995)
console.log('3. typeof null =', typeof null, "← не \"null\", запомни это");

// ── 4. Нестрогое и строгое равенство
console.log("4. null == undefined:", null == undefined, "| null === undefined:", null === undefined);

// ── 5. Самое важное для QA: как это выглядит в JSON / в API-ответе
const payload = { a: undefined, b: null, c: 0, d: "" };
console.log("5. JSON.stringify:", JSON.stringify(payload));
console.log("   → ключ со значением undefined ИСЧЕЗ из JSON, а null остался!");

// ── 6. Работа с «может быть пусто»
interface User {
  name: string;
}
function findUser(id: number): User | undefined {
  return id === 1 ? { name: "Sergey" } : undefined;
}

const u1 = findUser(1);
const u2 = findUser(2);
console.log("6. без проверки:", u2, "| через ?. и ??:", u2?.name ?? "не найден");
console.log("   валидный:", u1?.name ?? "не найден");

// ?. — если слева null/undefined, дальше не идём, вернётся undefined (никакого падения)
// ?? — берёт правую часть только для null/undefined (в отличие от ||, который сработает и на 0, и на "")
const zero = 0;
console.log("6. 0 || 'дефолт' =", zero || "дефолт", "| 0 ?? 'дефолт' =", zero ?? "дефолт");

export {};
