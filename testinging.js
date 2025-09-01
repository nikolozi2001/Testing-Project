let count = 0;
for (let i = 1; i <= 13; i++) {
  if (data[`page6Table14cv6_3_1-${i}`]) {
    count++;
  }
}
valid = count < 3 ? true : false;

console.log(valid, count, "Valid:", "Count");
