
let enterpriseSurveyId =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
    $.ajax({
        url: "/api/survey/enterprise-survey-interviewer-info?enterpriseSurveyId=" + enterpriseSurveyId,
        type: "GET",
		   headers: {
        'Authorization':localStorage.getItem("accessToken")
    },
        dataType: "json",
        async: false,
        success: function(response) {
          var opts = [];
          if (response.interviewer) {
            opts.push(response.interviewer);
          }
          if (response.supervisors && response.supervisors.length) {
            opts = opts.concat(response.supervisors);
          }
          values = opts;
        },
    });
