let uniquecodes = new Set();
let warningText = "საიდენტიფიკაციო კოდი დუბლირებულია";

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

for (let i = 0; i < data.ararezidentPartniorDatagrid.length; i++) {
  const code = normalizeText(data.ararezidentPartniorDatagrid[i]["page42"]);

  if (uniquecodes.has(code)) {
    valid = warningText;
    break;
  } else {
    uniquecodes.add(code);
  }
}

let uniqueNames = new Set();

for (let i = 0; i < data.ararezidentPartniorDatagrid.length; i++) {
  const code = normalizeText(data.ararezidentPartniorDatagrid[i]["page42"]);

  if (uniqueNames.has(code)) {
    valid = warningText;
    break;
  } else {
    uniqueNames.add(code);
  }
}

for (let i = 0; i < data.partniorDataGrid.length; i++) {
  const pName = normalizeText(data.partniorDataGrid[i]["page34"]);

  if (uniqueNames.has(pName)) {
    valid = warningText;
    break;
  } else {
    uniqueNames.add(pName);
  }
}
