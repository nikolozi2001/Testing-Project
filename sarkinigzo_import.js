let parentRows = [];
let childRows = [];
let parentUniqKeyMap = new Map();
let childrenUniqKeyMap = new Map();
let parentMap = new Map();
let childrenMap = new Map();
let validIsSet = false;
let parentNumber = "2.4.1";
for (let i = 0; i < data.page3Sarkinigzo2.length; i++) {
  let country = data.page3Sarkinigzo2[i]["page102"].value;
  let number = data.page3Sarkinigzo2[i]["page3Sarkinigzo3"];
  let momsaxurebisSaxe = data.page3Sarkinigzo2[i]["page3Sarkinigzo2_saxe"];
  let valuta = data.page3Sarkinigzo2[i]["page103"].value;
  let tanxa = data.page3Sarkinigzo2[i]["page104"];

  let object = {
    number: number,
    momsaxurebisSaxe: momsaxurebisSaxe,
    country: country,
    valuta: valuta,
    tanxa: tanxa,
  };

  let uniqKey = number + "/" + country + "/" + valuta;

  if (number === parentNumber) {
    if (parentUniqKeyMap.has(uniqKey)) {
      valid =
        "რომელიმე მომსახურება კონკრეტული ქვეყნიდან და კონკრეტულ ვალუტაში, მხოლოდ ერთხელ უნდა შეივსოს მთლიანი თანხის მითითებით !";
      validIsSet = true;
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

let childrenAmountSumMap = new Map();
for (let i = 0; i < childRows.length; i++) {
  let childrenNumber = childRows[i]["number"];
  let parentUnitKey =
    parentNumber + "/" + childRows[i]["country"] + "/" + childRows[i]["valuta"];
  let tanxa = parseInt(childRows[i]["tanxa"]);

  if (!childrenNumber) {
    continue;
  }

  if (!parentMap.has(parentNumber)) {
    valid =
      "შესავსებია სტრიქონი " + parentNumber + " - მგზავრთა საერთაშორისო გადაყვანა.";
    validIsSet = true;
    break;
  }

  if (!parentUniqKeyMap.has(parentUnitKey)) {
    valid =
      "სტრიქონებში 2.4.2; 2.4.3 მითითებული ქვეყანა და ვალუტა უნდა იყოს სტრიქონში 2.4.1";
    validIsSet = true;
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

for (let [key, value] of childrenAmountSumMap) {
  if (value > parentUniqKeyMap.get(key)["tanxa"]) {
    valid =
      "სტრიქონებში 2.4.2; 2.4.3 მითითებული თანხა არ უნდა აღემატებოდეს მგზავრთა საერთაშორისო გადაყვანა (სტრიქონი 2.4.1).";
  }
}
