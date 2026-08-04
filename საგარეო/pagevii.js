// 🟦 [DEBUG START] კოდის გაშვების დასაწყისი
console.group("%c 🚀 enterpriseSurvey Q1 Calculation START ", "background: #222; color: #bada55; font-size: 13px; font-weight: bold;");

function isEmpty(str) {
  return str === null || str === undefined || str === "" || isNaN(str);
}

const enterpriseSurveyId = window.location.href.split("/").pop();
console.log("%c 📌 surveyId: ", "color: #00ffff; font-weight: bold;", enterpriseSurveyId);

const url_Currency = `/api/lib/enterprise-survey-year-currency-map?enterpriseSurveyId=${enterpriseSurveyId}`;
const url = `/api/enterprise/foreign-economic-activity-quarter-data?enterpriseSurveyId=${enterpriseSurveyId}`;

let sum = 0;
let periodEndSum_q1 = 0, periodEndSum_q2 = 0, periodEndSum_q3 = 0, periodEndSum_q4 = 0;
let lastProfitSum = 0;
let lastProfitSumLength = 0;
let dividedVal = 0;

const fetchedData = [];
const periodEndSums = [];
let mainVal = [];

// 1. ვალუტების ტვირთვა
fetch(url_Currency, {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: localStorage.getItem("accessToken"),
  },
})
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error("Failed to fetch currency data");
  })
  .then((data) => {
    window.currencies = data;
    sessionStorage.setItem("currencies", JSON.stringify(window.currencies));
    console.log("%c 💱 Currencies Loaded: ", "color: #4caf50; font-weight: bold;", window.currencies);
  })
  .catch((error) => console.error("%c ❌ Currency Fetch Error: ", "color: #ff4d4d;", error.message));

// 2. პარტნიორების ბადის დამუშავება
console.group("%c 📋 Partner Grid Calculations ", "color: #ff9800; font-weight: bold;");
if (data && data.partniorDataGrid) {
  data.partniorDataGrid.forEach((item, index) => {
    const pEnd_q1 = parseFloat(item["partniorDataGrid4"]);
    const pEnd_q2 = parseFloat(item["partniorDataGrid6"]);
    const pEnd_q3 = parseFloat(item["partniorDataGrid5"]);
    const pEnd_q4 = parseFloat(item["partniorDataGrid3"]);
    const country = item["page37"];

    if (!isEmpty(pEnd_q1) && pEnd_q1 >= 10 && (isEmpty(country) || country !== 1)) periodEndSum_q1 += pEnd_q1;
    if (!isEmpty(pEnd_q2) && pEnd_q2 >= 10 && (isEmpty(country) || country !== 1)) periodEndSum_q2 += pEnd_q2;
    if (!isEmpty(pEnd_q3) && pEnd_q3 >= 10 && (isEmpty(country) || country !== 1)) periodEndSum_q3 += pEnd_q3;
    if (!isEmpty(pEnd_q4) && pEnd_q4 >= 10 && (isEmpty(country) || country !== 1)) periodEndSum_q4 += pEnd_q4;
  });
} else {
  console.warn("⚠️ data.partniorDataGrid არ მოიძებნა!");
}

periodEndSums.push({
  1: periodEndSum_q1,
  2: periodEndSum_q2,
  3: periodEndSum_q3,
  4: periodEndSum_q4,
});
console.log("%c 📊 Calculated Period End Sums (Q1-Q4):", "color: #ff9800;", periodEndSums[0]);
console.groupEnd();

// 3. კვარტლის მონაცემების წამოღება
fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: localStorage.getItem("accessToken"),
  },
})
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error("Failed to fetch quarter data");
  })
  .then((data) => {
    console.group("%c 📊 Quarter Data Fetch & Calculations ", "color: #2196f3; font-weight: bold;");
    console.log("📥 Raw Fetch Data:", data);

    let profitSum = 0;
    const entries = Object.entries(data);

    entries.forEach(([key, item]) => {
      const preValue = `${key}-` + (item.currency ? item.currency.id : "");
      const rate = (window.currencies && window.currencies[preValue]) ? window.currencies[preValue] : 1;
      const profit = parseFloat(item.profit) || 0;

      profitSum += profit;
      fetchedData.push({
        quarter: key,
        profit: profit,
        currencyId: item.currency ? item.currency.id : null,
        profitSum: profitSum,
        rate: rate,
      });
    });

    lastProfitSum = fetchedData.length > 0 ? fetchedData[fetchedData.length - 1].profitSum : 0;

    // 🔴 თუ კვარტლები არ არის (ყველა 0-ია ან ცარიელია), მაინც იყოფა 4-ზე!
    lastProfitSumLength = fetchedData.length > 0 ? fetchedData.length : 4;

    console.log(`📈 Total Profit Sum (lastProfitSum): ${lastProfitSum}`);
    console.log(`🔢 Quarter Count (lastProfitSumLength): ${lastProfitSumLength}`);

    calculateSubVal();
    console.groupEnd();
  })
  .catch((error) => console.error("%c ❌ Quarter Fetch Error: ", "color: #ff4d4d;", error.message));

// 4. ქვეგამოთვლების ფუნქცია
function calculateSubVal() {
  console.group("%c 🧮 Sub-Value Step Calculations ", "color: #9c27b0; font-weight: bold;");
  
  const p215 = parseFloat(data["page2Table5Number"]) || 0;
  console.log(`📄 Page 2 Table 5 Number (p215): ${p215}`);

  const subVal = p215 - lastProfitSum;
  dividedVal = subVal / lastProfitSumLength;

  console.log(`➖ SubVal (p215 - profitSum): ${subVal}`);
  console.log(`➗ DividedVal (subVal / length): ${dividedVal}`);

  const periodEndSumsObj = periodEndSums[0];

  fetchedData.forEach((obj) => {
    const quarter = obj.quarter;
    const share = periodEndSumsObj[quarter] || 0;

    obj.dividedVal = dividedVal.toFixed(2);
    obj.dividedValAddProfit = (obj.profit + dividedVal).toFixed(2);
    obj.preDollar = (obj.rate * parseFloat(obj.dividedValAddProfit)).toFixed(2);
    obj.share = share;
    obj.sum = (parseFloat(obj.preDollar) * (share / 100)).toFixed(2);

    mainVal.push({
      quarter: obj.quarter,
      preValue: obj.sum,
    });
  });

  console.log("📝 Main Calculated Array (mainVal):", mainVal);
  console.groupEnd();
}

// 5. საბოლოო შედეგი (setTimeout)
const mainQuarter = 1;

setTimeout(() => {
  console.group("%c ⏱️ Timeout Executing (Final Result) ", "color: #00e676; font-weight: bold;");
  
  sum = 0;
  mainVal.forEach((item) => {
    if (item.quarter == mainQuarter) {
      sum += parseFloat(item.preValue) || 0;
    }
  });

  console.log(`✅ Calculated Q1 Sum: ${sum}`);
  localStorage.setItem("q1_215", sum);

  const preSum = localStorage.getItem("q1_215");
  value = (preSum === "0" || preSum === 0) ? "" : preSum;

  console.log(`🏁 Final 'value' assigned: "${value}"`);
  console.groupEnd();
  
  // 🏁 [DEBUG END] კოდის დასასრული
  console.groupEnd(); // Closes main DEBUG START group
}, 2000);