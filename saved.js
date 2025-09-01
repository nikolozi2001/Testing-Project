valid = true;

// Function to check if a value is empty
const isEmpty = (value) => {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

// Validate only saved rows
if (Array.isArray(data["page1EditGrid"])) {
  data["page1EditGrid"].forEach((rowData, rowIndex) => {
    let allFilled = true;

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        const value = rowData[key];
        if (
          key !== "page1Table2AreaIDd" &&
          key !== "page1Table2Satao" &&
          key !== "page1Table2AreaIDc" &&
          key !== "sidCode"
        ) {
          if (isEmpty(value)) {
            allFilled = false;
            console.log(`Field ${key} is not filled in row ${rowIndex + 1}`);
          }
        }
      }
    }

    if (!allFilled) {
      valid = `სტრიქონი ${
        rowIndex + 1
      } ცარიელია. ყვითელ ფანქარზე დაჭერით შეავსეთ ფილიალის მონაცემები`;
    }
  });
}

// Debugging output
// console.log("Saved EditGrid rows:", data["page1EditGrid"]);
// console.log("Validation status:", valid);

// if (valid === true) {
//   console.log("All fields are correctly filled.");
// } else {
//   console.log("Validation error:", valid);
// }

// ---------------------------------------------------------------------------------------------------------------

let editGridKey = "page2EditGridMain"; // Replace with the actual key of your Edit Grid component
let editGridComponent = form.getComponent(editGridKey);

if (editGridComponent) {
  // Check if the Edit Grid has unsaved rows or is in a collapsed state
  const hasUnsavedRows = editGridComponent.editRows.some(
    (row) => row.state === "editing"
  );

  if (hasUnsavedRows) {
    // Display an error message if there are unsaved rows
    toast.error(
      "გთხოვთ შეავსოთ ან შეინახოთ ფორმისს ჩანაწერები, სანამ გააგრძელებთ."
    );
  } else if (editGridComponent.collapsed) {
    // Check if the Edit Grid is collapsed
    toast.error(
      "გთხოვთ გახსნათ და შეამოწმოთ ფორმისს ჩანაწერები, სანამ გააგრძელებთ."
    );
  } else {
    // Proceed only if all rows are saved and Edit Grid is not collapsed
    let submissionDto = {
      submissionJson: JSON.stringify(data),
      enterpriseSurveyId:
        window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ],
    };

    axiosHttp
      .post(`/api/enterprise/save-survey`, submissionDto)
      .then(function (response) {
        toast.success("წარმატებით დამახსოვრდა");
      })
      .catch(function (error) {
        toast.error("დაფიქსირდა შეცდომა");
      });
  }
} else {
  toast.error("ფორმის კომპონენტი ვერ მოიძებნა.");
}

// --------------------------------------------------------------------------------

let sum = 0;

let grid = data.page2Table6DataGrid;

for (let i = 0; i < grid.length; i++) {
  let row = grid[i];

  preValue = row.page2Table6str4_cv1;

  if (preValue) {
    sum += preValue;
  }
}

value = sum === 0 ? "" : sum;

// --------------------------------------------------------------------------------

let sum = 0;
for (let i = 36; i <= 168; i += 4) {
  let preValue = parseFloat(data[`page7Table3Number${i}`]);
  if (isNaN(preValue)) {
    preValue = 0;
  }
  sum += preValue;
}

sum = sum.toFixed(2);

value = sum === 0 ? "" : sum;

// --------------------------------------------------------------------------------

// Logic to set the title of the form from the first row of the data grid

const grid = data.page1DataGrid;
let titles = ["main page"];
if (grid) {
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    const newTitle = row.page1Name;
    if (newTitle) {
      titles.push(newTitle);
      localStorage.setItem("formioSavedTitles", JSON.stringify(titles));
      result = true;
    } else {
      result = false;
    }
  }
}

// Action: Save

const savedTitle = localStorage.getItem("formioSavedTitles");
if (savedTitle) {
  const parsedTitles = JSON.parse(savedTitle);
  const components = instance.root.components;
  for (let i = 0; i < components.length; i++) {
    components[i].component.title = parsedTitles[i];
  }
}

// ---------------------------------------------------------------------------------------------------------------

let grid = data.page41213;

if (grid) {
  let uniqueCombination = new Set();

  for (let i = 0; i < grid.length; i++) {
    const page41215 = grid[i]["page41215"];
    const damfudznebeli = grid[i]["page41214"];

    if (page41215 && page41215.value !== undefined) {
      const valuta = page41215.value;
      const combination = `${valuta}-${damfudznebeli}`;

      if (uniqueCombination.has(combination)) {
        valid = "დამფუძნებელი და ვალუტა დუბლირებულია";
        break;
      } else {
        uniqueCombination.add(combination);
      }
    } else {
      valid = "გთხოვთ შეავსოთ ბოლო ვალუტა";
      break;
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------

// Get values from row
const p500kv4 = parseFloat(row["pageVPanelTable12Columns2"] || 0);
const p500kv3 = parseFloat(row["pageVPanelTable12IiiIv"] || 0);
const p520 = parseFloat(row["pageVPanelTable12Iv"] || 0);
const p522 = parseFloat(row["pageVPanelTable12Number4"] || 0);
const p530 = parseFloat(row["pageVPanelTable10Iv"] || 0);
const p531 = parseFloat(row["pageVPanelTable10Iv2"] || 0);
const p532 = parseFloat(row["pageVPanelTable10Number4"] || 0);
const p534 = parseFloat(row["pageVPanelTable10Number8"] || 0);
const p536 = parseFloat(row["pageVPanelTable10Number12"] || 0);
const p549_1 = parseFloat(row["pageVTableNumber8"] || 0);
const p564_1 = parseFloat(row["pageVPanelTable11Number8"] || 0);
const p570 = parseFloat(row["pageVPanelTable12Number32"] || 0);
const p500_3 = parseFloat(row["pageVPanelTable12Number36"] || 0);

let sum = 0;

// Helper function to add/subtract values to sum
function addToSum(value, operation) {
  if (!isNaN(value) && typeof value === "number") {
    if (operation === "add") {
      sum += value;
    } else if (operation === "subtract") {
      sum -= value;
    }
  }
}

// Adding values to sum
if (p500kv3) addToSum(p500kv3, "add");
if (p520) addToSum(p520, "add");
if (p522) addToSum(p522, "subtract");
if (p530) addToSum(p530, "add");
if (p531) addToSum(p531, "subtract");
if (p532) addToSum(p532, "subtract");
if (p534) addToSum(p534, "subtract");
if (p536) addToSum(p536, "subtract");
if (p549_1) addToSum(p549_1, "add");
if (p564_1) addToSum(p564_1, "add");
if (p570) addToSum(p570, "add");
if (p500_3) addToSum(p500_3, "add");

// Safe rounding of the sum
try {
  if (typeof sum === "number" && !isNaN(sum)) {
    sum = parseFloat(sum.toFixed(2));
  } else {
    sum = 0;
  }
} catch (error) {
  sum = 0;
}

// Safe calculation of alertNumber
let alertNumber = 0;
try {
  if (typeof p500kv4 === "number" && typeof sum === "number") {
    alertNumber = parseFloat((p500kv4 - sum).toFixed(2));
  }
} catch (error) {
  // Handle error silently
}

// Validation
if (sum !== p500kv4) {
  valid = "გადაამოწმეთ სესხის თანხები " + alertNumber;
}

