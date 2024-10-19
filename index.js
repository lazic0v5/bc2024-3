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

// Тут можна додати код для обробки файлу і виводу результатів
console.log('Input file:', options.input);
console.log('Output file:', options.output);
console.log('Display:', options.display);
