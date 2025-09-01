let str1;
let str2;

let info1 = [];
let info2 = [];

console.log("Extracting values from data.page3DataGrid3:");

// Extract values from data.page3DataGrid3
for (let j = 0; j < data.page3DataGrid3.length; j++) {
  str1 = data.page3DataGrid3[j]["page3DataGrid3Cv_2"];
  info2.push(str1);
  console.log(`Row ${j} - info2 value:`, str1);
}

console.log("Extracting values from data.page3DataGrid:");

// Extract values from data.page3DataGrid
for (let i = 0; i < data.page3DataGrid.length; i++) {
  str2 = data.page3DataGrid[i]["page3DataGridCv-2"];
  info1.push(str2);
  console.log(`Row ${i} - info1 value:`, str2);
}

// Add the last value of str1 to info2 to match lengths
info2.push(str1);
console.log("Final info2 array after adding last str1 value:", info2);

let validations = [];

console.log("Validating each pair of values:");

// Validate each pair of values
for (let n = 0; n < Math.min(info1.length, info2.length); n++) {
  const isValid = info1[n] >= info2[n];
  validations.push(isValid);
  console.log(`Validation for Row ${n} - info1: ${info1[n]}, info2: ${info2[n]}, Valid: ${isValid}`);
}

console.log("Setting validation result for each row:");

// Set validation result for each row
for (let i = 0; i < validations.length; i++) {
  if (validations[i] === false) {
    data.page3DataGrid[i].valid = false;
    console.log(`Row ${i} is invalid.`);
  } else {
    data.page3DataGrid[i].valid = true;
    console.log(`Row ${i} is valid.`);
  }
}

// Set overall validation message
if (validations.includes(false)) {
  valid =
    "3.2.1-ის მე-2 სვეტში მითითებული მნიშვნელობა ნაკლები ან ტოლი უნდა იყოს 3.1.1-ის მე-2 სვეტში მითითებულ მნიშვნელობაზე ყველა პროფესიული ჯგუფისათვის.";
  console.log("Validation failed. Setting validation message:", valid);
} else {
  valid = true;
  console.log("All rows are valid.");
}

console.log("Final Validation Result:", valid);
