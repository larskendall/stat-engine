import Handlebars from 'handlebars';
import util from 'util';
import fs from 'fs';
import path from 'path';
import { Log } from './log';

const readFileAsync = util.promisify(fs.readFile);
const readdirAsync = util.promisify(fs.readdir);

export async function registerPartials() {
  // TODO: Components

  // Sections
  const sectionsPath = path.join(__dirname, '../../email/partials/sections');
  const sectionFilenames = await readdirAsync(sectionsPath);
  for (const filename of sectionFilenames) {
    const name = filename.split('.')[0];
    const fileStr = await readFileAsync(`${sectionsPath}/${filename}`, 'utf8');
    const partialName = `section_${name}`;
    Handlebars.registerPartial(partialName, fileStr);
    Log.info(`Registered partial: ${partialName} (${filename})`);
  }
}
