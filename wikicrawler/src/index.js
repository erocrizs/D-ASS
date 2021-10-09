const _ = require('lodash');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const CONSTANTS = require('./constants');

parseArgs()
  .then(crawl)
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
        default: 'data.json',
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

  const toCrawl = [];
  
  if (_.includes(args.equipments, 'all')) {
    toCrawl.push(...CONSTANTS.DATA.EQUIPMENT_TYPES);
  }
  else if (args.equipments?.length) {
    toCrawl.push(...args.equipments);
  }

  if (_.includes(args.weapons, 'all')) {
    toCrawl.push(...CONSTANTS.DATA.WEAPON_TYPES);
  }
  else if (args.weapons?.length) {
    toCrawl.push(...args.weapons);
  }

  return {toCrawl, filepath: args.filepath};
}

async function crawl (args) {
  console.log(args); 
}