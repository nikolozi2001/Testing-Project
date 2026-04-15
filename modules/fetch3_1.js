var id = window.location.href.split("/").pop();
var fieldKey = "compensationOfEmployedPersonnelFemale";

window.workSurvData = window.workSurvData || {};

if (id && !window.workSurvData[id]) {
  $.ajax({
    url: "/api/enterprise/prev-work-survey-data?enterpriseSurveyId=" + id,
    method: "GET",
    async: false,
    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    success: function (res) {
      window.workSurvData[id] = res;
      console.log("workSurvData API response [id=" + id + "]:", res);
    },
    error: function () {
      window.workSurvData[id] = [];
    },
  });
}

var rowIndex = instance.rowIndex;
var surveyRow = id && window.workSurvData[id] && window.workSurvData[id][rowIndex];

value = (typeof rowIndex !== "undefined" && surveyRow && surveyRow[fieldKey] != null)
  ? surveyRow[fieldKey]
  : 0;
