/**
 * TypeScript для того, кто пришёл из Java.
 * Запуск: npm run build && npm start
 */

// ─────────────────────────────────────────────────────────────
// 1. ПЕРЕМЕННЫЕ: let / const
// ─────────────────────────────────────────────────────────────
// Java:   int x = 1;      final int y = 2;
// TS:     let x = 1;      const y = 2;
// let  — можно переприсвоить
// const — нельзя переприсвоить (≈ final), НО объект внутри можно менять!

let counter = 1;
counter = 2; // ок

const MAX = 100;
// MAX = 200; // ❌ ошибка компиляции: Cannot assign to 'MAX' because it is a constant

const user = { name: "Sergey", age: 36 };
user.age = 37; // ✅ можно — const запрещает менять ссылку, а не содержимое объекта
// user = { name: "X", age: 1 }; // ❌ нельзя — переприсваивание переменной

// ─────────────────────────────────────────────────────────────
// 2. ТИПЫ: их меньше, чем в Java
// ─────────────────────────────────────────────────────────────
// Java:  byte short int long float double boolean char String
// TS:    number  boolean  string  (и всё) + bigint, symbol

const n: number = 42; // один тип на всё: int/long/double/float
const price: number = 19.99; // дробные — это тоже number
const big: bigint = 9_007_199_254_740_991n; // аналог long для огромных чисел
const flag: boolean = true;
const title: string = "hello"; // String — это тип-объект, string — примитив
const nothing: null = null;
const missing: undefined = undefined;

// ВАЖНО: типы пишутся ПОСЛЕ имени, а не перед.
// Java: String name = "x";   →   TS: const name: string = "x";

// Тип можно не писать — TS выведет его сам (type inference, как var в Java 10+)
const inferred = "текст"; // TS сам понимает, что это string
// inferred = 5; // ❌ и это ловится на этапе компиляции, а не в рантайме

// ─────────────────────────────────────────────────────────────
// 3. МАССИВЫ И КОРТЕЖИ
// ─────────────────────────────────────────────────────────────
// Java: String[] names = {...};  List<String> list = new ArrayList<>();
const names: string[] = ["Аня", "Ян"];
const ids: Array<number> = [1, 2, 3]; // то же самое, другой синтаксис

// Кортеж — фиксированная длина и порядок типов (в Java такого нет из коробки)
const point: [number, number] = [10, 20];
// const bad: [number, number] = [10, "x"]; // ❌

// ─────────────────────────────────────────────────────────────
// 4. UNION — то, чего в Java НЕТ
// ─────────────────────────────────────────────────────────────
// Переменная может быть одним из нескольких типов
type Id = string | number;

const userId: Id = 42; // ✅
const orderId: Id = "ORD-1"; // ✅

function formatId(id: Id): string {
  // TS заставляет проверить тип перед использованием — как pattern matching, но проще
  if (typeof id === "number") return id.toFixed(0);
  return id.toUpperCase();
}

// ─────────────────────────────────────────────────────────────
// 5. any vs unknown (аналог Object в Java)
// ─────────────────────────────────────────────────────────────
// any  — отключает проверки (ОПАСНО, в strict-проектах почти запрещён)
// unknown — «я не знаю тип, но заставь меня проверить перед использованием»
let dangerous: any = "строка";
// Компилятор здесь ПРОМОЛЧИТ — и оно упадёт в рантайме. Ловим, чтобы файл жил:
try {
  dangerous.несуществующийМетод();
} catch (e) {
  console.log("any упал в рантайме:", (e as Error).message);
}

let safe: unknown = "строка";
// safe.toUpperCase(); // ❌ ошибка: нужно сначала сузить тип
if (typeof safe === "string") {
  safe.toUpperCase(); // ✅ теперь TS знает, что это string
}

// ─────────────────────────────────────────────────────────────
// 6. ОБЪЕКТЫ И ИНТЕРФЕЙСЫ (структурная типизация!)
// ─────────────────────────────────────────────────────────────
// В Java интерфейс нужно ЯВНО реализовать (implements).
// В TS достаточно СОВПАДЕНИЯ ФОРМЫ — это называется duck typing.

interface Person {
  readonly id: number; // readOnly, менять нельзя
  name: string;
  age?: number; // ? = необязательное поле (Optional в Java)
}

const sergey: Person = { id: 1, name: "Sergey" }; // age можно не указывать
// sergey.id = 2; // ❌ readonly

// Никакого "implements" не нужно — форма совпала, значит подходит:
function greet(p: Person): string {
  return `Привет, ${p.name}`;
}
greet({ id: 9, name: "Кто-то" }); // ✅ подходит по форме

// ─────────────────────────────────────────────────────────────
// 7. ЛИТЕРАЛЬНЫЕ ТИПЫ — удобно для статусов
// ─────────────────────────────────────────────────────────────
// Java: enum Status { NEW, PASSED, FAILED }
// TS: то же самое, но без объявления enum
type TestStatus = "new" | "passed" | "failed" | "skipped";
const status: TestStatus = "passed";
// const wrong: TestStatus = "broken"; // ❌ — опечатка поймана компилятором

// ─────────────────────────────────────────────────────────────
// 8. null / undefined — главная боль Java-разработчика
// ─────────────────────────────────────────────────────────────
// В Java только null, и NPE ловится в рантайме.
// В TS при strict:nullChecks undefined и null — отдельные типы.
function findName(list: string[], index: number): string | undefined {
  return list[index]; // может не быть элемента — тип это честно говорит
}

const found = findName(names, 5);
// found.length;           // ❌ ошибка компиляции: возможно undefined
if (found !== undefined) {
  console.log(found.length); // ✅
}
console.log(found?.length ?? 0); // optional chaining + nullish coalescing

// ─────────────────────────────────────────────────────────────
// 9. И немного запуска, чтобы файл был живым
// ─────────────────────────────────────────────────────────────
console.log("=== TypeScript basics ===");
console.log("userId:", formatId(userId), "| orderId:", formatId(orderId));
console.log("greet:", greet(sergey), "|", greet({ id: 2, name: "Другая форма" }));
console.log("status:", status, n, price, big, flag, title, nothing, missing);
console.log(
  "found fallback:",
  found?.length ?? 0,
  "| point:",
  point,
  "| ids:",
  ids,
  "| counter:",
  counter,
  MAX,
);

export {};
