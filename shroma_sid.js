const dg_length = data.page1EditGrid.length;
// console.log("dg_length:", dg_length);

const sid = data["SID"];
// console.log("SID:", sid);

function handleNewEnterprise(sid) {
  // console.log("Handling new enterprise");
  // console.log("Generated sidCode:", sid);
  return sid;
}

function handleExistingEnterprise(data, sid) {
  // console.log("Handling existing enterprise");

  let codeArray = [];
  for (let i = 0; i < data.page1EditGrid.length; i++) {
    let sidCode = data.page1EditGrid[i]["sidCode"];
    // console.log(`sidCode at index ${i}:`, sidCode);
    if (!sidCode) {
      sidCode = `${sid}_${i + 1}`;
      // console.log(`Generated new sidCode at index ${i}:`, sidCode);
    }
    codeArray.push(sidCode);
  }

  // console.log("codeArray:", codeArray);

  let maxNumber = 0;
  let baseCode = sid;

  codeArray.forEach((code) => {
    // console.log("Processing code:", code);
    const match = code.match(/^(.*)_(\d+)$/);
    if (match) {
      const number = parseInt(match[2], 10);
      // console.log("Matched number:", number);
      if (number > maxNumber) {
        maxNumber = number;
        // console.log("New maxNumber:", maxNumber);
      }
    }
  });

  const nextNumber = `${baseCode}_${maxNumber + 1}`;
  // console.log("Next number:", nextNumber);

  return nextNumber;
}

if (dg_length === 0) {
  value = handleNewEnterprise(sid);
} else {
  value = handleExistingEnterprise(data, sid);
}

// console.log("Final value:", value);
