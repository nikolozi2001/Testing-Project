let parentRows = [];
let childRows = [];
let parentUniqKeyMap = new Map();
let childrenUniqKeyMap = new Map();
let parentMap = new Map();
let childrenMap = new Map();
let validIsSet = false;

for (let i = 0; i < data.page2msheneblobaSazgvargaret.length; i++) {
  let country =
    data.page2msheneblobaSazgvargaret[i]["mshenebloba_qveyana"].value;
  let number =
    data.page2msheneblobaSazgvargaret[i]["page2MsheneblobaSazgvargaret"];
  let momsaxurebisSaxe =
    data.page2msheneblobaSazgvargaret[i]["mshenebloba_mSaxe"];
  let valuta = data.page2msheneblobaSazgvargaret[i]["mshenebloba_valuta"].value;
  let tanxa = data.page2msheneblobaSazgvargaret[i]["mshenebloba_tanxa"];

  let object = {
    number: number,
    momsaxurebisSaxe: momsaxurebisSaxe,
    country: country,
    valuta: valuta,
    tanxa: tanxa,
  };

  let uniqKey = number + "/" + country + "/" + valuta;

  console.log("Processing row:", i + 1);
  console.log("Object:", object);
  console.log("Unique key:", uniqKey);

  if (number.length === 3) {
    if (parentUniqKeyMap.has(uniqKey)) {
      valid =
        "რომელიმე მომსახურება კონკრეტული ქვეყნიდან და კონკრეტულ ვალუტაში, მხოლოდ ერთხელ უნდა შეივსოს მთლიანი თანხის მითითებით !";
      validIsSet = true;
      console.log("Validation error:", valid);
      break;
    } else {
      parentUniqKeyMap.set(uniqKey, object);
    }

    parentRows.push(object);

    if (parentMap.has(number)) {
      let values = parentMap.get(number);
      values.push(object);
      parentMap.set(number, values);
    } else {
      let values = [];
      values.push(object);
      parentMap.set(number, values);
    }
  } else {
    if (childrenUniqKeyMap.has(uniqKey)) {
      valid =
        "რომელიმე მომსახურება კონკრეტული ქვეყნიდან და კონკრეტულ ვალუტაში, მხოლოდ ერთხელ უნდა შეივსოს მთლიანი თანხის მითითებით !";
      validIsSet = true;
      console.log("Validation error:", valid);
      break;
    } else {
      childrenUniqKeyMap.set(uniqKey, object);
    }

    childRows.push(object);

    if (childrenMap.has(number)) {
      let values = childrenMap.get(number);
      values.push(object);
      childrenMap.set(number, values);
    } else {
      let values = [];
      values.push(object);
      childrenMap.set(number, values);
    }
  }
}

console.log("Parent Rows:", parentRows);
console.log("Child Rows:", childRows);
console.log("Parent Unique Key Map:", parentUniqKeyMap);
console.log("Children Unique Key Map:", childrenUniqKeyMap);
console.log("Parent Map:", parentMap);
console.log("Children Map:", childrenMap);

let childrenAmountSumMap = new Map();
for (let i = 0; i < childRows.length; i++) {
  let childrenNumber = childRows[i]["number"];
  let parentNumber = childrenNumber.substring(0, childrenNumber.length - 2);
  let parentUnitKey =
    parentNumber + "/" + childRows[i]["country"] + "/" + childRows[i]["valuta"];
  let tanxa = parseInt(childRows[i]["tanxa"]);

  if (!childrenNumber) {
    continue;
  }

  console.log("Processing child row:", i + 1);
  console.log("Children number:", childrenNumber);
  console.log("Parent number:", parentNumber);
  console.log("Parent unit key:", parentUnitKey);
  console.log("Tanxa:", tanxa);

  if (!parentMap.has(parentNumber)) {
    valid =
      "შესავსებია სტრიქონი " + parentNumber + " - მშენებლობა საზღვარგარეთ.";
    validIsSet = true;
    console.log("Validation error:", valid);
    break;
  }

  if (!parentUniqKeyMap.has(parentUnitKey)) {
    valid =
      "სტრიქონებში 4.1; 4.2 მითითებული ქვეყანა და ვალუტა უნდა იყოს სტრიქონში 4.0";
    validIsSet = true;
    console.log("Validation error:", valid);
    break;
  }

  if (childrenAmountSumMap.has(parentUnitKey)) {
    let sum = childrenAmountSumMap.get(parentUnitKey);
    sum += tanxa;
    childrenAmountSumMap.set(parentUnitKey, sum);
  } else {
    childrenAmountSumMap.set(parentUnitKey, tanxa);
  }
}

console.log("Children Amount Sum Map:", childrenAmountSumMap);

for (let [key, value] of childrenAmountSumMap) {
  if (value > parentUniqKeyMap.get(key)["tanxa"]) {
    valid =
      "სტრიქონებში 4.1; 4.2 მითითებული თანხა არ უნდა აღემატებოდეს ტვირთების გადაზიდვას (სტრიქონი 4.0).";
    console.log("Validation error:", valid);
  }
}

console.log("Validation complete. Valid is set:", validIsSet);
