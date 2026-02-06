let sum = 0;
for (let i = 1; i <= 6; i += 1) {
  let preValue = parseFloat(data[`c9${i}_dsrk6`]);
  if (isNaN(preValue)) {
    preValue = 0;
  }
  sum += preValue;
}

sum = sum.toFixed(2);

value = sum === 0 || sum === "0.00" ? "" : sum;
