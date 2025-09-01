const enterpriseSurveyId =
  window.location.href.split("/")[window.location.href.split("/").length - 1];
const url = `/api/report/export-work-survey-report-excel?enterpriseSurveyId=${enterpriseSurveyId}`;

fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/vnd.ms-excel",
    Authorization: localStorage.getItem("accessToken"),
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to download Excel");
    }
    return response.blob();
  })
  .then((blob) => {
    // Create a download link and trigger it
    const fileURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `WorkSurveyReport_${enterpriseSurveyId}.xlsx`;
    link.click();
    URL.revokeObjectURL(fileURL);
  })
  .catch((error) => {
    console.error("Error downloading Excel:", error);
    alert("Failed to download Excel. Please try again.");
  });
