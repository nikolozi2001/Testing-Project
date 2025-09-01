if (data.page41210) {
  let grid = data.page41210;
  for (let i = 0; i < grid.length; i++) {
    if (
      (grid[i]["page41211"] && grid[i]["page41211"].length > 0) ||
      (grid[i]["page41212"] && grid[i]["page41212"].value) ||
      grid[i]["dataGrid3"] ||
      grid[i]["dataGrid4"] ||
      grid[i]["dataGrid5"] ||
      grid[i]["dataGrid6"] ||
      grid[i]["page41217"]
    ) {
      value = true;
      break;
    }
  }
}
