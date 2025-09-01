let parentRows = [];
let childRows = [];
let parentUniqKeyMap = new Map();
let childrenUniqKeyMap = new Map();
let parentMap = new Map();
let childrenMap = new Map();
let validIsSet = false;

function isEmpty(v) {
  return v === undefined || v === null || v === "";
}

for (let i = 0; i < data.page3Saavtomobilo2.length; i++) {
  let country = data.page3Saavtomobilo2[i]["page3_saavtomobilo_qveyana"].value;
  let number = data.page3Saavtomobilo2[i]["page3Saavtomobilo3"];
  let momsaxurebisSaxe = data.page3Saavtomobilo2[i]["page3Saavtomobilo2_saxe"];
  let valuta = data.page3Saavtomobilo2[i]["page3_saavtomobilo_valuta"].value;
  let tanxa = data.page3Saavtomobilo2[i]["page3_saavtomobilo_tanxa"];

  // If user started filling (has number and momsaxurebisSaxe) then require all fields
  const started = !isEmpty(number) && !isEmpty(momsaxurebisSaxe);
  if (started) {
    if (
      isEmpty(country) ||
      isEmpty(number) ||
      isEmpty(momsaxurebisSaxe) ||
      isEmpty(valuta) ||
      isEmpty(tanxa)
    ) {
      valid = `ყველა ველი უნდა იყოს შევსებული (სტრიქონი ${i + 1}).`;
      validIsSet = true;
      console.error("Missing required fields in row", i + 1, {
        country,
        number,
        momsaxurebisSaxe,
        valuta,
        tanxa,
      });
      break;
    }
  }

  let object = {
    number: number,
    momsaxurebisSaxe: momsaxurebisSaxe,
    country: country,
    valuta: valuta,
    tanxa: tanxa,
  };

  let uniqKey = number + "/" + country + "/" + valuta;

  if (number.length === 5) {
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
  let parentNumber = childrenNumber.substring(0, childrenNumber.length - 2);
  let parentUnitKey =
    parentNumber + "/" + childRows[i]["country"] + "/" + childRows[i]["valuta"];
  let tanxa = parseInt(childRows[i]["tanxa"]);

  if (!childrenNumber) {
    continue;
  }

  if (!parentMap.has(parentNumber)) {
    valid = "შესავსებია სტრიქონი " + parentNumber + " - ტვირთების გადაზიდვა.";
    validIsSet = true;
    break;
  }

  if (!parentUniqKeyMap.has(parentUnitKey)) {
    valid =
      "სტრიქონებში 2.3.2.1; 2.3.2.2; 2.3.2.3; 2.3.2.4 მითითებული ქვეყანა და ვალუტა უნდა იყოს სტრიქონში 2.3.2";
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
      "სტრიქონებში 2.3.2.1; 2.3.2.2; 2.3.2.3; 2.3.2.4 მითითებული თანხა არ უნდა აღემატებოდეს ტვირთების გადაზიდვას (სტრიქონი 2.3.2).";
  }
}
