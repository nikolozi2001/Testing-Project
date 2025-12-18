let fCountry;

const myArray = [];

console.log(myArray, "myArray");

const grid = data.page6DataGridUniversity;

grid.forEach((row) => {
  fCountry = row["page6DataGridUniversityCountry"];
  if (fCountry && !myArray.includes(fCountry)) {
    myArray.push(fCountry);
  }
});

value = myArray[0].label;
