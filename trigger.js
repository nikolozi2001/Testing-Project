function isEmpty(str) {
  return !str;
}

let mainGridMap = new Map();
let mainGrid = data.page3DataGrid || [];

mainGrid.forEach((item) => {
  let mainGridSelect = item["page3DataGridIscoGroup"];
  if (mainGridSelect && !isEmpty(mainGridSelect.label)) {
    mainGridMap.set(mainGridSelect.label, mainGridSelect.label);
  }
});

let secondGridMap = new Map();
let secondGrid = data.page3DataGrid2 || [];

if (secondGrid.length > 0) {
  secondGrid.forEach((item) => {
    let secondGridText = item["page3DataGrid2IscoGroup"];
    if (secondGridText && !isEmpty(secondGridText)) {
      secondGridMap.set(secondGridText, item);
    }
  });
}

let page3DataGrid2 = [];

mainGrid.forEach((item) => {
  let mainGridSelect = item["page3DataGridIscoGroup"];
  if (mainGridSelect && !isEmpty(mainGridSelect.label)) {
    let mainGridSelectLabel = mainGridSelect.label;
    let fullString = mainGridSelect.value + " " + mainGridSelectLabel;

    if (secondGridMap.has(mainGridSelectLabel)) {
      let secondGridItem = secondGridMap.get(mainGridSelectLabel);
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
      page3DataGrid2.push({
        page3DataGrid2IscoGroup: fullString,
      });
    }
  }
});

instance.setValue(page3DataGrid2);
