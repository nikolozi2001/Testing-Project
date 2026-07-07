let sum = 0;
const e1S2 = row["pageVPanelTable12IiiIv"] || 0;
const pStart = row["pageVPanelTable12IiIii"] || 0;
const p520 = row["pageVPanelTable12Iii"] || 0;
const p522 = row["pageVPanelTable12Number3"] || 0;
const p530 = row["pageVPanelTable10Iii"] || 0;
const p531 = row["pageVPanelTable10Iii2"] || 0;
const p532 = row["pageVPanelTable10Number3"] || 0;
const p534 = row["pageVPanelTable10Number7"] || 0;
const p536 = row["pageVPanelTable10Number11"] || 0;
const p549_1 = row["pageVTableNumber7"] || 0;
const p564_1 = row["pageVPanelTable11Number7"] || 0;
const p570 = row["pageVPanelTable12Number31"] || 0;
const p500_3 = row["pageVPanelTable12Number35"] || 0;

if (pStart) {
  sum += pStart;
}

if (p520) {
  sum += p520;
}

if (p522) {
  sum -= p522;
}

if (p530) {
  sum += p530;
}

if (p531) {
  sum -= p531;
}

if (p532) {
  sum -= p532;
}

if (p534) {
  sum -= p534;
}

if (p536) {
  sum -= p536;
}

if (p549_1) {
  sum += p549_1;
}

if (p564_1) {
  sum += p564_1;
}

if (p570) {
  sum += p570;
}

if (p500_3) {
  sum += p500_3;
}

sum = parseFloat(sum.toFixed(4));

const alertNumber = parseFloat((e1S2 - sum).toFixed(4));

if (sum === e1S2) {
  valid = true;
} else {
  valid = "გადაამოწმეთ სესხის თანხები, სხვაობაა " + alertNumber;
}
