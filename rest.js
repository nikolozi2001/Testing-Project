let mtliani_fartobi = data["mtliani_fartobi"];
let natesis_fartobi;
let sum = 0;
let nakvetis_nomeri;
let nakvetis_tipi

let nakvetis_nomeri_obj = [];
let duplicates = new Set(); // To track duplicates
let uniqueRecords = new Set(); // To track unique records

for (let i = 0; i < data.dataGrid_natesisFartobi.length; i++) {
  natesis_fartobi = data.dataGrid_natesisFartobi[i]["page2DataGrid1_Natesistipi"];
  nakvetis_nomeri = data.dataGrid_natesisFartobi[i]["page2DataGrid1_Numbers"];
  nakvetis_tipi = data.dataGrid_natesisFartobi[i]["page2DataGrid1_NakvetisTipi"];

  if (natesis_fartobi) {
    sum += natesis_fartobi;
  }

  if (uniqueRecords.has(nakvetis_nomeri)) {
    duplicates.add(nakvetis_nomeri); // Add to duplicates if already present in uniqueRecords
  } else {
    uniqueRecords.add(nakvetis_nomeri); // Add to uniqueRecords if seen for the first time
  }

  nakvetis_nomeri_obj.push(nakvetis_nomeri);
}

console.log("nakvetis_nomeri_obj", nakvetis_nomeri_obj);

// Log duplicates if any exist
if (duplicates.size > 0) {
  console.log("Duplicate records found:", Array.from(duplicates));
} else {
  console.log("No duplicate records found");
}

console.log("nakvetis_tipi", nakvetis_tipi);


if (nakvetis_tipi === 5) {
  valid = true;
} else if (sum <= mtliani_fartobi) {
  valid = true;
} else {
  valid = "ნათესი ფართობი არ უნდა აღემატებოდეს მეურნეობის სარგებლობაში არსებულ მთლიან ფართობს";
}
