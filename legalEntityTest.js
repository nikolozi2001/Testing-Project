var modal = document.createElement("div");
modal.setAttribute("id", "customModal");
modal.style.display = "block";
modal.style.position = "fixed";
modal.style.left = "50%";
modal.style.top = "50%";
modal.style.transform = "translate(-50%, -50%)";
modal.style.zIndex = "1000";
modal.style.padding = "20px";
modal.style.backgroundColor = "#fff";
modal.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.2)";

let enterpriseSurveyId =
  window.location.href.split("/")[window.location.href.split("/").length - 1];

if (!window.enterpriseInfoMap) {
  window.enterpriseInfoMap = new Map();
}

if (!window.enterpriseInfoMap.has(enterpriseSurveyId)) {
  $.ajax({
    url:
      "/api/lib/enterprise-survey-info?enterpriseSurveyId=" +
      enterpriseSurveyId,
    type: "GET",
    dataType: "json",
    success: function (response) {
      window.enterpriseInfoMap.set(enterpriseSurveyId, response);
      displayModal(response);
    },
    error: function (error) {
      console.error("Failed to fetch enterprise survey info:", error);
    },
  });
} else {
  displayModal(window.enterpriseInfoMap.get(enterpriseSurveyId));
}

function displayModal(surveyData) {
  const orgName = surveyData["orgName"];
  const sidCode = surveyData["sidCode"];
  const year = surveyData["year"];
  const quarter = surveyData["quarter"];

  const interviewerCode =
    typeof data !== "undefined" ? data["page1icode"] : "N/A";
  const interviewerName =
    typeof data !== "undefined" ? data["page1ifname"] : "N/A";
  const interviewerLastName =
    typeof data !== "undefined" ? data["page1ilname"] : "N/A";

  var modalContent = document.createElement("div");
  modalContent.innerHTML = `
    <p>დასახელება: ${orgName}</p>
    <p>საიდენტიფიკაციო კოდი: ${sidCode}</p>
    <p>წელი: ${year}</p>
    <p>კვარტალი: ${quarter}</p>
    <p>ინტერვიუერის მონაცემები: ${interviewerCode}</p>
    <p>ინტერვიუერი: ${interviewerName} ${interviewerLastName}</p>
  `;

  var closeButton = document.createElement("button");
  closeButton.innerHTML = "დახურვა";
  closeButton.onclick = function () {
    document.body.removeChild(modal);
  };

  modal.appendChild(modalContent);
  modal.appendChild(closeButton);

  document.body.appendChild(modal);
}

return false;
