function isEmpty(str) {
  return !str;
}

let sum = 0;
let periodEndSum = 0;

if (!window.currencies) {
  $.ajax({
    url: "/api/lib/trade-currency-map",
    type: "GET",
    dataType: "json",
    async: false,
    success: function (response) {
      console.log(response);
      window.currencies = response;
    },
  });
}

for (let i = 0; i < data.partniorDataGrid.length; i++) {
  const pEnd = parseInt(data.partniorDataGrid[i]["partniorDataGrid3"]);
  const country = data.partniorDataGrid[i]["page37"];
  console.log(pEnd, "pEnd");
  if (
    !isEmpty(pEnd) &&
    !isEmpty(pEnd >= 10) &&
    (isEmpty(country) || (!isEmpty(country) && country.value !== 1))
  ) {
    console.log(pEnd, "pEnd inside");
    periodEndSum += pEnd;
  }
}

for (let i = 0; i < data.page13.length; i++) {
    const pageII200_3 = data.page13[i];
  if (pageII200_3["page16"]) {
    if (pageII200_3["page14"] && pageII200_3["page14"].value && periodEndSum > 0) {
      sum +=
        window.currencies[pageII200_3["page14"].value] *
        ((pageII200_3["page16"] * periodEndSum) / 100);
    } else {
      sum += pageII200_3["page16"] * 0;
    }
  }
}

value = sum === 0 ? "" : sum.toFixed(4);
