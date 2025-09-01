let uniquePNames = new Set();

for (let i = 0; i < data.page1DataGrid2.length; i++) {
  const pName = data.page1DataGrid2[i]["page1DataGridIscoGroup"].value;

  if (uniquePNames.has(pName)) {
    valid = "დასახელება დუბლირებულია";
    break;
  } else {
    uniquePNames.add(pName);
  }
}

let unique = [];
const select = row["page1DataGridIscoGroup"].value;
unique.push(select);

if (unique.includes(select)) {
  valid = "დასახელება უკვე არჩეულია";
} else {
  valid = true;
}

// გთხოვთ აირჩიეთ შესაბამისი პროფესიული ჯგუფები და 1.1-ში ჩაწერეთ დასაქმებულთა რაოდენობა 2024 წლის ან/და 2023 წლის 1 სექტემბრის მდგომარეობით.

// -----------------------------------------
// Initialize an array to track selected values
var selectedValues = [];
var isDuplicate = false;

data.page1DataGrid2.forEach(function (row, index) {
  if (selectedValues.includes(row.page1DataGridIscoGroup.value)) {
    isDuplicate = true;
  } else {
    selectedValues.push(row.page1DataGridIscoGroup.value);
  }
});

if (isDuplicate) {
  valid = "დასახელება უკვე არჩეულია";
} else {
  valid = true;
}

// ------------------------------------------------------------

var selectedValues = [];
var duplicates = new Map();

data.page1DataGrid2.forEach(function (row, index) {
  const selectValue = row.page1DataGridIscoGroup.value;

  if (selectedValues.includes(selectValue)) {
    duplicates.set(index, selectValue);
  } else {
    selectedValues.push(selectValue);
  }
});

if (duplicates.size > 0) {
  data.page1DataGrid2.forEach(function (row, index) {
    if (duplicates.has(index)) {
      const duplicateValue = duplicates.get(index);
      valid = `გთხოვთ გაასწორეთ დუბლირებულ ჩანაწერი ${duplicateValue}`;
    }
  });
} else {
  valid = true;
}
