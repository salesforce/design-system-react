import { parse } from 'react-docgen';
import fs from 'fs';
import path from 'path';
import { components } from '../package.json';

const output = {};

components.forEach(componentName => {
  const inputPath = path.join(__dirname, '../components', componentName, 'index.jsx');
  const src = fs.readFileSync(inputPath, 'utf8');
  const doc = parse(src);

  output[componentName] = doc;
});

const outputPath = path.join(__dirname, '../demo/docs/components.json');

fs.writeFile(outputPath, JSON.stringify(output, null, 4), err => {
  if (err) return console.log(err);
});
