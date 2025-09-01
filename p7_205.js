let max = 2;

for (let i = 0; i < data.page6DataGrid.length; i++) {
  let nomeri = data.page6DataGrid[i]["page6DataGridN"];

  if (nomeri && typeof nomeri === "string") {
    let numericPart = nomeri.replace(/\D/g, "");

    if (!isNaN(numericPart) && numericPart !== "") {
      let parsedNomeri = parseInt(numericPart, 10);

      if (parsedNomeri > max) {
        max = parsedNomeri;
      }
    }
  }
}

let calculatedValue = max + 1;
let text = "ა ";
let text2 = ")";
value = text + calculatedValue + text2;
