// СКРИПТ: то же самое имя функции → конфликт с script-a.ts
function helper(): string {
  return "я из script-b";
}
console.log(helper());
