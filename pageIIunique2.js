const pStart200 = data["page2TableNumber4"];
const pEnd200 = parseInt(data["page2TableText2"]);
const periodi240 = data["page2Table6"];

let country;
let periodi240_1;
let pStartArarezidenti;
let pEndArarezidenti;

for (let i = 0; i < data.partniorDataGrid.length; i++) {
  country = data.partniorDataGrid[i]["page37"];
  pStartArarezidenti = data.partniorDataGrid[i]["partniorDataGrid2"];
  pEndArarezidenti = data.partniorDataGrid[i]["partniorDataGrid3"];
}

for (let i = 0; i < data.page52.length; i++) {
  periodi240_1 = data.page52[i]["page55-240_1"];
}

if (
  periodi240 &&
  country !== 1 &&
  (pStartArarezidenti || pEndArarezidenti) > 10
) {
  valid =
    "გთხოვთ შეავსოთ მონაცემები სტრ.240_1-ში ყველა არარეზიდენტ დამფუძნებელზე.";
  if (periodi240_1) {
    valid = true;
  }
}


// ---------------------------------------------------------------------


let pStart;
let pEnd;

for (let i = 0; i < data.partniorDataGrid.length; i++) {
  country = data.partniorDataGrid[i]["page37"];
  pStart = data.partniorDataGrid[i]["partniorDataGrid2"];
  pEnd = data.partniorDataGrid[i]["partniorDataGrid3"];
}

for (let i = 0; i < data.page52.length; i++) {
  periodi240_1 = data.page52[i]["page55-240_1"];
}


if (periodi240 && country !== 1 && (pStart || pEnd) >= 10) {
  valid =
    "შევსებულია ფაქტობრივად გაცემული დივიდენდები (სტრ. 240), ამიტომ შესავსებია არარეზიდენტისთვის გაცემული დივიდენდებიც (სტრ. 240_1)";
  if (periodi240_1) {
    valid = true;
  }
}
