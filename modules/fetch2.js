var id = window.location.href.split("/").pop();

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
    },
    error: function() {
      window.workSurvData[id] = "ERROR"; 
    }
  });
}

if (window.workSurvData[id] && window.workSurvData[id] !== "ERROR") {
  value = window.workSurvData[id]?.[0]?.compensationOfEmployedPersonnelFemale || 0;
} else {
  value = 0;
}