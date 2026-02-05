var authority = localStorage.getItem("authority");
console.log(authority);

result = false;

if (authority == "ENTERPRISE") {
  result = true;
} else {
  result = false;
}
