var id = window.location.href.split("/").pop();
window.requiredSurv = window.requiredSurv || { data: {} };

if (id && id.length > 5 && !window.requiredSurv.data[id]) {
  $.ajax({
    url: "/api/enterprise/get-survey-page-show-param/" + id,
    method: "GET",
    async: false,
    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    success: function (res) {
      window.requiredSurv.data[id] = res;
    },
    error: function () {
      window.requiredSurv.data[id] = "error";
    },
  });
}

var cachedData = window.requiredSurv.data[id];
var status = String(cachedData?.pageShowParam || cachedData);
var grid = data.page2EditGrid_collapsed || [];
const note = data['page4']

var hasTransport = grid.some(function(row) {
    var transport = row.page2EditGridTable?.shipmentTransportType?.value || row.shipmentTransportType;
    return !!transport;
});

var hasNote = note && note.trim() !== "";
console.log("Has Note:", hasNote);


result = ( (status === "3" || status === "2") && !hasTransport && !hasNote );


console.log("Status:", status);
console.log("Has Transport:", hasTransport);
console.log("Note:", note);
console.log("Result (Is Required?):", result);