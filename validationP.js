const pStart500 = row["pageVPanelTable12Columns500500501502"];
const pEnd500 = parseInt(row["pageVPanelTable12Columns2"]);
const n520 = row["pageVPanelTable12520"];
const n522 = row["pageVPanelTable12522522524526528"];
const n530_n536 = row["pageVPanelTable12530536"];
const n549_1 = row["pageVPanelTable125491"];
const n564_1 = row["pageVPanelTable115641"];
const n570 = row["pageVPanelTable12572"];
const n500_3 = row["pageVPanelTable125003"];

let sum = 0;

if (pStart500) {
  sum += pStart500;
}

if (n520) {
  sum += n520;
}

if (n522) {
  sum -= n522;
}

let n530 = row["pageVPanelTable10530"];
let n531 = row["pageVPanelTable10531"];
let n532 = row["pageVPanelTable10532"];
let n534 = row["pageVPanelTable10534"];
let n536 = row["pageVPanelTable10536"];

let calculate = 0;

if (n530) {
  calculate += n530;
}

if (n531) {
  calculate -= n531;
}

if (n532) {
  calculate -= n532;
}

if (n534) {
  calculate -= n534;
}

if (n536) {
  calculate -= n536;
}

if (calculate) {
  sum += calculate;
}

if (n549_1) {
  sum += n549_1;
}

if (n564_1) {
  sum += n564_1;
}

if (n570) {
  sum += n570;
}

if (n500_3) {
  sum += n500_3;
}

if (pStart500) {
  if (sum === 0) {
    sum = pStart500;
  }
}

let alertNumber;

if (Number.isNaN(pEnd500)) {
  alertNumber = pStart500;
} else {
  alertNumber = pEnd500 - sum;
}

if (sum !== pEnd500) {
  valid = "გადაამოწმეთ სესხის თანხები, სხვაობაა" + alertNumber;
}
