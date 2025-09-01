const valuta200 = data["page2TableSelect2"].value;
const pStart200 = data["page2TableNumber4"];
const pEnd200_0 = parseInt(data["page2TableText2"]);

let sum = 0;
let pEndSum = 0;
let isValid = true;

for (let i = 0; i < data.page13.length; i++) {
  const valuta200_3 = data.page13[i]["page14"].value;
  const pStart200_3 = parseInt(data.page13[i]["page15"]);
  const pEnd200_3 = parseInt(data.page13[i]["page18"]);

  if (pStart200_3) {
    sum += pStart200_3;
  }

  if (pEnd200_3) {
    pEndSum += pEnd200_3;
  }

  if (valuta200 !== valuta200_3) {
    isValid = false;
    break;
  }
}

let countrySet = [];
let country;
for (let i = 0; i < data.partniorDataGrid.length; i++) {
  country = data.partniorDataGrid[i]["page37"];
  countrySet.push(Number(country));
}

if (isValid) {
  if (!countrySet.includes(1)) {
    valid =
      sum === pStart200
        ? true
        : "სტრ.200_3-ის 'პერიოდის დასაწყისი'-ში მითითებული თანხების ჯამი ტოლი უნდა იყოს სტრ.200-ის 'პერიოდის დასაწყისი'-ში მითითებულ თანხაზე";
  } else {
    valid =
      sum <= pStart200
        ? true
        : "სტრ.200_3-ის 'პერიოდის დასაწყისი'-ში მითითებული თანხების ჯამი ნაკლები ან ტოლი უნდა იყოს სტრ.200-ის 'პერიოდის დასაწყისი'-ში მითითებულ თანხაზე";
  }
} else {
  valid = true;
}
