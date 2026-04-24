async function checkSurveyValidity() {
  const pathParts = window.location.pathname.split("/").filter((p) => p !== "");
  const enterpriseSurveyId = pathParts[pathParts.length - 1];

  const key = `surveyPageShow_${enterpriseSurveyId}`;

  if (!window.enterprisePageShowMap) {
    window.enterprisePageShowMap = new Map();
  }

  if (!window.enterprisePageShowMap.has(key)) {
    try {
      const response = await fetch(
        `/api/enterprise/get-survey-page-show-param/${enterpriseSurveyId}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      window.enterprisePageShowMap.set(key, data);
    } catch (err) {
      console.error("Error fetching survey data:", err);
      instance.setValue(false);
      return;
    }
  }

  const value = String(window.enterprisePageShowMap.get(key));
  const isValid = value !== "2";

  instance.setValue(isValid);
}

checkSurveyValidity();