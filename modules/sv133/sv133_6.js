const r4_raw = row["c133_dsrk4"];

const r3 = parseInt(row["c133_dsrq3"]) || 0;
const r4 = parseInt(row["c133_dsrk4"]) || 0;
const r5 = parseInt(row["c133_dwaq5"]) || 0;
const r6 = parseInt(row["c133_dwaq6"]) || 0;

const c13_col4 = parseInt(row["c13_dsrk4"]) || 0;
const c133_col4 = r4;

const c13_col6 = parseInt(row["c13_dwaq6"]) || 0;
const c133_col6 = r6;

if (r4_raw === undefined || r4_raw === null || r4_raw === "") {
  valid = "გთხოვთ შეავსოთ სვეტი 4";
} else if (c13_col6 < c133_col6) {
  valid = "სტრიქონი 133 ნაკლები ან ტოლი უნდა იყოს სტრიქონ 13-ზე";
} else if (r5 < r6) {
  valid = "სვეტი 6 უნდა იყოს ნაკლები ან ტოლი სვეტი 5-ზე";
} else if (r6 > 0 && r4 === 0) {
  valid = "თუ სვეტი 6 მეტია 0-ზე, მაშინ სვეტი 4 უნდა იყოს მეტი 0-ზე";
} else if (r3 === 0 && r4 === 0 && (r5 !== 0 || r6 !== 0)) {
  valid = "თუ სვეტი 3 და 4 არის 0, მაშინ სვეტი 5 და 6-იც უნდა იყოს 0";
} else if (r5 === 0 && r6 === 0 && (r3 !== 0 || r4 !== 0)) {
  valid = "თუ სვეტი 5 და 6 არის 0, მაშინ სვეტი 3 და 4-იც უნდა იყოს 0";
} else if (r3 === r4 && r5 !== r6) {
  valid = "თუ სვეტი 3 უდრის სვეტ 4-ს, მაშინ სვეტი 5 უნდა უდრიდეს სვეტ 6-ს";
} else if (r5 === r6 && r3 !== r4) {
  valid =
    "თუ სვეტი 5 უდრის სვეტ 6-ს, მაშინ სვეტი 3 უნდა უდრიდეს სვეტ 4-ს";
} else {
  valid = true;
}
