const pStart500 = parseFloat(row["pageVPanelTable12Columns500500501502"]) || 0;
const pEnd500 = parseInt(row["pageVPanelTable12Columns2"]) || 0;
const n520 = parseFloat(row["pageVPanelTable12520"]) || 0;
const n522 = parseFloat(row["pageVPanelTable12522522524526528"]) || 0;
const n530_n536 = parseFloat(row["pageVPanelTable12530536"]) || 0;
const n549_1 = parseFloat(row["pageVPanelTable125491"]) || 0;
const n564_1 = parseFloat(row["pageVPanelTable115641"]) || 0;
const n570 = parseFloat(row["pageVPanelTable12572"]) || 0;
const n500_3 = parseFloat(row["pageVPanelTable125003"]) || 0;

let sum = pStart500 + n520 - n522;

const n530 = parseFloat(row["pageVPanelTable10530"]) || 0;
const n531 = parseFloat(row["pageVPanelTable10531"]) || 0;
const n532 = parseFloat(row["pageVPanelTable10532"]) || 0;
const n534 = parseFloat(row["pageVPanelTable10534"]) || 0;
const n536 = parseFloat(row["pageVPanelTable10536"]) || 0;

let calculate = n530 - n531 - n532 - n534 - n536;

sum += calculate + n549_1 + n564_1 + n570 + n500_3;

if (pStart500 && sum === 0) {
  sum = pStart500;
}

let alertNumber;

if (Number.isNaN(pEnd500)) {
  alertNumber = pStart500;
} else {
  alertNumber = pEnd500 - sum;
}

if (sum !== pEnd500) {
  valid = "გადაამოწმეთ სესხის თანხები, სხვაობაა " + alertNumber;
}
