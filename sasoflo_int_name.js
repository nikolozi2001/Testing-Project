let code = data["page1icode"];

if (!code) {
  return;
}

if (!window.interviewerInfoMap) {
  window.interviewerInfoMap = new Map();
}

if (!window.interviewerInfoMap.has(code)) {
  $.ajax({
    url: "/api/interviewer/get-by-id?id=" + code,
    type: "GET",
    dataType: "json",
    async: false,
    success: function (response) {
      if (response && response.firstName) {
        window.interviewerInfoMap.set(code, response);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching interviewer data:", status, error);
    },
  });
}

const interviewerData = window.interviewerInfoMap.get(code);
if (interviewerData && interviewerData.firstName) {
  value = interviewerData.firstName;
} else {
  value = "N/A";
}
