const _ = require('lodash');
const puppeteer = require('puppeteer');

const typeCrawler = require('./lib/type-crawler');

async function crawl (types) {
  console.log('Launching puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const data = {};
  for (const type of types) {
    try {
      console.log(`Crawling for ${type}...`);
      const response = await typeCrawler.crawl(type, page);
      data[type] = response.data;

      if (!_.isEmpty(response.errors)) {
        console.log(`Errors encountered while crawling for ${type}`)
        console.table(response.errors);
      }
    }
    catch (error) {
      console.error(`Error encountered while crawling for ${type}:`, error);
    }
  }

  console.log('Closing puppeteer...');
  browser.close();
  return data;
}

module.exports = {
  crawl
};