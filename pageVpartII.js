if (
  row["pageVPanelTableDay"] !== undefined &&
  row["pageVPanelTableDay"] < row["pageVPanelPanelColumns416"] !== undefined &&
  row["pageVPanelPanelColumns416"]
) {
  valid = true;
} else {
  valid = false;
}

const currentDate = new Date();
const currentDateOptions = { year: "numeric", month: "numeric" };
const formattedDate = currentDate.toLocaleDateString(
  "en-US",
  currentDateOptions
);

const loanTakingDate = row["pageVPanelTableDay"];
console.log("loanTakingDate: ", loanTakingDate, typeof loanTakingDate);
const newFormatFormattedDate = "00/0" + formattedDate;
console.log("formattedDate: ", newFormatFormattedDate, typeof formattedDate);

if (currentDate > loanTakingDate) {
  valid = "შეამოწმეთ კვარტალი";
} else {
  console.log("No discrepancy.");
}

if (currentDate === loanTakingDate) {
  console.log("Strings are equal.");
} else {
  console.log("Strings are not equal.");
}
