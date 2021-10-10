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

  const behemoth = infoMap.behemoth === 'none' ? null : infoMap.behemoth;
  const element = infoMap.element;
  const perk = infoMap.perk === 'none' ? null : infoMap.perk;
  const type = infoMap['armour type'];
  const slots = infoMap['cell slot'] === 'none'
    ? []
    : [infoMap['cell slot'].toLowerCase()];
  const bond = (infoMap.perk === 'bond');
  const uniqueEffect = !!infoMap['unique effect'];

  const detailTable = document.querySelector('table.wikitable');
  const detailHeaders = Array.from(detailTable.querySelectorAll('tr th'))
    .map(
      (header, index) => {
        const name = header.innerText.toLowerCase().trim();
        return { name, index, merged: false };
      },
    );

  const detailMap = {};
  const mergedDetails = {};
  for (const detailRow of detailTable.querySelectorAll('tr')) {
    const cells = detailRow.querySelectorAll('td');

    if (!cells.length) {
      continue;
    }

    const rawData = {};

    let mergedColumnCount = 0;
    for (const header of detailHeaders) {
      const {name, index, merged} = header;

      if (merged) {
        rawData[name] = mergedDetails[name];
        mergedColumnCount++;
        continue;
      }

      const cellIndex = index - mergedColumnCount;
      rawData[name] = cells[cellIndex].innerText.toLowerCase().trim();
      if (cells[cellIndex].rowSpan > 1) {
        header.merged = true;
        mergedDetails[name] = rawData[name];
      }
    }

    const perks = {};
    if (perk) {
      // parse perks
      for (const perkDetail of rawData.perk.split('\\n')) {
        const words = perkDetail.trim().split(/\s+/);
  
        if (words.length === 1) {
          perks[words[0]] = 1;
        }
        else {
          perks[words[1]] = +words[0];
        }
      }
    }
    
    const elementalPower = {};
    if (element !== 'neutral') {
      // parse elemental power
      for (const elemDetail of rawData['elemental power'].split('\n')) {
        const tokens = elemDetail.match(/([+-]\d+)\s+vs\s+(\w+)/);
        const element = tokens[2];
        const power = +tokens[1];
        elementalPower[element] = power;
      }
    }

    const result = {
      power: +(rawData.power || rawData.resistance),
      perk: perks,
      elementalPower
    };

    const label = rawData.level === 'power surge'
      ? 'surge'
      : 'base';

    detailMap[label] = result;
  }

  return {
    url,
    name,
    behemoth,
    element,
    type,
    slots,
    bond,
    uniqueEffect,
    details: detailMap
  };
}

module.exports = { extract };