const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

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
  .argv

crawl(args)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

async function crawl (args) {
  console.log(args);
}