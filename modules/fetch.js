var id = window.location.href.split("/").pop();
var fieldKey = "averageNumberOfEmployeesAll";
var rowIndex = instance.rowIndex;

window.workSurvCache = window.workSurvCache || {
  data: {},
  loading: {},
};

var fetchData = function (surveyId, componentInstance) {
  if (
    window.workSurvCache.loading[surveyId] ||
    window.workSurvCache.data[surveyId]
  ) {
    return;
  }

  window.workSurvCache.loading[surveyId] = true;

  $.ajax({
    url: "/api/enterprise/prev-work-survey-data?enterpriseSurveyId=" + surveyId,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    success: function (res) {
      window.workSurvCache.data[surveyId] = res;
      window.workSurvCache.loading[surveyId] = false;

      setTimeout(function () {
        if (componentInstance) {
          componentInstance.updateValue();
        }
      }, 100);
    },
    error: function () {
      window.workSurvCache.data[surveyId] = [];
      window.workSurvCache.loading[surveyId] = false;
    },
  });
};

if (id && id.length > 5) {
  var cachedData = window.workSurvCache.data[id];

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
