let autoRow;
let valuta;
let tanxa;
let sum = 0;
let valutaFor2_3_2;
let currency;
let qveyanaFor2_3_2;
let country;

for (let i = 0; i < data.page2Saavtomobilo.length; i++) {
  currency = data.page2Saavtomobilo[i]["saavtomobilo_valuta"].value;
  money = data.page2Saavtomobilo[i]["saavtomobilo_tanxa"];
  number = data.page2Saavtomobilo[i]["page2Saavtomobilo2"];
  country = data.page2Saavtomobilo[i]["saavtomobilo_qveyana"].value;

  if (
    number.includes("2.3.2.1") ||
    number.includes("2.3.2.2") ||
    number.includes("2.3.2.3") ||
    number.includes("2.3.2.4")
  ) {
    if (money) {
      sum += money;
    }
  }
}

for (let i = 0; i < data.page2Saavtomobilo.length; i++) {
  autoRow = data.page2Saavtomobilo[i]["page2Saavtomobilo2"];
  valuta = data.page2Saavtomobilo[i]["saavtomobilo_valuta"].value;
  qveyana = data.page2Saavtomobilo[i]["saavtomobilo_qveyana"].value;
  tanxa = data.page2Saavtomobilo[i]["saavtomobilo_tanxa"];

  if (autoRow.includes("2.3.2.1")) {
    valid = "შესავსებია სტრიქონი 2.3.2 - ტვირთების გადაზიდვა.";
    break;
  } else if (
    autoRow === "2.3.2.2" ||
    autoRow === "2.3.2.3" ||
    autoRow === "2.3.2.4"
  ) {
    valid = "შესავსებია სტრიქონი 2.3.2 - ტვირთების გადაზიდვა.";
    break;
  } else if (autoRow.includes("2.3.2")) {
    valid = true;
    valutaFor2_3_2 = valuta;
    qveyanaFor2_3_2 = qveyana;
    break;
  }
}

if (valutaFor2_3_2 === currency && qveyanaFor2_3_2 === country) {
  console.log("sum: ", sum);
  valid = true;
} else {
  valid = "შეამოწმეთ ვალუტა და ქვეყანა";
}

if (tanxa >= sum) {
  if (number.includes("2.3.2")) {
    valid = true;

    if (qveyanaFor2_3_2 === country && currency == valutaFor2_3_2) {
      valid = true;
    } else {
      valid = "შეამოწმეთ ქვეყანა და ვალუტა";
    }
  }
  console.log("qveyanaFor2_3_2: ", qveyanaFor2_3_2);
  console.log("country: ", country);
  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  console.log("currency: ", currency);
  console.log("valutaFor2_3_2: ", valutaFor2_3_2);
} else {
  valid =
    "სტრიქონებში 2.3.2.1;  2.3.2.2;  2.3.2.3;  2.3.2.4 მითითებული თანხა არ უნდა აღემატებოდეს ტვირთების გადაზიდვას (სტრიქონი 2.3.2)";
}
