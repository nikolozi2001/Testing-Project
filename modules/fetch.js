const enterpriseSurveyId = window.location.href.split("/").pop();
const url = `/api/enterprise/prev-work-survey-data?enterpriseSurveyId=${enterpriseSurveyId}`;

console.log("Enterprise Survey ID:", enterpriseSurveyId);
console.log("Fetching data from URL:", url);

let workSurvData = null;

fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: localStorage.getItem("accessToken"),
  },
  dataType: "json",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch currency data");
    }
  })
  .then((data) => {
    workSurvData = data;
    window.workSurvData = data;

    console.log("workSurvData:", workSurvData);
    console.log("First row:", workSurvData[0]);
    console.log("Rows with sidCode:", workSurvData.filter((d) => d.sidCode !== ""));
  })
  .catch((error) => {
    console.error(error.message);
  });
