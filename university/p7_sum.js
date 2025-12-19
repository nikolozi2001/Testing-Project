const n3 = data["p7TableGrant3"];
const n4 = data["p7TableGrant4"];
const n5 = data["p7TableGrant5"];
const n6 = data["p7TableGrant6"];

let sum = 0;

if (n3) {
  sum += parseFloat(n3);
}
if (n4) {
  sum += parseFloat(n4);
}
if (n5) {
    sum += parseFloat(n5);
}
if (n6) {
    sum += parseFloat(n6);
}

value = sum === 0 ? "" : sum.toFixed(2);