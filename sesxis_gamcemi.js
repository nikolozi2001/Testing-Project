function isEmpty(str) {
  return !str;
}

let concatFields = [];

if (data.partniorDataGrid) {
  for (let i = 0; i < data.partniorDataGrid.length; i++) {
    const partnior = data.partniorDataGrid[i]["partnior"];
    const pStart = parseInt(data.partniorDataGrid[i]["partniorDataGrid2"]);
    const pEnd = parseInt(data.partniorDataGrid[i]["partniorDataGrid3"]);
    const country = data.partniorDataGrid[i]["page37"];

    const isCountryNotOne = isEmpty(country) || country !== 1;

    if (
      !isEmpty(partnior) &&
      ((pStart >= 10 && isCountryNotOne) || (pEnd >= 10 && isCountryNotOne))
    ) {
      concatFields.push(partnior);
    }
  }
}

if (data.ararezidentPartniorDatagrid) {
  for (let i = 0; i < data.ararezidentPartniorDatagrid.length; i++) {
    if (!isEmpty(data.ararezidentPartniorDatagrid[i]["ararezidentPartnior"])) {
      concatFields.push(
        data.ararezidentPartniorDatagrid[i]["ararezidentPartnior"]
      );
    }
  }
}

values = concatFields;
