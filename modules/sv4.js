const r4_raw = row["c14_dsrk4"];
const r6_raw = row["c14_dwaq6"];

const r3 = row["c14_dsrq3"] || 0;
const r4 = row["c14_dsrk4"] || 0;
const r5 = row["c14_dwaq5"] || 0;
const r6 = row["c14_dwaq6"] || 0;

if (r6_raw === undefined || r6_raw === null || r6_raw === "") {
  valid = "გთხოვთ შეავსოთ სვეტი 6";
} else if (r3 < r4) {
  valid = "სვეტი 4 უნდა იყოს ნაკლები ან ტოლი სვეტი 3-ზე";
} else if (r4 > 0 && r6 === 0) {
  valid = "თუ სვეტი 4 მეტია 0-ზე, მაშინ სვეტი 6 უნდა იყოს მეტი 0-ზე";
} else if (r3 === 0 && r4 === 0 && (r5 !== 0 || r6 !== 0)) {
  valid = "თუ სვეტი 3 და 4 არის 0, მაშინ სვეტი 5 და 6-იც უნდა იყოს 0";
} else if (r5 === 0 && r6 === 0 && (r3 !== 0 || r4 !== 0)) {
  valid = "გთხოვთ შეავსოთ სვეტი 6";
} else if (r5 === r6 && r3 !== r4) {
  valid =
    "თუ სვეტი 5 უდრის სვეტ 6-ს, მაშინ სვეტი 3 უნდა უდრიდეს სვეტ 4-ს";
} else {
  valid = true;
}
