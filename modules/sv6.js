const r3 = Number(row["c14_dsrq3"]) || 0;
const r4_raw = row["c14_dsrk4"];
const r4 = Number(r4_raw) || 0;
const r5 = Number(row["c14_dwaq5"]) || 0;
const r6 = Number(row["c14_dwaq6"]) || 0;

if (r4_raw === undefined || r4_raw === null || r4_raw === "") {
  valid = "გთხოვთ შეავსოთ სვეტი 4";
} else if (r5 < r6) {
  valid = "სვეტი 6 უნდა იყოს ნაკლები ან ტოლი სვეტი 5-ზე";
} else if (r6 > 0 && r4 === 0) {
  valid = "თუ სვეტი 6 მეტია 0-ზე, მაშინ სვეტი 4 უნდა იყოს მეტი 0-ზე";
} else if (r3 === 0 && r4 === 0 && (r5 !== 0 || r6 !== 0)) {
  valid = "თუ სვეტი 3 და 4 არის 0, მაშინ სვეტი 5 და 6-იც უნდა იყოს 0";
} else if (r5 === 0 && r6 === 0 && (r3 !== 0 || r4 !== 0)) {
  valid = "თუ სვეტი 5 და 6 არის 0, მაშინ სვეტი 3 და 4-იც უნდა იყოს 0";
} else if (r3 === r4 && r5 !== r6) {
  valid =
    "თუ სვეტი 3 უდრის სვეტ 4-ს, მაშინ სვეტი 5 უნდა უდრიდეს სვეტ 6-ს";
} else {
  valid = true;
}