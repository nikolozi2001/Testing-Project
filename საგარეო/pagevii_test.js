function isEmpty(value) {
  return value === null || value === undefined || value === "";
}

// =======================================================
// შეცვალე მხოლოდ ეს
// =======================================================
const mainQuarter = 1;
// =======================================================

console.log("==========================================================");
console.log("🚀 START CALCULATION");
console.log("==========================================================");

const enterpriseSurveyId = window.location.pathname.split("/").pop();

console.log("🌍 URL:", window.location.href);
console.log("🆔 enterpriseSurveyId:", enterpriseSurveyId);

const currencyUrl = `/api/lib/enterprise-survey-year-currency-map?enterpriseSurveyId=${enterpriseSurveyId}`;

const quarterUrl = `/api/enterprise/foreign-economic-activity-quarter-data?enterpriseSurveyId=${enterpriseSurveyId}`;

console.log("💱 Currency URL:", currencyUrl);
console.log("📊 Quarter URL:", quarterUrl);

const p215 = Number(data.page2Table5Number) || 0;

console.log("💰 p215:", p215);

const periodEndSums = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};

console.log("------------------------------------------------");
console.log("📋 Partner DataGrid");
console.log("------------------------------------------------");

(data.partniorDataGrid || []).forEach((item, index) => {
  console.log("Row:", index + 1);
  console.log(item);

  const country = item.page37;

  const q1 = Number(item.partniorDataGrid4) || 0;
  const q2 = Number(item.partniorDataGrid6) || 0;
  const q3 = Number(item.partniorDataGrid5) || 0;
  const q4 = Number(item.partniorDataGrid3) || 0;

  console.log("Country:", country);
  console.log("Q1 Share:", q1);
  console.log("Q2 Share:", q2);
  console.log("Q3 Share:", q3);
  console.log("Q4 Share:", q4);

  if (isEmpty(country) || country != 1) {
    if (q1 >= 10) periodEndSums[1] += q1;
    if (q2 >= 10) periodEndSums[2] += q2;
    if (q3 >= 10) periodEndSums[3] += q3;
    if (q4 >= 10) periodEndSums[4] += q4;
  }
});

console.log("================================================");
console.log("📊 periodEndSums");
console.log(periodEndSums);
console.log("================================================");

Promise.all([
  fetch(currencyUrl, {
    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).then((r) => r.json()),

  fetch(quarterUrl, {
    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).then((r) => r.json()),
])
  .then(([currencies, quarterData]) => {
    console.log("================================================");
    console.log("💱 CURRENCIES");
    console.log(currencies);

    console.log("================================================");
    console.log("📥 QUARTER DATA");
    console.log(quarterData);

    console.log("quarterData is Array:", Array.isArray(quarterData));

    console.log("Object Keys:", Object.keys(quarterData));

    console.log("QuarterData[0]:", quarterData[0]);
    console.log("QuarterData[1]:", quarterData[1]);
    console.log("QuarterData[2]:", quarterData[2]);
    console.log("QuarterData[3]:", quarterData[3]);
    console.log("QuarterData[4]:", quarterData[4]);

    console.log("Quarter 1:", quarterData[1]);
    console.log("Quarter 2:", quarterData[2]);
    console.log("Quarter 3:", quarterData[3]);
    console.log("Quarter 4:", quarterData[4]);

    let totalProfit = 0;

    const profits = {};
    const rates = {};

    [1, 2, 3, 4].forEach((q) => {
      console.log("--------------------------------------------");
      console.log("Processing Quarter:", q);

      const item = quarterData[q];

      console.log("API Item:", item);

      if (item) {
        profits[q] = Number(item.profit) || 0;

        const currencyId = item.currency?.id;

        console.log("Currency Id:", currencyId);

        const key = q + "-" + currencyId;

        console.log("Currency Key:", key);

        rates[q] = Number(currencies[key]) || 1;

        console.log("Rate:", rates[q]);
      } else {
        console.warn("⚠️ Quarter not returned from API:", q);

        profits[q] = 0;
        rates[q] = 1;
      }

      totalProfit += profits[q];

      console.log("Profit:", profits[q]);
    });

    console.log("================================================");
    console.log("Profits:", profits);
    console.log("Rates:", rates);
    console.log("Total Profit:", totalProfit);

    const dividedVal = (p215 - totalProfit) / 4;

    console.log("Sub Value:", p215 - totalProfit);
    console.log("Divided By 4:", dividedVal);

    const amount = profits[mainQuarter] + dividedVal;

    const rate = rates[mainQuarter];

    const usd = amount * rate;

    const share = periodEndSums[mainQuarter] || 0;

    const result = usd * (share / 100);

    console.log("================================================");
    console.log("🎯 FINAL CALCULATION");
    console.log("Quarter:", mainQuarter);
    console.log("Profit:", profits[mainQuarter]);
    console.log("Rate:", rate);
    console.log("Share:", share);
    console.log("Amount:", amount);
    console.log("USD:", usd);
    console.log("Result:", result);

    value = Number(result.toFixed(2));

    console.log("================================================");
    console.log("✅ FORMIO VALUE:", value);
    console.log("================================================");
  })
  .catch((err) => {
    console.error("❌ ERROR");
    console.error(err);

    value = "";
  });
