const currentValue = sessionStorage.getItem("p5radio");

if (parseFloat(currentValue) === 1) {
  let sum = 0;

  let enterpriseSurveyId =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
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
        sum += row.pageVEditGrid[i].pageV2["pageVPanelTable12522522524526528"];
      }
    }
  }

  value = sum === 0 ? "" : sum.toFixed(4);
} else {
  value = "";
}
