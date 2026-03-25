let sum = 0;

const fields = [
  "c1_dwaq6",
  "c2_dsrk6",
  "c3_dsrk6",
  "c4_dsrk6",
  "c5_dsrk6",
  "c6_dsrk6",
  "c7_dsrk6",
  "c8_dsrk6",
  "c9_dsrk6",
  "c0_0_dsrk6"
];

fields.forEach((key) => {
  let preValue = parseFloat(data[key]);

  if (isNaN(preValue)) {
    preValue = 0;
  }

  sum += preValue;
});

sum = sum.toFixed(2);

value = sum === "0.00" ? "" : sum;
