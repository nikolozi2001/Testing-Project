result = false;

let check1 = data["inportCostOfTransportingGoods"];
let check2 = data["inportPercentageOfTransportationCosts"];

if (check1 || check2 ) {
  result = true;
} else {
  result = false;
}