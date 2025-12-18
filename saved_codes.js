result = false;

const dataFields = [
  { key: "saqonlis_money", path: "page3SaqonlisRemonti2", field: "page17" },
  { key: "sazgvao_money", path: "page3SazgvaoMoms2", field: "page29" },
  { key: "sahareo_money", path: "page3SahaeroMoms2", field: "page41" },
  {
    key: "auto_money",
    path: "page3Saavtomobilo2",
    field: "page3_saavtomobilo_tanxa",
  },
  { key: "sarkinigzo_money", path: "page3Sarkinigzo2", field: "page104" },
  { key: "tds_money", path: "page3DanarcheniSaxeobebi2", field: "page109" },
  {
    key: "damxmare_money",
    path: "page3sxva_damxmare_satr_moms",
    field: "page159",
  },
  { key: "post_money", path: "page3SafostoSakuriero2", field: "page114" },
  {
    key: "travel_money",
    path: "page3Mogzauroba2",
    field: "page3_mogzauroba_tanxa",
  },
  {
    key: "mshenebloba_money",
    path: "page3msheneblobaSaqartveloshi",
    field: "mshenebloba_saqartveloshi_tanxa",
  },
  { key: "sadazgvevo_money", path: "page3sadazgvevo_moms", field: "page129" },
  { key: "finansuri_money", path: "page3finansuriMoms2", field: "page134" },
  {
    key: "inteleqtual_money",
    path: "page3InteleqtualuriSakutreba2",
    field: "page139",
  },
  {
    key: "sakomunikacio_money",
    path: "page3sat_komp_sai_moms2",
    field: "page144",
  },
  {
    key: "personal_money",
    path: "page3personaluri_kulturuli_rekreaciuli_moms2",
    field: "page149",
  },
  { key: "sxva_money", path: "page3sxva_saqmiani_moms2", field: "page154" },
];

dataFields.forEach(({ key, path, field }) => {
  const dataGrid = data[path];
  if (dataGrid && dataGrid.length > 0) {
    this[key] = dataGrid[0][field];
  }
});

const yes_no = data["page1Panel3TableRadio"];
if (yes_no === 1) {
  result = !dataFields.some(({ key }) => this[key]);
}

// refrigerator year

const r1 = data["page5Table4Q17_1"];
const r2 = data["page5Table4Q17_2"];
const r3 = data["page5Table4Q17_3"];
const r4 = data["page5Table4Q17_4"];
const r5 = data["page5Table4Q17_5"];
const r6 = data["page5Table4Q17_6"];
const r7 = data["page5Table4Q17_7"];
const r8 = data["page5Table4Q17_8"];

const rankLabels = [
  "17.1",
  "17.2",
  "17.3",
  "17.4",
  "17.5",
  "17.6",
  "17.7",
  "17.8",
];
const ranks = [r1, r2, r3, r4, r5, r6, r7, r8];
const definedRanks = ranks.filter((rank) => rank !== undefined && rank !== "");
const uniqueRanks = new Set(definedRanks);

if (definedRanks.length === uniqueRanks.size) {
  valid = true;
} else {
  const countMap = {};
  const duplicates = [];

  ranks.forEach((rank, index) => {
    if (rank !== undefined && rank !== "") {
      if (countMap[rank]) {
        countMap[rank].push(rankLabels[index]);
        if (countMap[rank].length === 2) {
          duplicates.push({ value: rank, positions: countMap[rank] });
        }
      } else {
        countMap[rank] = [rankLabels[index]];
      }
    }
  });

  const duplicateInfo = duplicates
    .map((dup) => `${dup.value} (${dup.positions.join(", ")})`)
    .join(", ");

  valid = `რანგები უნდა განსხვავდებოდეს ერთმანეთისგან (გაანაწილეთ 1-დან 8-მდე პრიორიტეტების მიხედვით). 
  დუბლირებული რანგები: ${duplicateInfo}`;
}

// ------------------------------------------------------

let enterpriseSurveyId =
  window.location.href.split("/")[window.location.href.split("/").length - 1];

console.log(enterpriseSurveyId, "enterpriseSurveyId");

window.enterpriseInfoMap = new Map();

console.log("Creating new enterpriseInfoMap");

$.ajax({
  url:
    "/api/lib/enterprise-survey-info?enterpriseSurveyId=" + enterpriseSurveyId,
  type: "GET",
  dataType: "json",
  async: false,
  success: function (response) {
    window.enterpriseInfoMap.set(enterpriseSurveyId, response);
    console.log("Added enterprise info for ID:", enterpriseSurveyId);
    console.log("Current map size:", window.enterpriseInfoMap.size);
    console.log("Response data:", response);
  },
  error: function (xhr, status, error) {
    console.error("Failed to fetch enterprise info:", error);
  },
});

if (window.enterpriseInfoMap.has(enterpriseSurveyId)) {
  value = window.enterpriseInfoMap.get(enterpriseSurveyId)["year"];
  console.log("Setting value to year:", value);
} else {
  value = "";
  console.warn("Enterprise ID not found in map");
}

// --------------------------------------------------------------
// პირველი გვერდის IV კვ. / წლის ბოლოს (საგარეო წლიურის ვალიდაცია)

// Fixed validation code with proper tolerance handling

