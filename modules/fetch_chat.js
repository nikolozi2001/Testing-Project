var id = window.location.href.split("/").pop();
var fieldKey = "compensationOfEmployedPersonnelFemale";

window.workSurvData = window.workSurvData || {};
window.workSurvDataPromise = window.workSurvDataPromise || {};

function getWorkSurveyData(id) {
  if (window.workSurvData[id]) {
    return Promise.resolve(window.workSurvData[id]);
  }

  if (window.workSurvDataPromise[id]) {
    return window.workSurvDataPromise[id];
  }

  window.workSurvDataPromise[id] = fetch("/api/enterprise/prev-work-survey-data?enterpriseSurveyId=" + id, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": localStorage.getItem("accessToken"),
    }
  })
    .then(res => res.json())
    .then(data => {
      window.workSurvData[id] = data;
      return data;
    })
    .catch(() => {
      window.workSurvData[id] = [];
      return [];
    });

  return window.workSurvDataPromise[id];
}

value = 0;

if (id && typeof instance.rowIndex !== "undefined") {
  getWorkSurveyData(id).then(data => {
    var rowIndex = instance.rowIndex;
    var surveyRow = data[rowIndex];

    instance.setValue(
      surveyRow && surveyRow[fieldKey] != null
        ? surveyRow[fieldKey]
        : 0
    );
  });
}