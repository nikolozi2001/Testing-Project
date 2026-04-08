let cv1 = data.page1row3_staff_count;

let sum = 0;
let num;

for (let i = 0; i < data.page3EditGrid.length; i++) {
  num = data.page3EditGrid[i]["page3EditGridTable"]["page3row1_personnel_in_positions_count"];

  if (num) {
    sum += parseInt(num);
  }
}

console.log(sum, "sum");

if (sum === 0) {
  valid = "უნდა იყოს 0_ზე მეტი";
} else if (sum !== cv1) {
  valid = "(2 სვ) = (1 გვ)(03 სტ)(6 სვ) უნდა იყოს";
} else {
  valid = true;
}
