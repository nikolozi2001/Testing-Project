const sul1 = row["page2EditGridMain222"];
let sum = 0;
let nsf;
// let fartobi = row["page2EditGridMain223"];

let page2EditGridMain223;

let grid = data.page2EditGridMain;
// console.log(grid, "grid");

for (let i = 0; i < grid.length; i++) {
  nsf = grid[i]["page2DataGrid5"];
  console.log(grid[i], "grid[i]");
  let array = grid.map((item) => item.page2EditGridMain223);
  console.log(array, "array");

  if (nsf !== sum) {
    valid =
      "ნაკვეთის სრული ფართობი არ არის ტოლი მიწათსარგებლობაში არსებული ფართობისა";
  } else {
    valid = true;
  }
}

// sum += fartobi;

console.log(nsf, "nsf");
console.log(sum, "sum");

if (sul1 !== undefined && fartobi === undefined) {
  valid =
    "გთხოვთ შეავსოთ 'ფართობი (მიუთითეთ ჰექტარებში, 0.0001 ჰა-მდე სიზუსტით)' ველი";
} else {
  valid = true;
}
