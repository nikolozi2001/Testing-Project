const quarter = parseInt(data["page5Columns5"]);

const monthNames = [
  "1 იანვარი",
  "2 თებერვალი",
  "3 მარტი",
  "4 აპრილი",
  "5 მაისი",
  "6 ივნისი",
  "7 ივლისი",
  "8 აგვისტო",
  "9 სექტემბერი",
  "10 ოქტომბერი",
  "11 ნოემბერი",
  "12 დეკემბერი",
];

let monthName;
if (quarter === 1) {
  monthName = monthNames[2]; // მარტი
} else if (quarter === 2) {
  monthName = monthNames[5]; // ივნისი
} else if (quarter === 3) {
  monthName = monthNames[8]; // სექტემბერი
} else if (quarter === 4) {
  monthName = monthNames[11]; // დეკემბერი
} else {
  monthName = "არასწორი კვარტალი";
}

value = "520_" + monthName;
