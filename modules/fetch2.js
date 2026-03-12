var id = window.location.href.split("/").pop();

window.workSurvData = window.workSurvData || {};

if (!window.workSurvData[id]) {
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
    }
  });
}

value = window.workSurvData[id]?.[0]?.compensationOfEmployedPersonnelFemale;