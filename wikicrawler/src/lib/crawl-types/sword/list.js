const listUrl = 'https://dauntless.fandom.com/wiki/Sword';

async function getUrls () {
  const urls = [];
  const weaponTables = document.querySelectorAll('table.wikitable.sortable');

  for (const table of weaponTables) {
    const headerLabels = Array.from(table.querySelectorAll('th')).map(x => x.innerText);
    const nameIndex = headerLabels.findIndex(header => header.toLowerCase() == 'name');
    const [, ...dataRows] = table.querySelectorAll('tr');

    for (const row of dataRows) {
      const nameCell = row.querySelectorAll('td')[nameIndex];
      urls.push(nameCell.querySelector('a').href);
    }
  }
  
  return urls;
}

module.exports = {
  listUrl,
  getUrls
}
