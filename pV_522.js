const p5radioArray = JSON.parse(sessionStorage.getItem("p5radioArray") || "[]");

console.log(row.pageVEditGrid, "row.pageVEditGrid");
console.log("instance:", instance["pageVEditGrid"]);

// Check if any item in row.pageVEditGrid has pageV2Radio = 1
const hasPageV2Radio1 = row.pageVEditGrid && row.pageVEditGrid.some(item => 
  item.pageV2 && item.pageV2.pageV2Radio === 1
);

if (p5radioArray.includes(1) || hasPageV2Radio1) {
  let sum = 0;

  if (sessionStorage.getItem("currencies")) {
    window.currencies = JSON.parse(sessionStorage.getItem("currencies"));
  } else {
    console.error("Currencies data is missing from sessionStorage.");
  }

  for (let i = 0; i < row.pageVEditGrid.length; i++) {
    // Process items that have pageV2Radio = 1
    if (row.pageVEditGrid[i].pageV2 && row.pageVEditGrid[i].pageV2.pageV2Radio === 1) {
      console.log(`Processing item ${i} with pageV2Radio = 1`);
      
      if (row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"]) {
        if (
          row.pageVEditGrid[i].pageV2["pageVPanelTable13"] &&
          row.pageVEditGrid[i].pageV2["pageVPanelTable13"].value
        ) {
          const currencyRate = window.currencies[
            row.pageVEditGrid[i].pageV2["pageVPanelTable13"].value
          ];
          const amount = row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"];
          const convertedAmount = currencyRate * amount;
          
          console.log(`Converting: ${amount} with currency ${row.pageVEditGrid[i].pageV2["pageVPanelTable13"].label} (rate: ${currencyRate}) = ${convertedAmount}`);
          sum += convertedAmount;
        } else {
          sum += row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"];
          console.log(`Adding directly: ${row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"]}`);
        }
      }
    }
    // Also process original logic for backward compatibility
    
  }

  console.log(`Total calculated sum: ${sum}`);
  value = sum === 0 ? "" : sum.toFixed(4);
} else {
  value = "";
}
