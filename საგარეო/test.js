function isEmpty(str) {
  return !str;
}

const concatFields = [];
for (let i = 0; i < data.partniorDataGrid.length; i++) {
  const partnior = data.partniorDataGrid[i]["partnior"];
  const pStart = parseInt(data.partniorDataGrid[i]["partniorDataGrid2"]);
  let iLast = parseInt(data.partniorDataGrid[i]["partniorDataGrid4"]);
  let iiLast = parseInt(data.partniorDataGrid[i]["partniorDataGrid6"]);
  let iiiLast = parseInt(data.partniorDataGrid[i]["partniorDataGrid5"]);
  const pEnd = parseInt(data.partniorDataGrid[i]["partniorDataGrid3"]);
  const country = data.partniorDataGrid[i]["page37"];

  const isCountryNotOne = isEmpty(country) || country !== 1;

  if (
    !isEmpty(partnior) &&
    isCountryNotOne &&
    (pStart >= 10 || pEnd >= 10 || iLast >= 10 || iiLast >= 10 || iiiLast >= 10)
  ) {
    concatFields.push(partnior);
  }
}

for (let i = 0; i < data.ararezidentPartniorDatagrid.length; i++) {
  if (!isEmpty(data.ararezidentPartniorDatagrid[i]["ararezidentPartnior"])) {
    concatFields.push(
      data.ararezidentPartniorDatagrid[i]["ararezidentPartnior"],
    );
  }
}

values = concatFields;
