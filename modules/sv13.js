const r3_raw = row["c13_dsrq3"];
const r5_raw = row["c13_dwaq5"];

const r3 = row["c13_dsrq3"] || 0;
const r4 = row["c13_dsrk4"] || 0;
const r5 = row["c13_dwaq5"] || 0;
const r6 = row["c13_dwaq6"] || 0;

if (r5_raw === undefined || r5_raw === null || r5_raw === "") {
  valid = "გთხოვთ შეავსოთ სვეტი 5";
} else if (r3 < r4) {
  valid = "სვეტი 3 უნდა იყოს მეტი ან ტოლი სვეტი 4-ზე";
} else if (r3 > 0 && r5 === 0) {
  valid = "თუ სვეტი 3 მეტია 0-ზე, მაშინ სვეტი 5 უნდა იყოს მეტი 0-ზე";
} else if (r3 === 0 && r4 === 0 && (r5 !== 0 || r6 !== 0)) {
  valid = "თუ სვეტი 3 და 4 არის 0, მაშინ სვეტი 5 და 6-იც უნდა იყოს 0";
} else if (r5 === 0 && r6 === 0 && (r3 !== 0 || r4 !== 0)) {
  valid = "გთხოვთ შეავსოთ სვეტი 5";
} else if (r5 === r6 && r3 !== r4) {
  valid = "თუ სვეტი 5 უდრის სვეტ 6-ს, მაშინ სვეტი 3 უნდა უდრიდეს სვეტ 4-ს";
} else {
  valid = true;
}
