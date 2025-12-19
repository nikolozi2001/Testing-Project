let sum = 0;

const n2 = data["p8Table2PersonNumber29"];
const n3 = data["p8Table2PersonNumber30"];
const n4 = data["p8Table2PersonNumber31"];
const n5 = data["p8Table2PersonNumber32"];

if (n2) {
  sum += parseFloat(n2);
}

if (n3) {
  sum += parseFloat(n3);
}

if (n4) {
  sum += parseFloat(n4);
}

if (n5) {
  sum += parseFloat(n5);
}

let grid = data.university_person_input_wliuri;

grid.forEach((item) => {
  const num = item["universityPersonInputWliuriNumber6"];

  if (num) {
    sum += parseFloat(num);
  }
});

value = sum === 0 ? "" : sum.toFixed(2);
