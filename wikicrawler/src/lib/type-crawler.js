const _ = require('lodash');

const crawlTypes = require('./crawl-types');

async function crawl (type, page) {
  if (!_.has(crawlTypes, type)) {
    throw `Invalid type: ${type}`;
  }

  const {
    list: { listUrl, getUrls },
    pageView: { extract }
  } = crawlTypes[type];

  await page.goto(listUrl, { waitUntil: 'networkidle2' });
  const urls = await page.evaluate(getUrls);

  const response = {
    errors: [],
    data: []
  };

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const data = await page.evaluate(extract);
      response.data.push(data);
    }
    catch (error) {
      response.errors.push({ url, error });
    }
  }

  return response;
}

module.exports = {
  crawl
};