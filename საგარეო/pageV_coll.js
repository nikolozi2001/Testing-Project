const authority = sessionStorage.getItem("formview");

if (authority === "true") {
  data["testVariable"] = true;
} else {
  if (!data["testVariable"]) {
    data["testVariable"] = 2;
  }

  if (data["testVariable"] % 2 === 0) {
    data["pageVPanel9"] = true;
  } else {
    data["pageVPanel9"] = false;
  }

  var i = data["testVariable"];
  i += 1;

  data["testVariable"] = i;
}
