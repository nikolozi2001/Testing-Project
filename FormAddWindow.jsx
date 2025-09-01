import React, { useState } from "react";
import "./FormAddWindow.scss";
import axios from "axios";
import { backEndURL, axiosInstance } from "../../../components/helpers/helper";
import { useRef, useEffect } from "react";
function FormAddWindow({
  formWindowShown,
  setFormWindowShown,
  selectedEnterprises,
  addMessage,
}) {
  const [surveys, setSurveys] = useState([]);
  const [years, setYears] = useState([]);
  const [surveyType, setSurveyType] = useState("");
  const quarters = [1, 2, 3, 4];
  const months = [
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
  ];
  const formRef = useRef(null);

  const [selectedSurvey, setSelectedSurvey] = useState();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);

  useEffect(() => {
    generateYears();
    GetEnterPriseSurveys();
  }, []);

  const GetEnterPriseSurveys = async () => {
    await axiosInstance
      .get(`${backEndURL}/survey/get-all`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setSurveys(response.data);
      })
      .catch((error) => console.error(error));
  };

  const AddSurvey = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.post(
        `${backEndURL}/survey/enterprises-add-survey`,
        {
          enterpriseIds: selectedEnterprises,
          surveyId: selectedSurvey,
          year: selectedYear,
          quarter: surveyType == 3 ? selectedQuarter : "",
          month: surveyType == 4 ? selectedMonth : "",
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      addMessage("ფორმა წარმატებით დაემატა", "green");
    } catch (error) {
      addMessage("ფორმის დამატება ვერ მოხერხდა", "red");
      console.error(error);
    }
  };

  useEffect(() => {
    if (surveys.length > 0) {
      setSelectedSurvey(surveys[0].id);
      setSurveyType(surveys[0].surveyType.id);
    }
  }, [surveys]);

  const handleSurveyAdd = () => {
    AddSurvey();
    setFormWindowShown(false);
  };

  const handleClickOutside = (event) => {
    if (
      formRef.current &&
      !formRef.current.contains(event.target) &&
      formWindowShown == true
    ) {
      setFormWindowShown(false);
    }
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    let yearsArray = [];
    for (let i = 2013; i < currentYear; i++) {
      yearsArray = [...yearsArray, i];
    }
    setYears(yearsArray);
  };

  const handleSurveySelect = (value) => {
    setSelectedSurvey(value);
    for (let i = 0; i < surveys.length; i++) {
      if (surveys[i].id == value) {
        setSurveyType(surveys[i].surveyType.id);
        break;
      }
    }
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="window-outside">
      <div ref={formRef} className="form-add-window">
        <h2>ფორმის დამატება</h2>
        <ul>
          <li>
            <label htmlFor="survey">კითხვარი</label>
            <select
              onChange={(e) => handleSurveySelect(e.target.value)}
              name="survey"
              id="survey"
            >
              {surveys.map((survey) => {
                return <option value={survey.id}>{survey.name}</option>;
              })}
            </select>
          </li>
          <li>
            <label htmlFor="year">წელი</label>
            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              name="year"
              id="year"
            >
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
            </select>
          </li>
          <li>
            <label htmlFor="quarter">კვარტალი</label>
            <select
              disabled={surveyType != 3}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              name="quarter"
              id="quarter"
            >
              {quarters.map((each) => {
                return <option value={each}>{each}</option>;
              })}
            </select>
          </li>
          <li>
            <label htmlFor="month">თვე</label>
            <select
              disabled={surveyType != 4}
              onChange={(e) => setSelectedMonth(e.target.value)}
              name="month"
              id="month"
            >
              {months.map((each, index) => {
                return <option value={index + 1}>{each}</option>;
              })}
            </select>
          </li>
        </ul>
        <div className="form-buttons">
          <button onClick={() => handleSurveyAdd()} className="btn gray-btn">
            არჩევა
          </button>
          <button
            onClick={() => setFormWindowShown(false)}
            className="btn gray-btn"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormAddWindow;