let sum = 0;
const pStart504 = row["pageVPanelTable15Columns2504504506508"];
const p538 = row["pageVPanelTable15538"];
const p540 = row["pageVPanelTable15540540542544546"];
const p548 = row["pageVTable548"];
const p549 = row["pageVTable54954954915492"];
const p550 = row["pageVTable550"];
const p564_3 = row["pageVPanelTable155643"];
const p572 = row["pageVPanelTable15572"];
const p504_3 = row["pageVPanelTable155043"];
const pEnd504 = row["pageVPanelTable15Columns2Number"];

if (pStart504) {
  sum += pStart504;
}

if (p538) {
  sum += p538;
}

if (p540) {
  sum -= p540;
}

if (p548) {
  sum += p548;
}

if (p549) {
  sum -= p549;
}

if (p550) {
  sum -= p550;
}

if (p564_3) {
  sum += p564_3;
}

if (p572) {
  sum += p572;
}

if (p504_3) {
  sum += p504_3;
}

let alertNumber;

if (Number.isNaN(pStart504)) {
  alertNumber = pStart504;
} else {
  alertNumber = sum - pEnd504;
}

if (sum === pEnd504) {
  valid = true;
} else {
  valid = "გადაამოწმეთ სესხის თანხები, სხვაობაა " + alertNumber.toFixed(2);
}
