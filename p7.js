let numId;
let radioArray = [];

const grid = data.pageVEditGrid;

for (let i = 0; i < grid.length; i++) {
  numId = grid[i].pageV2["pageV2Radio"];
  radioArray.push(numId);
}

sessionStorage.setItem("p5radioArray", JSON.stringify(radioArray));
