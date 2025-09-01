// 500-ის  ბოლო უდრის 500-ის დასაწყისში“  + 520 - 522   +530 - 531 -532 - 534- 536   + 549_1   +564_1   +570 +500(3) 
let sum = 0;
const pStart500 = parseFloat(row["pageVPanelTable12Columns500500501502"]) || 0;
const pEnd500 = parseFloat(row["pageVPanelTable12Columns2"]) || 0;
const n520 = parseFloat(row["pageVPanelTable12520"]) || 0;
const n522 = parseFloat(row["pageVPanelTable12522522524526528"]) || 0;
const n530_n536 = parseFloat(row["pageVPanelTable12530536"]) || 0;
const n549_1 = parseFloat(row["pageVPanelTable125491"]) || 0;
const n564_1 = parseFloat(row["pageVPanelTable115641"]) || 0;
const n570 = parseFloat(row["pageVPanelTable12572"]) || 0;
const n500_3 = parseFloat(row["pageVPanelTable125003"]) || 0;

sum = pStart500 + n520 - n522;

const n530 = parseFloat(row["pageVPanelTable10530"]) || 0;
const n531 = parseFloat(row["pageVPanelTable10531"]) || 0;
const n532 = parseFloat(row["pageVPanelTable10532"]) || 0;
const n534 = parseFloat(row["pageVPanelTable10534"]) || 0;
const n536 = parseFloat(row["pageVPanelTable10536"]) || 0;

let calculate = n530 - n531 - n532 - n534 - n536;

sum += calculate + n549_1 + n564_1 + n570 + n500_3;

let alertNumber;

if (Number.isNaN(pStart500)) {
    alertNumber = pStart500;
} else {
    alertNumber = sum - pEnd500;
}

if (sum === pEnd500) {
    valid = true;
} else {
    valid = "გადაამოწმეთ სესხის თანხები, სხვაობაა " + alertNumber.toFixed(2);
}
