let alertNumber;

let pStart = parseInt(row["page15"]);
let wminda = parseInt(row["page16"]);
let girebulebiti = parseInt(row["page38"]);
let sxva = parseInt(row["page17"]);
let pEnd = parseInt(row["page18"]);

let sumAlert = 0;

if (pStart) {
  sumAlert += pStart;
}

if (wminda) {
  sumAlert += wminda;
}

if (girebulebiti) {
  sumAlert += girebulebiti;
}

if (sxva) {
  sumAlert += sxva;
}

alertNumber = pEnd - sumAlert;

valid = sumAlert === pEnd ? true : "სხვაობა " + alertNumber;

if (valid === true) {
  const valuta200 = data["page2TableSelect2"].value;
  const pStart200 = data["page2TableNumber4"];
  const pEnd200 = parseInt(data["page2TableText2"]);

  let sum = 0;
  let pEndSum = 0;
  let isValid = true;

  for (let i = 0; i < data.page13.length; i++) {
    const valuta200_3 = data.page13[i]["page14"].value;
    const pStart200_3 = parseInt(data.page13[i]["page15"]);
    const pEnd200_3 = parseInt(data.page13[i]["page18"]);

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
        pEndSum === pEnd200
          ? true
          : "სტრ. 200_3-ის 'პერიოდის ბოლოს'-ში მითითებული თანხების ჯამი სტრ 200-ის 'პერიოდის ბოლოს'-ში მითითებული თანხის ტოლი უნდა იყოს. სხვაობა " +
            alertNumber;
    } else {
      valid =
        pEndSum <= pEnd200
          ? true
          : "(1) სტრ. 200_3-ის 'პერიოდის ბოლოს'-ში მითითებული თანხების ჯამი სტრ 200-ის 'პერიოდის ბოლოს'-ში მითითებული თანხის ნაკლები ან ტოლი უნდა იყოს. (2) სხვაობა " +
            alertNumber;
    }
  } else {
    valid = true;
  }
}
