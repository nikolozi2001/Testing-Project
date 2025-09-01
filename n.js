let grid = data.page3DataGrid;
let sum = 0;

grid.forEach((item) => {
  const num = item["page3Oct1"];

  if (num) {
    sum += parseFloat(num);
  }
});

value = sum === 0 ? "" : sum.toFixed(2);
