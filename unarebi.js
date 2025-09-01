var authority = localStorage.getItem("authority");
var formview = sessionStorage.getItem("formview");

show = false;

if (authority !== "ENTERPRISE") {
  if (formview === "true") {
    show = false;
  } else {
    show = true;
  }
} else {
  show = false;
}

let m1 = row["pageVmonth420"];
let m2 = row["pageVmonthII420"];

if (m1 === m2) {
  valid = "აირჩიეთ განსხვავებული თვე";
} else {
  valid = true;
}
