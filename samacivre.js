let sum = 0;
let n322;

for (let i = 0; i < data.page2DataGrid.length; i++) {
    n322 = parseFloat(data.page2DataGrid[i]["page23_2_2"]);

    if (n322) {
        sum += n322;
    }
}

let p1n2 = data["page1IndexValue2"];

if (p1n2 > 0) {
    if (sum >= 0) {
        valid = true;
    } else {
        valid = "3.2.2 სვეტი მეტი უნდა იყოს 0-ზე";
    }
}
