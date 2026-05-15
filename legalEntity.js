let enterpriseSurveyId = window.location.href.split("/").pop();

show = !!data["p2t-6_18"];

if (
  window.enterpriseInfoMap &&
  window.enterpriseInfoMap.has(enterpriseSurveyId)
) {
  let enterpriseInfo = window.enterpriseInfoMap.get(enterpriseSurveyId);

  if (
    enterpriseInfo &&
    enterpriseInfo.legalFormType &&
    enterpriseInfo.legalFormType.id === 99
  ) {
    show = false;
  }
}
