const n1 = parseInt(row["p1t1n10"]) || 0;
const n2 = parseInt(row["c0_dwaq5"]) || 0;

if (n1 !== n2) {
  valid =
    "ჯამური მონაცემები არ ედრება წლიური კითხვარით წარმოდგენილ მონაცემებს - გთხოვთ გადაამოწმოთ";
} else {
  valid = true;
}
