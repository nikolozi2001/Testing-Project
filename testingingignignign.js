const p5radioArray = JSON.parse(sessionStorage.getItem("p5radioArray") || "[]");

// Check if any item in row.pageVEditGrid has pageV2Radio = 1
const hasPageV2Radio1 =
  row.pageVEditGrid &&
  row.pageVEditGrid.some(
    (item) => item.pageV2 && item.pageV2.pageV2Radio === 1
  );

if (p5radioArray.includes(1) || hasPageV2Radio1) {
  let sum = 0;

  if (sessionStorage.getItem("currencies")) {
    window.currencies = JSON.parse(sessionStorage.getItem("currencies"));
  } else {
    console.error("Currencies data is missing from sessionStorage.");
  }

  for (let i = 0; i < row.pageVEditGrid.length; i++) {
    const pageV = row.pageVEditGrid[i].pageV2;
    if (pageV["pageVPanelTable15538"]) {
      if (pageV["pageVPanel4"] && pageV["pageVPanel4"].value) {
        sum +=
          window.currencies[pageV["pageVPanel4"].value] *
          pageV["pageVPanelTable15538"];
      } else {
        sum += pageV["pageVPanelTable15538"];
      }
    }
  }

  value = sum === 0 ? "" : sum.toFixed(4);
} else {
  value = "";
}
