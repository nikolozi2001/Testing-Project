let grid = data.page2EditGridMain;

for (let i = 0; i < grid.length; i++) {
  let uniquePNames = new Set();

  let childgrid = grid[i]["page2EditGridMain221"];

  for (let j = 0; j < childgrid.length; j++) {
    let variable = childgrid[j]["page2EditGridMain222"];

    if (variable && uniquePNames.has(variable)) {
      valid = "მიწათსარგებლობის ტიპი დუბლირებულია";
      console.log(valid);
    } else {
      uniquePNames.add(variable);
    }
  }
}
