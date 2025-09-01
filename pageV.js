const pStart510 = row["pageVPanelTable16Columns510"];
const pEnd510 = row["pageVPanelTable16ColumnsNumber"];
const n554 = row["pageVPanelTable16554"];
const n556 = row["pageVPanelTable16556"];
const n560_n564 = row["pageVPanelTable16560564"];
const n574 = row["pageVPanelTable16574"];
const n510_3 = row["pageVPanelTable165103"];

let sum = 0;

if (pStart510) {
  sum += pStart510;
}

if (n554) {
  sum += n554;
}

if (n556) {
  sum -= n556;
}

if (n560_n564) {
  sum += n560_n564;
}

if (n574) {
  sum += n574;
}

if (n510_3) {
  sum += n510_3;
}

const alertNumber = sum - pEnd510;

if (sum !== pEnd510) {
  valid = "გადაამოწმეთ სესხის თანხები " + alertNumber;
}
