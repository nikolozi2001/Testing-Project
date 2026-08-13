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

// =======================================================
// სტრ. 215-ის ვალუტა (page2Table5Select).
// ორ დანიშნულებას ასრულებს:
//   1. Form.io-სთვის dependency — ამ ველზე მითითება ნიშნავს,
//      რომ ვალუტის შეცვლისას გადათვლა თავიდან გაეშვება;
//   2. currencyId-ის წყარო kursis fallback-ისთვის, როცა
//      API-ს კვარტალში currency = null მოდის.
// ⚠️ optional chaining აუცილებელია — ძველი კოდის `.value`
//    პირდაპირი წაკითხვა იწვევდა "Cannot read properties of
//    undefined (reading 'value')" შეცდომას.
// =======================================================
const p215Currency = data.page2Table5Select;
const p215CurrencyId = p215Currency?.value ?? null;

console.log("🏦 p215 Currency (page2Table5Select):", p215Currency);
console.log("🏦 p215 Currency Id:", p215CurrencyId);

// ქეშის გასაღები — თითო კითხვარზე, კვარტალსა და ვალუტაზე ცალკე.
// ვალუტა გასაღებშია, რომ მისი შეცვლის შემდეგ ძველი (არასწორი)
// შედეგი აღარ ჩაისვას ველში.
const CACHE_KEY = `p7t3n4_q${mainQuarter}_${enterpriseSurveyId}_c${p215CurrencyId}`;

console.log("🌍 URL:", window.location.href);
console.log("🆔 enterpriseSurveyId:", enterpriseSurveyId);

const currencyUrl = `/api/lib/enterprise-survey-year-currency-map?enterpriseSurveyId=${enterpriseSurveyId}`;

const quarterUrl = `/api/enterprise/foreign-economic-activity-quarter-data?enterpriseSurveyId=${enterpriseSurveyId}`;

// წელი გვჭირდება კურსის fallback-ისთვის (trade-currency-by-quarter).
const infoUrl = `/api/lib/enterprise-survey-info?enterpriseSurveyId=${enterpriseSurveyId}`;

console.log("💱 Currency URL:", currencyUrl);
console.log("📊 Quarter URL:", quarterUrl);
console.log("ℹ️ Info URL:", infoUrl);

const authHeaders = {
  Accept: "application/json",
  Authorization: localStorage.getItem("accessToken"),
};

