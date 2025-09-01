const grid = data.page41256;

if (grid && Array.isArray(grid)) {
  const uniqueCombination = new Set();

  for (const row of grid) {
    const {
      page41259: avans_saxe,
      page41260: ararezident_sawarmo,
      page41261: valutaObj,
    } = row;

    if (!valutaObj || valutaObj.value === undefined) {
      valid = "ბოლო სტრიქონის ვალუტა ცარიელია";
      break;
    }

    const valuta = valutaObj.value;
    const combination = `${avans_saxe}-${ararezident_sawarmo}-${valuta}`;

    if (uniqueCombination.has(combination)) {
      valid = "ავანსის სახე, არარეზიდენტი საწარმო და ვალუტა დუბლირებულია";
      break;
    }

    uniqueCombination.add(combination);
  }
}
