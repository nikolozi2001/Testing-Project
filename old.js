let grid = data.page41224;

if (grid) {
  let uniqueCombination = new Set();

  for (let i = 0; i < grid.length; i++) {
    const avs = grid[i]["page41226"];
    const page41228 = grid[i]["page41228"];
    const damfudznebeli = grid[i]["page41225"];

    if (page41228 && page41228.value !== undefined) {
      const valuta = page41228.value;
      const combination = `${avs}-${valuta}-${damfudznebeli}`;

      if (uniqueCombination.has(combination)) {
        valid = "ავანსის სახე, არარეზიდენტი ინვესტორი და ვალუტა დუბლირებულია";
        break;
      } else {
        uniqueCombination.add(combination);
      }
    } else {
      valid = "არასწორია";
      break;
    }
  }
}
