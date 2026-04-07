const r3_raw = row["c133_dsrq3"];
const r4_raw = row["c133_dsrk4"];
const r6_raw = row["c133_dwaq6"];

const r3 = Number(r3_raw) || 0;
const r4 = Number(r4_raw) || 0;
const r5 = Number(row["c133_dwaq5"]) || 0;
const r6 = Number(r6_raw) || 0;

const c13 = Number(row["c13_dwaq5"]) || 0;
const c133 = r5;

const isEmpty = (val) => val === undefined || val === null || val === "";

if (isEmpty(r3_raw)) {
  valid = "გთხოვთ შეავსოთ სვეტი 3";
} else if (c13 < c133) {
  valid = "სტრიქონი 133 ნაკლები ან ტოლი უნდა იყოს სტრიქონ 13-ზე";
} else if (r5 < r6) {
  valid = "სვეტი 5 უნდა იყოს მეტი ან ტოლი სვეტი 6-ზე";
} else if (r3 === 0 && r4 === 0 && (r5 !== 0 || r6 !== 0)) {
  valid = "თუ სვეტი 5 მეტია 0-ზე, მაშინ სვეტი 3 უნდა იყოს მეტი 0-ზე";
} else if (r5 === 0 && r6 === 0 && (r3 !== 0 || r4 !== 0)) {
  valid = "გთხოვთ შეავსოთ სვეტი 5 და 6";
} else if (r3 === r4 && r5 !== r6) {
  valid = "თუ სვეტი 3 უდრის სვეტ 4-ს, მაშინ სვეტი 5 უნდა უდრიდეს სვეტ 6-ს";
} else {
  valid = true;
}
