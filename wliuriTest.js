const pStart500 = row["pageVPanelTable12Columns500500501502"];
const pE1S2 = row["pageVPanelTable12IIi"];
const pE2S3 = row["pageVPanelTable12IiIii"];
const pE3S4 = row["pageVPanelTable12IiiIv"];
const pEnd500 = row["pageVPanelTable12Columns2"];
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

if (n530_n536) {
  sum += n530_n536;
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

const alertNumber = pEnd - sum500;

if (sum !== pEnd500) {
  valid = "გადაამოწმეთ სესხის თანხები " + alertNumber;
}
