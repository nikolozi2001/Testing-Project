const enterpriseSurveyId = window.location.href.split("/").pop();
const url = `/api/enterprise/get-survey-page-show-param/${enterpriseSurveyId}`;
const key = `surveyPageShow_${enterpriseSurveyId}`;
show = false;

if (!window.enterprisePageShowMap) {
  window.enterprisePageShowMap = new Map();
}

if (!window.enterprisePageShowMap.has(key)) {
  $.ajax({
    url: "/api/enterprise/get-survey-page-show-param/" + enterpriseSurveyId,
    type: "GET",
    async: false,
    headers: { Authorization: localStorage.getItem("accessToken") },
    error: function (err) {
      throw new Error("Failed to fetch survey data");
    },
    success: function (response) {
      window.enterprisePageShowMap.set(key, response);
      console.log(response);
      
    },
  });
}

let value = window.enterprisePageShowMap.get(key).toString();

if (value === "3") {
  show = true;
} else {
  show = false;
}
