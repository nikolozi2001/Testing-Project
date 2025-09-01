if (data.pageVEditGrid) {
  let grid = data.pageVEditGrid;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i]["pageV2"]["pageV2Radio"]) {
      value = true;
      break;
    }
  }
}
