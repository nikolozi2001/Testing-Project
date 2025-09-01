function isEmpty(str) {
  return !str;
}

let concatFields = [];
for (let i = 0; i < data.partniorDataGrid.length; i++) {
  if (!isEmpty(data.partniorDataGrid[i]['partnior']) &&
      (isEmpty(data.partniorDataGrid[i]['page37']) || (!isEmpty(data.partniorDataGrid[i]['page37'])
          && data.partniorDataGrid[i]['page37'] !== 1))) {

      concatFields.push(data.partniorDataGrid[i]['partnior']);
  }
}

let uniqSelectFillMap = new Map();
for (let i = 0; i < data.page13.length; i++) {

  let dampudzvnebeli = data.page13[i]["page31"];
  if (!isEmpty(dampudzvnebeli)) {
      uniqSelectFillMap.set(dampudzvnebeli);
  }
}

let missingFounders = [];
for (let i = 0; i < concatFields.length; i++) {
  if (!uniqSelectFillMap.has(concatFields[i])) {
      missingFounders.push(concatFields[i])
  }
}

if (missingFounders.length > 0) {

  let validText = "";
  for (let i = 0; i < missingFounders.length; i++) {
      validText += missingFounders[i];
      if (i + 1 < missingFounders.length) {
          validText += ", ";
      }
  }

  valid = "გთხოვთ შეავსოთ მონაცემები 200_3 ში ყველა დამფუძნებელზე: " + validText;
}
