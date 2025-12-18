let grid = data.page1DataGridUniversity;
let sum = 0;

grid.forEach((item) => {
  const num = item["page1DataGridUniversity7"];

  if (num) {
    sum += parseFloat(num);
  }
});

value = sum === 0 ? "" : sum.toFixed(2);
