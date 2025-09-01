function isEmpty(str) {
  return !str;
}

let sum = 0;
let periodEndSum_q1 = 0;
let periodEndSum_q2 = 0;
let periodEndSum_q3 = 0;
let periodEndSum_q4 = 0;
let lastProfitSum = 0;
let lastProfitSumLength = 0;
let dividedVal = 0;
let preDollar = 0;

const enterpriseSurveyId = window.location.href.split("/").pop();
const url = `/api/enterprise/foreign-economic-activity-quarter-data?enterpriseSurveyId=${enterpriseSurveyId}`;

const currencies = sessionStorage.getItem("currencies");
if (currencies) {
  window.currencies = JSON.parse(currencies);
} else {
  console.error("Currencies data is missing from sessionStorage.");
}

const fetchedData = [];
const periodEndSums = [];
let mainVal = [];

fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: localStorage.getItem("accessToken"),
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch quarter data");
    }
  })
  .then((data) => {
    let profitSum = 0;

    Object.entries(data).forEach(([key, item]) => {
      const preValue = `${key}-` + item.currency.id;
      rate = window.currencies[preValue];

      const profit = parseFloat(item.profit.toFixed(2));

      profitSum += profit;
      fetchedData.push({
        quarter: key,
        profit: item.profit,
        currencyId: item.currency.id,
        profitSum: profitSum,
        rate: rate,
      });
    });

    lastProfitSum = fetchedData[fetchedData.length - 1].profitSum;

    lastProfitSumLength = fetchedData.length;

    calculateSubVal();
  })
  .catch((error) => {
    console.error(error.message);
  });

data.partniorDataGrid.forEach((item) => {
  const pEnd_q1 = parseFloat(item["partniorDataGrid4"]);
  const pEnd_q2 = parseFloat(item["partniorDataGrid6"]);
  const pEnd_q3 = parseFloat(item["partniorDataGrid5"]);
  const pEnd_q4 = parseFloat(item["partniorDataGrid3"]);
  const country = item["page37"];

  if (
    !isEmpty(pEnd_q1) &&
    pEnd_q1 >= 10 &&
    (isEmpty(country) || country !== 1)
  ) {
    periodEndSum_q1 += pEnd_q1;
  }
  if (
    !isEmpty(pEnd_q2) &&
    pEnd_q2 >= 10 &&
    (isEmpty(country) || country !== 1)
  ) {
    periodEndSum_q2 += pEnd_q2;
  }
  if (
    !isEmpty(pEnd_q3) &&
    pEnd_q3 >= 10 &&
    (isEmpty(country) || country !== 1)
  ) {
    periodEndSum_q3 += pEnd_q3;
  }
  if (
    !isEmpty(pEnd_q4) &&
    pEnd_q4 >= 10 &&
    (isEmpty(country) || country !== 1)
  ) {
    periodEndSum_q4 += pEnd_q4;
  }
});

periodEndSums.push({
  1: periodEndSum_q1,
  2: periodEndSum_q2,
  3: periodEndSum_q3,
  4: periodEndSum_q4,
});

const p215 = parseFloat(data["page2Table5Number"]);
const p215val = data["page2Table5Select"].value;

function calculateSubVal() {
  const p215 = parseFloat(data["page2Table5Number"]);

  const subVal = p215 - lastProfitSum;

  dividedVal = subVal / lastProfitSumLength;

  const periodEndSumsObj = periodEndSums[0];

  fetchedData.forEach((obj) => {
    const quarter = obj.quarter;
    const share = periodEndSumsObj[quarter];

    obj.dividedVal = dividedVal.toFixed(2);
    obj.dividedValAddProfit = (obj.profit + dividedVal).toFixed(2);
    obj.preDollar = (obj.rate * obj.dividedValAddProfit).toFixed(2);
    obj.share = share;
    obj.sum = (obj.preDollar * (share / 100)).toFixed(2);
    mainVal.push({
      quarter: obj.quarter,
      preValue: obj.sum,
    });
  });
}

const mainQuarter = 4;

setTimeout(() => {
  mainVal.forEach((item) => {
    if (item.quarter == mainQuarter) {
      sum += parseFloat(item.preValue);
    }
  });

  localStorage.setItem("q4_215", sum);
}, 2000);

const preSum = localStorage.getItem("q4_215");

value = preSum === 0 ? "" : preSum;
