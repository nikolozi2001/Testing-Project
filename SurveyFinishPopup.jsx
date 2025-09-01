import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "./SurveyFinishPopup.scss";
import { backEndURL, axiosInstance } from "../../helpers/helper";
import DataPagination from "../../components/data_table/pagination/DataPagination";

const SurveyFinishPopup = ({ onClose }) => {
  const [surveys, setSurveys] = useState([]);
  const [filledRestrictions, setFilledRestrictions] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [surveyTypeId, setSurveyTypeId] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurveysAndRestrictions();
  }, []);

  const fetchSurveysAndRestrictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const [surveysResponse, restrictionsResponse] = await Promise.all([
        axiosInstance.get(`${backEndURL}/survey/get-all`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }),
        axiosInstance.get(`${backEndURL}/user/search-survey-fill-restriction`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }),
      ]);

      const fetchedSurveys = surveysResponse.data || [];
      setSurveys(fetchedSurveys);

      if (fetchedSurveys.length > 0) {
        setSelectedSurvey(fetchedSurveys[0].id);
        setSurveyTypeId(fetchedSurveys[0].surveyType.id);
      }

      setFilledRestrictions(restrictionsResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSurveyChange = (e) => {
    const surveyId = e.target.value;
    setSelectedSurvey(surveyId);

    const selectedSurveyDetails = surveys.find(
      (survey) => survey.id === parseInt(surveyId, 10)
    );
    if (selectedSurveyDetails) {
      setSurveyTypeId(selectedSurveyDetails.surveyType.id);
    }
  };

  const handleSend = async () => {
    if (!selectedSurvey || !selectedYear) {
      toast.error("გთხოვთ აირჩიოთ კითხვარი და წელი.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `${backEndURL}/user/add-survey-fill-restriction`,
        {
          surveyId: selectedSurvey,
          year: selectedYear,
          quarter: surveyTypeId === 3 ? selectedQuarter : "",
          month: surveyTypeId === 4 ? selectedMonth : "",
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      if (response.status === 200) {
        toast.success("Survey restriction successfully added!");
        await fetchSurveysAndRestrictions(); // Refresh data
        onClose();
      } else {
        throw new Error("Failed to send survey restriction.");
      }
    } catch (error) {
      console.error("Error sending survey restriction:", error);
      setError("Error submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestriction = () => {};

  // Predefined options
  const years = useMemo(() => [2024, 2023, 2022, 2021, 2020], []);
  const quarters = useMemo(() => ["1", "2", "3", "4"], []);
  const months = useMemo(
    () => [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ],
    []
  );

  return (
    <div className="window-outside">
      <div className="window-inside">
        <div className="window-header">
          <h2>კითხვარის დახურვა</h2>
        </div>
        <div className="popup-content">
          {loading && <div className="loading-spinner">იტვირთება...</div>}
          {error && <div className="error-message">{error}</div>}

          <div className="select-group">
            <label htmlFor="survey">აირჩიეთ კითხვარი:</label>
            <select
              id="survey"
              value={selectedSurvey}
              onChange={handleSurveyChange}
              disabled={loading}
            >
              <option value="" disabled>
                აირჩიეთ
              </option>
              {surveys.map((survey) => (
                <option key={survey.id} value={survey.id}>
                  {survey.name}
                </option>
              ))}
            </select>
          </div>

          <div className="select-group">
            <label htmlFor="year">აირჩიეთ წელი:</label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={loading}
            >
              <option value="" disabled>
                აირჩიეთ
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="select-group">
            <label htmlFor="quarter">აირჩიეთ კვარტალი:</label>
            <select
              id="quarter"
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              disabled={loading || surveyTypeId !== 3}
            >
              <option value="" disabled>
                აირჩიეთ
              </option>
              {quarters.map((quarter) => (
                <option key={quarter} value={quarter}>
                  {quarter}
                </option>
              ))}
            </select>
          </div>

          <div className="select-group">
            <label htmlFor="month">აირჩიეთ თვე:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              disabled={loading || surveyTypeId !== 4}
            >
              <option value="" disabled>
                აირჩიეთ
              </option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <button
            className="send-button"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "დაელოდეთ..." : "გაგზავნა"}
          </button>
          <button className="close-btn" onClick={onClose}>
            დახურვა
          </button>

          <button className="restrictions-btn" onClick={handleRestriction}>
            დამატებული შეზღუდვები
          </button>

          <div className="filled-restrictions">
            <h3>შევსებული შეზღუდვები:</h3>
            {filledRestrictions?.content?.length > 0 ? (
              <ul>
                {filledRestrictions.content.map((restriction, index) => (
                  <li key={index}>
                    {restriction.surveyName ||
                      `Survey ID: ${restriction.surveyId}`}
                    {" - "}
                    {restriction.year} წელი,{" "}
                    {restriction.quarter
                      ? `${restriction.quarter} კვარტალი`
                      : "No Quarter"}
                    , {restriction.month || "No Month"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>შეზღუდვები არ მოიძებნა.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyFinishPopup;
