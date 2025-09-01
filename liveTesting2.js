const pStart200 = data["page2TableNumber4"];
const pEnd200 = parseInt(data["page2TableText2"]);

if (pStart200 || pEnd200) {
  function isEmpty(str) {
    return typeof str === "string" && !str.trim();
  }

  let concatFields = [];

  data.partniorDataGrid.forEach((item) => {
    const partnior = item["partnior"] ? item["partnior"].trim() : "";
    const page37 = item["page37"];

    console.log(`partnior: ${partnior}, page37: ${page37}`);

    if (
      !isEmpty(partnior) &&
      (isEmpty(page37) || (!isEmpty(page37) && page37 !== 1))
    ) {
      concatFields.push(partnior);
    }
  });

  console.log(concatFields, "concatFields");

  let uniqSelectFillMap = new Map();

  data.page13.forEach((item) => {
    const damfudznebeli =
      typeof item["page31"] === "string" ? item["page31"].trim() : "";
    console.log(`damfudznebeli: ${damfudznebeli}`);
    if (!isEmpty(damfudznebeli)) {
      uniqSelectFillMap.set(damfudznebeli, true);
    }
  });

  console.log(uniqSelectFillMap, "uniqSelectFillMap");

  let missingFounders = [];

  concatFields.forEach((field) => {
    if (!uniqSelectFillMap.has(field)) {
      missingFounders.push(field);
    }
  });

  console.log(missingFounders, "missingFounders");
  console.log(concatFields, "concatFields");

  if (missingFounders.length > 0) {
    let validText = missingFounders.join(", ");
    valid =
      "გთხოვთ შეავსოთ მონაცემები 200_3 ში ყველა დამფუძნებელზე: " + validText;
    console.log(valid);
  }
}
