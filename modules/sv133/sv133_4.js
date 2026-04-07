const r4_raw = row["c133_dsrk4"];
const r6_raw = row["c133_dwaq6"];

const r3 = parseInt(row["c133_dsrq3"]) || 0;
const r4 = parseInt(row["c133_dsrk4"]) || 0;
const r5 = parseInt(row["c133_dwaq5"]) || 0;
const r6 = parseInt(row["c133_dwaq6"]) || 0;

const c13 = parseInt(row["c13_dsrk4"]) || 0;
const c133 = parseInt(row["c133_dsrk4"]) || 0;

if (r6_raw === undefined || r6_raw === null || r6_raw === "") {
  valid = "გთხოვთ შეავსოთ სვეტი 6";
} else if (c13 < c133) {
  valid = "სტრიქონი 133 ნაკლები ან ტოლი უნდა იყოს სტრიქონ 13-ზე";
} else if (r3 < r4) {
  valid = "სვეტი 4 უნდა იყოს ნაკლები ან ტოლი სვეტი 3-ზე";
} else if (r5 < r6) {
  valid = "სვეტი 5 უნდა იყოს მეტი ან ტოლი სვეტი 6-ზე";
} else if (r4 > 0 && r6 === 0) {
  valid = "თუ სვეტი 4 მეტია 0-ზე, მაშინ სვეტი 6 უნდა იყოს მეტი 0-ზე";
} else if (r3 === 0 && r4 === 0 && (r5 !== 0 || r6 !== 0)) {
  valid = "თუ სვეტი 3 და 4 არის 0, მაშინ სვეტი 5 და 6-იც უნდა იყოს 0";
} else if (r5 === 0 && r6 === 0 && (r3 !== 0 || r4 !== 0)) {
  valid = "გთხოვთ შეავსოთ სვეტი 6";
} else if (r3 === r4 && r5 !== r6) {
  valid =
    "რადგან სვეტი 3 უდრის სვეტ 4-ს, სვეტი 5 აუცილებლად უნდა უდრიდეს სვეტ 6-ს";
} else if (r5 === r6 && r3 !== r4) {
  valid = "თუ სვეტი 5 უდრის სვეტ 6-ს, მაშინ სვეტი 3 უნდა უდრიდეს სვეტ 4-ს";
} else {
  valid = true;
}
