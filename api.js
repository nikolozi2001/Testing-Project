let enterpriseSurveyId =
  window.location.href.split("/")[window.location.href.split("/").length - 1];
if (!window.currencies) {
  $.ajax({
    url:
      "/api/lib/enterprise-survey-info?enterpriseSurveyId=" +
      enterpriseSurveyId,
    type: "GET",
    dataType: "json",
    async: false,
    success: function (response) {
      window.currencies = response;
    },
  });
}

let finalData = window.currencies;

value = finalData.year;
