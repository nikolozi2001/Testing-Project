let sum = 0;

const e1S2 = parseFloat(row["pageVPanelTable16ColumnsNumber"]) || 0;
const pStart = parseFloat(row["pageVPanelTable16Columns510"]) || 0;
const p554 = parseFloat(row["pageVPanelTable16554"]) || 0;
const p556 = parseFloat(row["pageVPanelTable16556"]) || 0;
const p560_564 = parseFloat(row["pageVPanelTable16560564"]) || 0;
const p574 = parseFloat(row["pageVPanelTable16574"]) || 0;
const p510_3 = parseFloat(row["pageVPanelTable165103"]) || 0;

sum += pStart + p554 + p560_564 + p574 + p510_3 - p556;

let alertNumber;
if (Number.isNaN(e1S2)) {
  alertNumber = e1S2;
} else {
  alertNumber = e1S2 - sum;
}

if (sum === e1S2) {
  valid = true;
} else {
  valid = "გადაამოწმეთ სესხის თანხები, სხვაობაა " + alertNumber;
}
