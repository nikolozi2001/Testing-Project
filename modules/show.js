var viewmode = sessionStorage.getItem("viewmode");
var show = false;

if (viewmode === "true") {
  show = false;
} else {
  show = true;
}

// valid = true; // ყველა row ვალიდური იქნება ამამ ეტაპზე

// // ვამოწმებთ კონკრეტულ row-ს ვალიდურობას
// instance.rows.forEach((row, index) => {
//   var allFieldsValid = instance.checkRowValidity(row, true);
//   if (!allFieldsValid) {
//     valid = false; // თუ რომელიმე row არ ვალიდურია
//   }
// });