// კურსის fallback — როცა currency-map-ში შესაბამისი ჩანაწერი არ მოიძებნა.
function fetchRateFallback(currencyId, year, quarter) {
  const url = `/api/lib/trade-currency-by-quarter?currencyId=${currencyId}&year=${year}&quarter=${quarter}`;

  console.log("🔎 Fallback Rate URL:", url);

  return fetch(url, { headers: authHeaders })
    .then((r) => (r.ok ? r.json() : null))
    .then((res) => {
      const price = Number(res?.price);

      if (!price) {
        console.warn("⚠️ Fallback-მაც ვერ დააბრუნა კურსი:", url, res);
        return null;
      }

      console.log(
        `✅ Fallback Rate: ${price} (${res.currencyCode} — ${res.currencyName})`,
      );

      return price;
    })
    .catch((e) => {
      console.warn("⚠️ Fallback მოთხოვნა ჩავარდა:", url, e);
      return null;
    });
}

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
  fetch(currencyUrl, { headers: authHeaders }).then((r) => r.json()),

  fetch(quarterUrl, { headers: authHeaders }).then((r) => r.json()),

  fetch(infoUrl, { headers: authHeaders })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null),
])
  .then(([currencies, quarterData, surveyInfo]) => {
    const year = surveyInfo?.year;

    console.log("📅 Year:", year);
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
    let quartersCount = 0;

    const profits = {};
    const rates = {};

    // კურსის fallback-მოთხოვნები, რომლებსაც უნდა დავუცადოთ.
    const pendingRates = [];

    [1, 2, 3, 4].forEach((q) => {
      console.log("--------------------------------------------");
      console.log("Processing Quarter:", q);

      const item = quarterData[q];

      console.log("API Item:", item);

      if (item) {
        quartersCount += 1;

        profits[q] = Number(item.profit) || 0;

        // ვალუტა API-დან; თუ null-ია — გადავდივართ ფორმაში
        // არჩეულ ვალუტაზე (page2Table5Select).
        const apiCurrencyId = item.currency?.id;
        const currencyId = apiCurrencyId ?? p215CurrencyId;

        console.log(
          "Currency Id:",
          currencyId,
          apiCurrencyId ? "(API)" : "(page2Table5Select)",
        );

        const key = q + "-" + currencyId;

        console.log("Currency Key:", key);

        const mappedRate = Number(currencies[key]);

        if (mappedRate) {
          rates[q] = mappedRate;

          console.log("Rate (map):", rates[q]);
        } else {
          // Map-ში ვერ მოიძებნა — ვცდით trade-currency-by-quarter-ს.
          rates[q] = 1;

          if (isEmpty(currencyId) || isEmpty(year)) {
            console.warn(
              `⚠️ Rate ვერ მოიძებნა და fallback შეუძლებელია (currencyId=${currencyId}, year=${year}) → Rate = 1`,
            );
          } else {
            console.warn(`⚠️ Rate ვერ მოიძებნა map-ში (${key}) → fallback...`);

            pendingRates.push(
              fetchRateFallback(currencyId, year, q).then((price) => {
                if (price) {
                  rates[q] = price;
                } else {
                  console.warn(`⚠️ Quarter ${q}: Rate რჩება 1`);
                }
              }),
            );
          }
        }
      } else {
        console.warn("⚠️ Quarter not returned from API:", q);

        profits[q] = 0;
        rates[q] = 1;
      }

      totalProfit += profits[q];

      console.log("Profit:", profits[q]);
    });

    // ვუცდით ყველა fallback-ს, სანამ საბოლოო გამოთვლას გავაკეთებთ.
    return Promise.all(pendingRates).then(() => {
      console.log("================================================");
      console.log("Profits:", profits);
      console.log("Rates:", rates);
      console.log("Total Profit:", totalProfit);

      const divisor = quartersCount || 1;

      const dividedVal = (p215 - totalProfit) / divisor;

      console.log("Quarters Count (divisor):", divisor);
      console.log("Sub Value:", p215 - totalProfit);
      console.log("Divided By", divisor + ":", dividedVal);

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

      const finalValue = Number(result.toFixed(2));

      // 1. ვინახავთ localStorage-ში — ამას სინქრონულად წაიკითხავს
      //    ფაილის ბოლოში მდებარე კოდი შემდეგ გადათვლაზე.
      localStorage.setItem(CACHE_KEY, finalValue);

      // 2. ვცდილობთ დაუყოვნებლივ ჩვენებას instance.setValue-ით
      //    (guard-ით, რომ არ ჩავვარდეთ უსასრულო ციკლში).
      try {
        if (
          typeof instance !== "undefined" &&
          instance &&
          typeof instance.setValue === "function"
        ) {
          const current = Number(instance.getValue ? instance.getValue() : NaN);
          if (current !== finalValue) {
            instance.setValue(finalValue);
          }
        }
      } catch (e) {
        console.warn("⚠️ instance.setValue ვერ შესრულდა:", e);
      }

      console.log("================================================");
      console.log("✅ FORMIO VALUE:", finalValue);
      console.log("================================================");
    });
  })
  .catch((err) => {
    console.error("❌ ERROR");
    console.error(err);
  });

// =======================================================
// სინქრონული value — Form.io-ს ეს წაიკითხავს ყოველ გადათვლაზე.
// fetch-ის დასრულებამდე localStorage ცარიელია → value უცვლელი რჩება;
// შედეგის ჩაწერის შემდეგ (მომდევნო გადათვლაზე) აქ ჩაისმება რიცხვი.
// =======================================================
const cachedValue = localStorage.getItem(CACHE_KEY);
if (cachedValue !== null && cachedValue !== "") {
  value = Number(cachedValue);
}
