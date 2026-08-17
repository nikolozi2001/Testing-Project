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

for (let i = 0; i < data.page3sat_komp_sai_moms2.length; i++) {
  let country = data.page3sat_komp_sai_moms2[i]["page142"].value;
  let number = data.page3sat_komp_sai_moms2[i]["page3SatKompSaiMoms2"];
  let momsaxurebisSaxe =
    data.page3sat_komp_sai_moms2[i]["page3sat_komp_sai_moms2_saxe"];
  let valuta = data.page3sat_komp_sai_moms2[i]["page143"].value;
  let tanxa = data.page3sat_komp_sai_moms2[i]["page144"];

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
  }
}
