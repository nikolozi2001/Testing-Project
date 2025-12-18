let grid = data.page6DataGridUniversity;
let sum = 0;

grid.forEach((item) => {
  const num = item["page6DataGridUniversityNumber3"];

  if (num) {
    sum += parseFloat(num);
  }
});

value = sum === 0 ? "" : sum.toFixed(2);
