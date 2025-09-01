// Function to check if a string is empty
function isEmpty(str) {
  return !str;
}

// Initialize Maps to store unique elements from grids
let mainGridMap = new Map();
let secondGridMap = new Map();

// Retrieve mainGrid and secondGrid data, with default values as empty arrays
let mainGrid = data.page3DataGrid || [];
let secondGrid = data.page3DataGrid2 || [];

// Debugging: Log the initial data
console.log("Initial mainGrid:", mainGrid);
console.log("Initial secondGrid:", secondGrid);

// Populate mainGridMap with items from mainGrid
mainGrid.forEach((item) => {
  let mainGridSelect = item["page3DataGridIscoGroup"];
  if (mainGridSelect && !isEmpty(mainGridSelect.label)) {
    mainGridMap.set(mainGridSelect.label, mainGridSelect.label);
  }
});

// Debugging: Log the populated mainGridMap
console.log("Populated mainGridMap:", mainGridMap);

// Populate secondGridMap with items from secondGrid
if (secondGrid.length > 0) {
  secondGrid.forEach((item) => {
    let secondGridText = item["page3DataGrid2IscoGroup"];
    if (secondGridText && !isEmpty(secondGridText)) {
      secondGridMap.set(secondGridText, item);
    }
  });
}

// Debugging: Log the populated secondGridMap
console.log("Populated secondGridMap:", secondGridMap);

let page3DataGrid2 = [];

// Process mainGrid and match with secondGridMap to populate page3DataGrid2
mainGrid.forEach((item) => {
  let mainGridSelect = item["page3DataGridIscoGroup"];

  // Debugging: Log each item from mainGrid and its mainGridSelect
  console.log("Processing mainGrid item:", item);
  console.log("mainGridSelect:", mainGridSelect);

  if (mainGridSelect && !isEmpty(mainGridSelect.label)) {
    let mainGridSelectLabel = mainGridSelect.label;
    let fullString = mainGridSelect.value + " " + mainGridSelectLabel;

    if (secondGridMap.has(mainGridSelectLabel)) {
      let secondGridItem = secondGridMap.get(mainGridSelectLabel);

      // Debugging: Log matching secondGridItem
      console.log(
        "Match found in secondGridMap for label:",
        mainGridSelectLabel
      );
      console.log("Matching secondGridItem:", secondGridItem);

      page3DataGrid2.push({
        page3DataGrid2IscoGroup: fullString,
        "page3DataGrid2Cv-1": secondGridItem["page3DataGrid2Cv-1"],
        "page3DataGrid2Cv-2": secondGridItem["page3DataGrid2Cv-2"],
        "page3DataGrid2Cv-3": secondGridItem["page3DataGrid2Cv-3"],
        "page3DataGrid2Cv-4": secondGridItem["page3DataGrid2Cv-4"],
        "page3DataGrid2Cv-5": secondGridItem["page3DataGrid2Cv-5"],
        "page3DataGrid2Cv-6": secondGridItem["page3DataGrid2Cv-6"],
        "page3DataGrid2Cv-7": secondGridItem["page3DataGrid2Cv-7"],
        "page3DataGrid2Cv-8": secondGridItem["page3DataGrid2Cv-8"],
        page3cv3_1_3other: secondGridItem["page3cv3_1_3other"],
      });
    } else {
      // Debugging: Log case where no match is found
      console.log(
        "No match found in secondGridMap for label:",
        mainGridSelectLabel
      );

      page3DataGrid2.push({
        page3DataGrid2IscoGroup: fullString,
      });
    }
  }
});

// Final debugging: Log the output grid
console.log("Final page3DataGrid2:", page3DataGrid2);

// Set the value of the instance with the final grid
instance.setValue(page3DataGrid2);
