var authority = localStorage.getItem("authority");
show = false;

if (authority !== "ENTERPRISE") {
  show = true;
} else {
  show = false;
}
