var selectedValues = [];
var duplicates = new Map();

data.page41300.forEach(function (row, index) {
  const selectValue = row.page41304?.label?.trim();
  let country = row.page41301?.label?.trim();

  if (country) {
    country = country.replace(/\s\d+$/, "");
  }

  if (selectValue && country) {
    const currency = selectValue.split(" ");
    const currencyCode = currency[0].toUpperCase();
    const normalizedCountry = country.toUpperCase();

    const key = `${normalizedCountry}-${currencyCode}`;

    if (selectedValues.includes(key)) {
      duplicates.set(index, { country, currencyCode });
    } else {
      selectedValues.push(key);
    }
  }
});

if (duplicates.size > 0) {
  let duplicateMessages = [];

  duplicates.forEach((value, index) => {
    duplicateMessages.push(
      `ჩანაწერი ნომერი ${index + 1}: ქვეყანა - ${value.country}, ვალუტა - ${
        value.currencyCode
      }`
    );
  });

  valid = `გთხოვთ გაასწორეთ დუბლირებული ჩანაწერები:\n${duplicateMessages.join(
    "\n"
  )}`;
} else {
  valid = true;
}
