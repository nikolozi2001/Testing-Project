const enterpriseSurveyId = window.location.href.split("/").pop();

const reportUrl = `/api/report/export-work-survey-report-excel?enterpriseSurveyId=${enterpriseSurveyId}`;

window.location.href = reportUrl;




axiosHttp.post(`/api/report/export-work-survey-report-excel?enterpriseSurveyId`, submissionDto).then(function (response) {
 toast.success("წარმატებით დამახსოვრდა");
	
  })
  .catch(function (error) {
  toast.error("დაფიქსირდა შეცდომა");
	
  });