const p5radioArray = JSON.parse(sessionStorage.getItem("p5radioArray") || "[]");

console.log(p5radioArray, "p5radioArray");


if (p5radioArray.includes(1)) {

  console.log("I'm here");
  

  let sum = 0;

  if (sessionStorage.getItem("currencies")) {
    window.currencies = JSON.parse(sessionStorage.getItem("currencies"));
  } else {
    console.error("Currencies data is missing from sessionStorage.");
  }

  for (let i = 0; i < row.pageVEditGrid.length; i++) {
    if (row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"]) {
      if (
        row.pageVEditGrid[i].pageV2["pageVPanelTable13"] &&
        row.pageVEditGrid[i].pageV2["pageVPanelTable13"].value
      ) {
        sum +=
          window.currencies[
            row.pageVEditGrid[i].pageV2["pageVPanelTable13"].value
          ] * row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"];
      } else {
        sum +=
          row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"];
      }
    }
  }

  value = sum === 0 ? "" : sum.toFixed(4);
} else {
  value = "";
}
