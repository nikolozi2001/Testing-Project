function isEmpty(str) {
  return !str;
}

let numberSet = [];

for (let i = 0; i < data.partniorDataGrid.length; i++) {
  let partnior = data.partniorDataGrid[i]["partnior"];
  if (partnior && !isEmpty(partnior)) {
    let countryId = data.partniorDataGrid[i]["page37"];
    if (countryId && countryId !== 1) {
      numberSet.push(partnior.toString());
    }
  }
}

for (let n = 0; n < data.ararezidentPartniorDatagrid.length; n++) {
  let ararezidentPartnior =
    data.ararezidentPartniorDatagrid[n]["ararezidentPartnior"];
  if (ararezidentPartnior && !isEmpty(ararezidentPartnior)) {
    numberSet.push(ararezidentPartnior.toString());
  }
}

console.log(numberSet, "numberSet");

for (let j = 0; j < data.page41210.length; j++) {
  if (
    data.page41210[j]["page41211"] &&
    !isEmpty(data.page41210[j]["page41211"]) &&
    !numberSet.includes(data.page41210[j]["page41211"].toString())
  ) {
    data.page41210[j]["page41211"] = "";
  }
}
