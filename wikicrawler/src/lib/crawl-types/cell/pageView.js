async function extract () {
  const name = document.querySelector('h1').innerText;
  const url = document.location.href;
  
  const infobox = document.querySelector('table.infoboxtable');
  const infoMap = {};
  
  for (const infoRow of infobox.querySelectorAll('tr')) {
    const labelCell = infoRow.querySelector('td.infoboxlabel');
    const valueCell = infoRow.querySelector('td div.infoboxdetails');

    if (!labelCell) {
      continue;
    }

    const label = labelCell.innerText.toLowerCase().trim();

    if (valueCell) {
      infoMap[label] = valueCell.innerText.toLowerCase().trim();
    }
    else {
      infoMap[label] = true;
    }
  }

  const family = infoMap.family;
  const perk = name.toLowerCase();

  return {
    url,
    name,
    perk,
    family
  };
}

module.exports = { extract };