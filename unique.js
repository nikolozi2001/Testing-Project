var selectedValues = [];
var duplicates = new Map();

data.editGrid1.forEach(function (row, index) {
  const selectValue = row.saqmianobis_saxe.label.trim();
  
  if (selectValue) {
    const currency = selectValue.split(" ");
    const currencyCode = currency[0].toUpperCase();

    const key = currencyCode;

    if (selectedValues.includes(key)) {
      duplicates.set(index, { currencyCode });
    } else {
      selectedValues.push(key);
    }
  }
});

if (duplicates.size > 0) {
  let duplicateMessages = [];

  duplicates.forEach((value, index) => {
    duplicateMessages.push(
      `ჩანაწერი ნომერი ${index + 1}: საქმიანობის სახე - ${value.currencyCode}`
    );
  });

  valid = `გთხოვთ გაასწორეთ დუბლირებული ჩანაწერები:\n${duplicateMessages.join(
    "\n"
  )}`;
} else {
  valid = true;
}
