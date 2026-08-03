function isEmpty(str) {
  return str === null || str === undefined || str === "" || isNaN(str);
}

const enterpriseSurveyId = window.location.href.split("/").pop();
const url_Currency = `/api/lib/enterprise-survey-year-currency-map?enterpriseSurveyId=${enterpriseSurveyId}`;
const url_Quarter = `/api/enterprise/foreign-economic-activity-quarter-data?enterpriseSurveyId=${enterpriseSurveyId}`;

async function processQuarterData() {
  try {
    let currencies = sessionStorage.getItem("currencies");
    if (!currencies) {
      const currResponse = await fetch(url_Currency, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      if (!currResponse.ok) throw new Error("Failed to fetch currency data");
      const currData = await currResponse.json();
      window.currencies = currData;
      sessionStorage.setItem("currencies", JSON.stringify(currData));
    } else {
      window.currencies = JSON.parse(currencies);
    }

    const qResponse = await fetch(url_Quarter, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    if (!qResponse.ok) throw new Error("Failed to fetch quarter data");
    const dataQuarter = await qResponse.json();

    const fetchedData = [];
    let profitSum = 0;

    Object.entries(dataQuarter).forEach(([key, item]) => {
      const preValue = `${key}-` + item.currency.id;
      const rate = window.currencies ? window.currencies[preValue] || 1 : 1;
      const profit = parseFloat(item.profit) || 0;

      profitSum += profit;
      fetchedData.push({
        quarter: key,
        profit: profit,
        currencyId: item.currency.id,
        profitSum: profitSum,
        rate: rate,
      });
    });

    const lastProfitSum = profitSum;
    
    const lastProfitSumLength = fetchedData.length > 0 ? fetchedData.length : 4;

    let periodEndSum_q1 = 0, periodEndSum_q2 = 0, periodEndSum_q3 = 0, periodEndSum_q4 = 0;

    if (data && data.partniorDataGrid) {
      data.partniorDataGrid.forEach((item) => {
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
    }

    const periodEndSumsObj = {
      1: periodEndSum_q1,
      2: periodEndSum_q2,
      3: periodEndSum_q3,
      4: periodEndSum_q4,
    };

    const p215 = parseFloat(data["page2Table5Number"]) || 0;
    const subVal = p215 - lastProfitSum;

    const dividedVal = subVal / lastProfitSumLength;

    const mainVal = [];

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

    const mainQuarter = 1;
    let finalSum = 0;

    mainVal.forEach((item) => {
      if (item.quarter == mainQuarter) {
        finalSum += parseFloat(item.preValue) || 0;
      }
    });

    localStorage.setItem("q1_215", finalSum);

    const preSum = localStorage.getItem("q1_215");
    const value = (preSum === "0" || preSum === 0) ? "" : preSum;
    
    console.log("Calculated Value:", value);

  } catch (error) {
    console.error("Error processing data:", error);
  }
}

processQuarterData();