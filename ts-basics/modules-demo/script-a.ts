// СКРИПТ: в файле нет ни import, ни export → глобальная область видимости
function helper(): string {
  return "я из script-a";
}
console.log(helper());
