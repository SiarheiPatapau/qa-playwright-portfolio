// МОДУЛЬ: одна строка export {} — и файл изолирован, конфликта нет
export {};

function helper(): string {
  return "я из module-b";
}
console.log(helper());