let pStart;
let pEnd;
let dataGrid4;
let dataGrid6;
let dataGrid5;

let pStartSum = 0;
let pEndSum = 0;
let q2StartSum = 0;
let q3StartSum = 0;
let q4StartSum = 0;

let pStartObj = [];

for (let i = 0; i < data.partniorDataGrid.length; i++) {
  // Parse values and handle potential NaN cases
  pStart = parseFloat(data.partniorDataGrid[i]["partniorDataGrid2"]) || 0;
  pEnd = parseFloat(data.partniorDataGrid[i]["partniorDataGrid3"]) || 0;
  dataGrid4 = parseFloat(data.partniorDataGrid[i]["partniorDataGrid4"]) || 0;
  dataGrid6 = parseFloat(data.partniorDataGrid[i]["partniorDataGrid6"]) || 0;
  dataGrid5 = parseFloat(data.partniorDataGrid[i]["partniorDataGrid5"]) || 0;

  // Push pStart values to array
  pStartObj.push(pStart);

  // Accumulate sums
  pStartSum += pStart;
  pEndSum += pEnd;
  q2StartSum += dataGrid4;
  q3StartSum += dataGrid6;
  q4StartSum += dataGrid5;
}

let pStartRow = parseFloat(row["partniorDataGrid2"]);
if (isNaN(pStartRow)) pStartRow = 0;

let pEndRow = parseFloat(row["partniorDataGrid3"]);
if (isNaN(pEndRow)) pEndRow = 0;

let dataGrid4Row = parseFloat(row["partniorDataGrid4"]);
if (isNaN(dataGrid4Row)) dataGrid4Row = 0;

let dataGrid6Row = parseFloat(row["partniorDataGrid6"]);
if (isNaN(dataGrid6Row)) dataGrid6Row = 0;

let dataGrid5Row = parseFloat(row["partniorDataGrid5"]);
if (isNaN(dataGrid5Row)) dataGrid5Row = 0;

// Store the original numeric pEndSum before converting to string
const pEndSumNumeric = pEndSum;

// Round sums to 5 decimal places (as strings)
pStartSum = pStartSum.toFixed(5);
pEndSum = pEndSum.toFixed(5);
q2StartSum = q2StartSum.toFixed(5);
q3StartSum = q3StartSum.toFixed(5);
q4StartSum = q4StartSum.toFixed(5);

// Tolerance for numeric comparisons
const tolerance = 0.00001;

let isValid = true;

// Validation checks

if (pStartSum === 0 && pEndSum === 0) {
  valid = "პერიოდის დასაწყისი და პერიოდის ბოლო არ უნდა იყოს 0_ის ტოლი";
  isValid = false;
}

if (
  pStartRow === 0 &&
  pEndRow === 0 &&
  dataGrid4Row === 0 &&
  dataGrid6Row === 0 &&
  dataGrid5Row === 0
) {
  valid = "ყველა ველი არ უნდა იყოს 0_ის ტოლი";
  isValid = false;
}

if (pEndSum !== "100.00000" && pEndSum !== "0.00000") {
  valid = "პერიოდის ბოლო უნდა იყოს 0_ის ან 100_ის ტოლი";
  isValid = false;
}

if (pStartSum === "100.00000") {
  if (
    q2StartSum !== "100.00000" ||
    q4StartSum !== "100.00000" ||
    q3StartSum !== "100.00000"
  ) {
    valid =
      "წლის დასაწყისში წილები 100_ის ტოლია, ამიტომ მომდევნო წილებიც უნდა იყოს 100_ის ტოლი";
    isValid = false;
  }
}

if (q2StartSum === "100.00000") {
  if (q4StartSum !== "100.00000" || q3StartSum !== "100.00000") {
    valid =
      "მეორე კვარტლის დასაწყისში წილები 100_ის ტოლია, ამიტომ მომდევნო წილებიც უნდა იყოს 100_ის ტოლი";
    isValid = false;
  }
}

if (q3StartSum === "100.00000") {
  if (q4StartSum !== "100.00000") {
    valid =
      "მესამე კვარტლის დასაწყისში წილები 100_ის ტოლია, ამიტომ მომდევნო წილებიც უნდა იყოს 100_ის ტოლი";
    isValid = false;
  }
}

if (isValid) {
  valid = true;
  console.log("All validations passed");
} else {
  console.log("Validation error:", valid);
}

// --------------------------------------------------------------------------------------------------------------
// autoincrement code for Number

let usedNumbers = [];

for (let i = 0; i < data.pageTestDataGrid.length; i++) {
  const num = parseInt(
    data.pageTestDataGrid[i].pageTestDataGridNumber,
    10
  );

  if (!isNaN(num)) {
    usedNumbers.push(num);
  }
}

usedNumbers.sort((a, b) => a - b);

value = 1;
for (let i = 0; i < usedNumbers.length; i++) {
  if (usedNumbers[i] === value) {
    value++;
  } else {
    break;
  }
}

// --------------------------------------------------------------------------------------------------------------
// აუტო ინკრემენტი რიგის ნომრისთვის (რიგის გადანომრვა)
for (let i = 0; i < data.pageTestDataGrid.length; i++) {
  data.pageTestDataGrid[i].pageTestDataGridNumber = i + 1;
}
