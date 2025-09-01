let grid = data.page25;

if (grid) {
  let uniqueCombination = new Set();

  for (let i = 0; i < grid.length; i++) {
    const valuta = grid[i]["page26"].value;
    const combination = `${valuta}`;

    if (uniqueCombination.has(combination)) {
      valid = "ვალუტა დუბლირებულია";
      break;
    } else {
      uniqueCombination.add(combination);
    }
  }
}
