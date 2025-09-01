const sid = data["SID"];

let sidCode;

let codeArray = [];

for (let i = 0; i < data.page1EditGrid.length; i++) {
  sidCode = data.page1EditGrid[i]["sidCode"];
  codeArray.push(sidCode);
}

let maxNumber = 0;
let baseCode = "";

codeArray.forEach((code) => {
  const match = code.match(/^(.*)_(\d+)$/);
  if (match) {
    const number = parseInt(match[2], 10);
    if (number > maxNumber) {
      maxNumber = number;
      baseCode = match[1];
    }
  }
});

const nextNumber = `${baseCode}_${maxNumber + 1}`;

value = nextNumber;
