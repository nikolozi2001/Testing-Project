// Fixed validation code with proper tolerance handling

let pStart;
let pEnd;
let dataGrid4;
let dataGrid6;
let dataGrid5;

let pStartSum = 0;
let pEndSum = 0;
let dataGrid4Sum = 0;
let dataGrid6Sum = 0;
let dataGrid5Sum = 0;

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
  dataGrid4Sum += dataGrid4;
  dataGrid6Sum += dataGrid6;
  dataGrid5Sum += dataGrid5;
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

// FIX: This condition was checking pStartRow twice, should check both pStartRow and pEndRow
if (pStartRow === 0 && pEndRow === 0) {
  valid = "პერიოდის დასაწყისი და პერიოდის ბოლო არ უნდა იყოს 0_ის ტოლი";
}

// Store the original numeric pEndSum before converting to string
const pEndSumNumeric = pEndSum;

// Round sums to 5 decimal places (as strings)
pStartSum = pStartSum.toFixed(5);
pEndSum = pEndSum.toFixed(5);
dataGrid4Sum = dataGrid4Sum.toFixed(5);
dataGrid6Sum = dataGrid6Sum.toFixed(5);
dataGrid5Sum = dataGrid5Sum.toFixed(5);

// FIX: Use a much smaller tolerance for floating point comparison
// OR use string comparison after toFixed
const tolerance = 0.00001; // This is appropriate for 5 decimal places

console.log("pStartSum:", pStartSum, "type:", typeof pStartSum);

if (pStartSum === "100.00000") {
  if (dataGrid4Sum !== "100.00000") {
    valid =
      "წლის დასაწყისში წილები 100_ის ტოლია, ამიტომ მომდევნო წილებიც უნდა იყოს 100_ის ტოლი";
  } else {
    valid = true;
  }

  console.log(valid);
}

// Calculate previous period total
const prevPeriod = (
  parseFloat(dataGrid4Sum) +
  parseFloat(dataGrid6Sum) +
  parseFloat(dataGrid5Sum)
).toFixed(5);

if (
  pStartRow === 0 &&
  pEndRow === 0 &&
  dataGrid4Row === 0 &&
  dataGrid6Row === 0 &&
  dataGrid5Row === 0
) {
  valid = "ყველა ველი არ უნდა იყოს 0_ის ტოლი";
} else if (
  // Option 1: Use string comparison (more precise)
  pEndSum !== "100.00000" &&
  pEndSum !== "0.00000"

  // Option 2: Use numeric comparison with small tolerance
  // !(Math.abs(pEndSumNumeric - 100) < tolerance || Math.abs(pEndSumNumeric - 0) < tolerance)
) {
  valid = "პერიოდის ბოლო უნდა იყოს 0_ის ან 100_ის ტოლი";
} else {
  valid = true;
  console.log("All validations passed");
}
