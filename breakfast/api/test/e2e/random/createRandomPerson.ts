import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const dataFolder = '/data/';
export function createRandomPerson() {
  const isMale = Math.floor(Math.random() * 2);
  if (isMale) return ganerateMalePerson();
  else return ganerateFemalePerson();
}
async function ganerateMalePerson() {
  const pathToNameFile = path.join(__dirname, `${dataFolder}maleNames.txt`);
  const pathToSecondNameFile = path.join(
    __dirname,
    `${dataFolder}maleSecondNames.txt`,
  );
  const name: string = await getRandomLine(pathToNameFile);
  const secondName = await getRandomLine(pathToSecondNameFile);

  return [name, secondName];
}

async function ganerateFemalePerson() {
  const pathToNameFile = path.join(__dirname, `${dataFolder}femaleNames.txt`);
  const pathToSecondNameFile = path.join(
    __dirname,
    `${dataFolder}femaleSecondNames.txt`,
  );

  const name = await getRandomLine(pathToNameFile);
  const secondName = await getRandomLine(pathToSecondNameFile);

  name.replace(/[^a-zA-Z]/g, "")
  secondName.replace(/[^a-zA-Z]/g, "")

  return [name, secondName];
}

function getRandomLine(file): Promise<string>{
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', function (err, data) {
      if (err) {
        throw err;
      }
      const lines = data.split('\n');
      const line = lines[Math.floor(Math.random() * lines.length)];
      resolve(line);
    });
  });
}
