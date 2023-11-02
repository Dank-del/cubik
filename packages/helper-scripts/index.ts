import { config } from 'dotenv';

import {
  createComponentNames,
  generateSemantic,
} from './src/color/generateCSS';
import { serializeSemantic } from './src/color/serializeSemantic';

console.log('Helper Script Started');

config();

createComponentNames();
generateSemantic();
console.log(JSON.stringify(serializeSemantic()));
