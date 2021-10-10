const listUrl = 'https://dauntless.fandom.com/wiki/Omnicells';

async function getUrls () {
  const url = document.location.href;
  const headlines = document.querySelectorAll('h2 span.mw-headline');
  return Array.from(headlines).map(x => `${url}#${x.id}`);
}

module.exports = {
  listUrl,
  getUrls
}
