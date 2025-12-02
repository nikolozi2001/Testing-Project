let max = 0;
for (let i = 0; i < data.pageVEditGrid.length; i++) {
  let nomeri = data.pageVEditGrid[i]["pageV2"]["pageVPanelTable7"];

  if (parseFloat(nomeri) > max) {
    max = parseFloat(nomeri);
  }
}

value = max + 1;
