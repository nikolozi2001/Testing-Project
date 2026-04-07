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

const getLabelByKey = (components, targetKey) => {
  let foundLabel = null;

  const walk = (comps) => {
    if (!Array.isArray(comps)) return;

    for (const comp of comps) {
      if (comp.key === targetKey && comp.label) {
        foundLabel = comp.label;
        return;
      }

      if (comp.type === "table" && comp.rows) {
        comp.rows.forEach((row) => {
          row.forEach((cell) => {
            walk(cell.components);
          });
        });
      }

      if (comp.components) {
        walk(comp.components);
      }

      if (foundLabel) return;
    }
  };

  walk(components);
  return foundLabel || targetKey;
};

// Validate only saved rows
if (Array.isArray(data["page1EditGrid"])) {
  data["page1EditGrid"].forEach((rowData, rowIndex) => {
    let allFilled = true;
    let firstEmptyLabel = null;

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

            if (!firstEmptyLabel) {
              firstEmptyLabel = getLabelByKey(form.components, key);
            }

            console.log(
              `სტრიქონი ${rowIndex + 1}-ში ველი "${firstEmptyLabel}" არ არის შევსებული`,
            );
          }
        }
      }
    }

    if (!allFilled) {
      const sidCode = rowData.sidCode || "უცნობი SID";

      valid = `SID: ${sidCode} (სტრიქონი ${rowIndex + 1}) - ველი "${firstEmptyLabel}" ცარიელია. ყვითელ ფანქარზე დაჭერით შეავსეთ ფილიალის მონაცემები`;
    }
  });
}
