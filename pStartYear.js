const valuta200 = data["page2TableSelect2"].value;
let valuta200_3;
let pStart200_3;
const pStart200 = data["page2TableNumber4"];
let pEnd200_3;
const pEnd200_0 = parseInt(data["page2TableText2"]);

let sum = 0;
let pEndSum = 0;

for (let i = 0; i < data.page13.length; i++) {
  valuta200_3 = data.page13[i]["page14"].value;
  pStart200_3 = parseInt(data.page13[i]["page15"]);
  pEnd200_3 = parseInt(data.page13[i]["page18"]);

  if (pStart200_3) {
    sum += pStart200_3;
  }

  if (pEnd200_3) {
    pEndSum += pEnd200_3;
  }
}

let country;

for (let i = 0; i < data.partniorDataGrid.length; i++) {
  country = data.partniorDataGrid[i]["page37"];
}

if (country !== 1) {
  if (valuta200 === valuta200_3) {
    valid =
      sum === pStart200
        ? true
        : "სტრ.200_3-ის 'პერიოდის დასაწყისი'-ში მითითებული თანხების ჯამი ტოლი უნდა იყოს სტრ.200_0-ის 'პერიოდის დასაწყისი'-ში მითითებულ თანხაზე";
  }
} else {
  if (valuta200 === valuta200_3) {
    valid =
      sum <= pStart200
        ? true
        : "სტრ.200_3-ის 'პერიოდის დასაწყისი'-ში მითითებული თანხების ჯამი ნაკლები ან ტოლი უნდა იყოს სტრ.200_0-ის 'პერიოდის დასაწყისი'-ში მითითებულ თანხაზე";
  }
}
