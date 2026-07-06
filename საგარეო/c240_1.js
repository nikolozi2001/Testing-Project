function isEmpty(str) {
  return !str;
}

let concatFields = [];
for (let i = 0; i < data.partniorDataGrid.length; i++) {
  let partnior = data.partniorDataGrid[i]["partnior"];
  let pStart = parseInt(data.partniorDataGrid[i]["partniorDataGrid2"]);
  let iLast = parseInt(data.partniorDataGrid[i]["partniorDataGrid4"]);
  let iiLast = parseInt(data.partniorDataGrid[i]["partniorDataGrid6"]);
  let iiiLast = parseInt(data.partniorDataGrid[i]["partniorDataGrid5"]);
  let pEnd = parseInt(data.partniorDataGrid[i]["partniorDataGrid3"]);
  let country = data.partniorDataGrid[i]["page37"];

  let isCountryNotOne = isEmpty(country) || country !== 1;

  if (
    !isEmpty(partnior) &&
    isCountryNotOne &&
    (pStart >= 10 || pEnd >= 10 || iLast >= 10 || iiLast >= 10 || iiiLast >= 10)
  ) {
    concatFields.push(partnior);
  }
}

values = concatFields;
