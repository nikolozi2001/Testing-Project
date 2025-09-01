let valuta200_3;
const valuta200 = data["page2TableSelect2"].value;
let pStart200_3;
const pStart200 = data["page2TableNumber4"];
let pEnd200_3;
const pEnd200 = parseInt(data["page2TableText2"]);

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

if (valuta200 === valuta200_3) {
  valid =
    sum === pStart200
      ? true
      : "სტრ. 200_3-ის 'პერიოდის დასაწყისი'-ში მითითებული  თანხების  ჯამი სტრ 200-ის 'პერიოდის დასაწყისი'-ში მითითებული თანხის ტოლი უნდა იყოს";
}

if (valuta200 && valuta200_3) {
  if (valuta200 !== valuta200_3) {
    alert(
      "სტრ. 200 და სტრ. 200_3 შევსებულია სხვადასხვა ვალუტაში, გთხოვთ გადაამოწმოთ"
    );
  }
}

if (valuta200 === valuta200_3) {
  valid =
    pEndSum === pEnd200
      ? true
      : "სტრ. 200_3-ის 'პერიოდის ბოლოს'-ში მითითებული  თანხების  ჯამი სტრ 200-ის 'პერიოდის ბოლოს'-ში მითითებული თანხის ტოლი უნდა იყოს.";
}
