var id = window.location.href.split("/").pop();
var fieldKey = "shipmentTransportType";
var rowIndex = instance.rowIndex;

window.requiredSurv = window.requiredSurv || {
  data: {},
  loading: {},
};

var fetchData = function (surveyId, componentInstance) {
  if (
    window.requiredSurv.loading[surveyId] ||
    window.requiredSurv.data[surveyId]
  ) {
    return;
  }

  window.requiredSurv.loading[surveyId] = true;

  $.ajax({
    url: "/api/enterprise/get-survey-page-show-param/=" + surveyId,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    success: function (res) {
      window.requiredSurv.data[surveyId] = res;
      window.requiredSurv.loading[surveyId] = false;

      setTimeout(function () {
        if (componentInstance) {
          componentInstance.updateValue();
        }
      }, 100);
    },
    error: function () {
      window.requiredSurv.data[surveyId] = [];
      window.requiredSurv.loading[surveyId] = false;
    },
  });
};


console.log(window.requiredSurv.data[id]);


if (id && id.length > 5) {
  var cachedData = window.requiredSurv.data[id];

  if (cachedData) {
    var surveyRow = cachedData[rowIndex];
    value =
      surveyRow && typeof surveyRow[fieldKey] !== "undefined"
        ? surveyRow[fieldKey]
        : 0;
  } else {
    fetchData(id, instance);
    value = 0;
  }
} else {
  value = 0;
}
