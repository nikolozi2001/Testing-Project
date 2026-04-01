const r3_raw = row["c14_dsrq3"];
const r4_raw = row["c14_dsrk4"];
const r6_raw = row["c14_dwaq6"];

const r3 = Number(r3_raw) || 0;
const r4 = Number(r4_raw) || 0;
const r5 = Number(row["c14_dwaq5"]) || 0;
const r6 = Number(r6_raw) || 0;

const isEmpty = (val) => val === undefined || val === null || val === "";

if (isEmpty(r3_raw)) {
  valid = "გთხოვთ შეავსოთ სვეტი 3";
} else if (r3 < r4) {
  valid = "სვეტი 3 უნდა იყოს მეტი ან ტოლი სვეტი 4-ზე";
} else if (r5 < r6) {
  valid = "სვეტი 5 უნდა იყოს მეტი ან ტოლი სვეტი 6-ზე";
} else if (r3 === 0 && r4 === 0 && (r5 !== 0 || r6 !== 0)) {
  valid = "რადგან სვეტი 3 და 4 არის 0, სვეტი 5 და 6-იც აუცილებლად უნდა იყოს 0";
} else if (r5 === 0 && r6 === 0 && (r3 !== 0 || r4 !== 0)) {
  valid = "გთხოვთ შეავსოთ სვეტი 5 და 6";
} else if (r3 === r4 && r5 !== r6) {
  valid =
    "რადგან სვეტი 3 უდრის სვეტ 4-ს, სვეტი 5 აუცილებლად უნდა უდრიდეს სვეტ 6-ს";
} else if (r5 === r6 && r3 !== r4) {
  valid =
    "რადგან სვეტი 5 უდრის სვეტ 6-ს, სვეტი 3 აუცილებლად უნდა უდრიდეს სვეტ 4-ს";
} else {
  valid = true;
}
