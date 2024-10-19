const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .option('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Перевірка наявності файлу для читання
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Читання JSON з файлу
let jsonData;
try {
  const data = fs.readFileSync(options.input, 'utf-8');
  jsonData = JSON.parse(data);
  console.log('JSON data read successfully:', jsonData);
} catch (error) {
  console.error('Error reading or parsing input file:', error.message);
  process.exit(1);
}

// Обробка даних для формування результату
let result = [];

// Знайдемо об'єкт з курсами валют
const ratesObject = jsonData.find(entry => entry.rates);

if (ratesObject && ratesObject.rates) {
  result = ratesObject.rates.map(entry => {
    if (entry.date && entry.rate) {
      return `${entry.date}:${entry.rate}`; // Форматуємо <дата>:<курс>
    } else {
      console.warn('Entry missing date or rate:', entry);
      return null; // Повертаємо null для неповних записів
    }
  }).filter(item => item !== null); // Фільтруємо null значення
}

// Виведення результату у консоль, якщо вибрано
if (options.display) {
  result.forEach(item => console.log(item));
}

// Запис результату у файл, якщо вказано
if (options.output) {
  fs.writeFileSync(options.output, result.join('\n'), 'utf-8');
}

