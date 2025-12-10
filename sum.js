let sum = 0;

// Add p1t1n10
let preValue10 = parseFloat(data[`p1t1n10`]);
if (isNaN(preValue10)) {
  preValue10 = 0;
}
sum += preValue10;

// Add p1t1n16 through p1t1n21
for (let i = 16; i <= 21; i += 1) {
  let preValue = parseFloat(data[`p1t1n${i}`]);
  if (isNaN(preValue)) {
    preValue = 0;
  }
  sum += preValue;
}

sum = sum.toFixed(2);

value = sum === 0 ? "" : sum;
