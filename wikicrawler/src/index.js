const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const CONSTANTS = require('./constants');
const { crawl } = require('./crawler');

parseArgs()
  .then(start)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

async function parseArgs () {
  const args = yargs(hideBin(process.argv))
    .option(
      'filepath',
      {
        alias: 'f',
        default: CONSTANTS.DEFAULT.FILEPATH,
        describe: 'filepath where the crawled data saved into',
        type: 'string'
      }
    )
    .option(
      'equipments',
      {
        group: 'Crawl:',
        describe: 'types of equipments to be crawled',
        type: 'array',
        choices: ['all', ...CONSTANTS.DATA.EQUIPMENT_TYPES],
      }
    )
    .option(
      'weapons',
      {
        group: 'Crawl:',
        describe: 'types of weapons to be crawled',
        type: 'array',
        choices: ['all', ...CONSTANTS.DATA.WEAPON_TYPES],
      }
    )
    .argv;

  const types = [];
  
  if (_.includes(args.equipments, 'all')) {
    types.push(...CONSTANTS.DATA.EQUIPMENT_TYPES);
  }
  else if (args.equipments?.length) {
    types.push(...args.equipments);
  }

  if (_.includes(args.weapons, 'all')) {
    types.push(...CONSTANTS.DATA.WEAPON_TYPES);
  }
  else if (args.weapons?.length) {
    types.push(...args.weapons);
  }

  return {types: types, filepath: args.filepath};
}

async function start (args) {
  const data = await crawl(args.types);
  fs.writeFileSync(args.filepath, JSON.stringify(data));
}