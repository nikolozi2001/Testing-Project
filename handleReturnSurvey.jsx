const handleReturnSurvey = async (enterpriseSurveyId) => {
  setLoading(true);
  try {
    const response = await EnterpriseService.surveyReturn(enterpriseSurveyId);
    toast.success("კითხვარი დაბრუნდა!");
    window.location.reload();
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "CANNOT_ASSIGN_RETURN_STATUS"
    ) {
      console.error("Error: Cannot assign return status");
      toast.error("თქვენ არ შეგიძლიათ უკან დაბრუნება!");
    } else {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
