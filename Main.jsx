import React, { useEffect, useRef, useState } from "react";
import DataRow from "../../components/data_table/dataRow/DataRow";
import HeadRow from "../../components/data_table/headRow/HeadRow";
import DataPagination from "../../components/data_table/pagination/DataPagination";
import redDot from "../../assets/images/status_colors/_red_ic.png";
import blueDot from "../../assets/images/status_colors/_blue_ic.png";
import yellowDot from "../../assets/images/status_colors/_orange_ic.png";
import greenDot from "../../assets/images/status_colors/_green_ic.png";
import purpleDot from "../../assets/images/status_colors/_lilac_ic.png";
import blackDot from "../../assets/images/status_colors/_black_ic.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import axios from "axios";

import "./main.scss";
import TextInput from "../../components/data_table/searchFields/TextInput";
import SelectInput from "../../components/data_table/searchFields/SelectInput";
import {
  backEndURL,
  refreshAccessToken,
  axiosInstance,
} from "../../components/helpers/helper";
import useDidMountEffect from "../../utils/CustomHook";
import FormAddWindow from "../../components/popupWidnow/formAddWindow/FormAddWindow";
import PassChangeWindow from "../../components/popupWidnow/passChangeWindow/PassChangeWindow";
import InterviewerEditWindow from "../../components/popupWidnow/interviewerEditWindow/InterviewerEditWindow";
import MessageWindow from "../../components/popupWidnow/messageWindow/MessageWindow";
import MailAddWindow from "../../components/popupWidnow/mailAddWindow/MailAddWindow";
import Footer from "../../components/footer/Footer";
import DeadlineAddWindow from "../../components/popupWidnow/deadlineAddWindow/DeadlineAddWindow";

const Main = () => {
  const periodNames = ["SURVEY_MONTH", "SURVEY_QUARTER", "SURVEY_YEAR"];

  const [isFieldsLoading, setIsFieldsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isFileDownloading, setIsFileDownloading] = useState(false);

  const fileUpRef = useRef();

  const [searchFields, setSearchFields] = useState({ row1: [], row2: [] });
  const [enterpriseData, setEnterpriseData] = useState({
    content: [],
    numberOfElements: 0,
    totalPages: 1,
  });
  const [sortedBy, setSortedBy] = useState({ name: "", asc: true });
  const [formWindowShown, setFormWindowShown] = useState(false);
  const [deadlineWindowShown, setDeadlineWindowShown] = useState();
  const [mailWindowShown, setMailWindowShown] = useState(false);
  const [passWindnowShown, setPassWindowShown] = useState(false);
  const [interviewerWindowShown, setInterviewerWindowShown] = useState(false);
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState();
  const [selectedEnterprises, setSelectedEnterprises] = useState([]);
  const [selectTrigger, setSelectTrigger] = useState(false);

  const [searchParams, setSearchParams] = useState({});
  const [excelData, setExcelData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sendMessageShown, setSendMessageShown] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const isFirstRender = useRef(true);

  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseSidCode, setEnterpriseSidCode] = useState("");
  const [enterpriseTaxCode, setEnterpriseTaxCode] = useState("");
  const [enterpriseSurvey, setEnterpriseSurvey] = useState("");
  const [enterpriseSubmissionStatus, setEnterpriseSubmissionStatus] =
    useState("");
  const [enterpriseSurveyMonth, setEnterpriseSurveyMonth] = useState("");
  const [enterpriseSurveyYear, setEnterpriseSurveyYear] = useState("");
  const [enterpriseSurveyQuarter, setEnterpriseSurveyQuarter] = useState("");
  const [enterpriseSurveyRegion, setEnterpriseSurveyRegion] = useState("");
  const [enterpriseInterviewer, setEnterpriseInterviewer] = useState("");

  useEffect(() => {
    setEnterpriseName(localStorage.getItem("enterpriseName") || "");
    setEnterpriseSidCode(localStorage.getItem("enterpriseSidCode") || "");
    setEnterpriseTaxCode(localStorage.getItem("enterpriseTaxCode") || "");
    setEnterpriseSurvey(localStorage.getItem("enterpriseSurvey") || "");
    setEnterpriseSubmissionStatus(
      localStorage.getItem("enterpriseSubmissionStatus") || ""
    );
    setEnterpriseSurveyMonth(
      localStorage.getItem("enterpriseSurveyMonth") || ""
    );
    setEnterpriseSurveyYear(localStorage.getItem("enterpriseSurveyYear") || "");
    setEnterpriseSurveyQuarter(
      localStorage.getItem("enterpriseSurveyQuarter") || ""
    );
    setEnterpriseSurveyRegion(
      localStorage.getItem("enterpriseSurveyRegion") || ""
    );
    setEnterpriseInterviewer(
      localStorage.getItem("enterpriseInterviewer") || ""
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("enterpriseName", enterpriseName);
    localStorage.setItem("enterpriseSidCode", enterpriseSidCode);
    localStorage.setItem("enterpriseTaxCode", enterpriseTaxCode);
    localStorage.setItem("enterpriseSurvey", enterpriseSurvey);
    localStorage.setItem(
      "enterpriseSubmissionStatus",
      enterpriseSubmissionStatus
    );
    localStorage.setItem("enterpriseSurveyMonth", enterpriseSurveyMonth);
    localStorage.setItem("enterpriseSurveyYear", enterpriseSurveyYear);
    localStorage.setItem("enterpriseSurveyQuarter", enterpriseSurveyQuarter);
    localStorage.setItem("enterpriseSurveyRegion", enterpriseSurveyRegion);
    localStorage.setItem("enterpriseInterviewer", enterpriseInterviewer);
  }, [
    enterpriseName,
    enterpriseSidCode,
    enterpriseTaxCode,
    enterpriseSurvey,
    enterpriseSubmissionStatus,
    enterpriseSurveyMonth,
    enterpriseSurveyYear,
    enterpriseSurveyQuarter,
    enterpriseSurveyRegion,
    enterpriseInterviewer,
  ]);

  const handleReset = () => {
    setEnterpriseName("");
    setEnterpriseSidCode("");
    setEnterpriseTaxCode("");
    setEnterpriseSurvey("");
    setEnterpriseSubmissionStatus("");
    setEnterpriseSurveyMonth("");
    setEnterpriseSurveyYear("");
    setEnterpriseSurveyQuarter("");
    setEnterpriseSurveyRegion("");
    setEnterpriseInterviewer("");

    localStorage.removeItem("enterpriseName");
    localStorage.removeItem("enterpriseSidCode");
    localStorage.removeItem("enterpriseTaxCode");
    localStorage.removeItem("enterpriseSurvey");
    localStorage.removeItem("enterpriseSubmissionStatus");
    localStorage.removeItem("enterpriseSurveyMonth");
    localStorage.removeItem("enterpriseSurveyYear");
    localStorage.removeItem("enterpriseSurveyQuarter");
    localStorage.removeItem("enterpriseSurveyRegion");
    localStorage.removeItem("enterpriseInterviewer");
  };

  const placeholdersObj = {
    ENTERPRISE_INTERVIEWER: "ყველა ინტერვიუერი",
    REGION: "ყველა რეგიონი",
    SURVEY_QUARTER: "კვარტალი",
    SURVEY_YEAR: "წელი",
    SURVEY_MONTH: "თვე",
    ENTERPRISE_SUBMISSION_STATUS: "სტატუსი",
    SURVEY: "კვლევა",
    ENTERPRISE_NAME: "დასახელება",
    ENTERPRISE_TAX_CODE: "სტატ. კოდი",
    ENTERPRISE_SID_CODE: "საიდ. კოდი",
  };

  const searchFieldsObj = {
    String: <TextInput />,
    select: <SelectInput />,
    Integer: <TextInput type="number" />,
  };

  const [currentPage, setCurrentPage] = useState(0);

  const [messages, setMessages] = useState([]);

  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("green");
  useEffect(() => {
    if (messages.length > 0) {
      if (isMessageVisible == false) {
        setIsMessageVisible(true);
        setText(messages[0].text);
        setColor(messages[0].color);

        setTimeout(() => {
          setIsMessageVisible(false);
        }, 4000);
        setTimeout(() => {
          let tempMessages = messages;
          tempMessages.shift();
          setMessages([...tempMessages]);
        }, 5000);
      }
    }
  }, [messages]);

  const addMessage = (_text, _color) => {
    let tempMessages = messages;
    setMessages([...tempMessages, { text: _text, color: _color }]);
  };

  useEffect(() => {
    FetchSearchFields();
    setIsDataLoading(true);
  }, []);

  useEffect(() => {
    setSelectTrigger(!selectTrigger);
  }, [selectedEnterprises]);

  async function checkAccessToken(params) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const newAccessToken = await refreshAccessToken(refreshToken);
        const retryResponse = await axiosInstance.get(
          `${backEndURL}/enterprise/search`
        );
        FetchEnterpriseData(params);
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
      }
    } else {
      console.error("Refresh token not found.");
    }
  }

  const FetchSearchFields = async () => {
    setIsFieldsLoading(true);
    await axiosInstance
      .get(`${backEndURL}/user/search-fields`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        let data = { row1: [], row2: [] };
        response.data.map((field) => {
          let fieldData = {};
          fieldData.component = searchFieldsObj[field.fieldType];
          fieldData.name = field.fieldName;
          let isPeriod = false;
          for (let i = 0; i < periodNames.length; i++) {
            if (field.fieldName == periodNames[i]) {
              isPeriod = true;
            }
          }
          fieldData.isPeriod = isPeriod;
          if (placeholdersObj[field.fieldName])
            fieldData.placeholder = placeholdersObj[field.fieldName];
          fieldData.order = field.order;
          fieldData.key = field.fieldName;

          const rowToAppend =
            authority === "INTERVIEWER" && field.fieldName === "SURVEY"
              ? "row2"
              : field.row === 1
              ? "row1"
              : "row2";

          data[rowToAppend] = [...data[rowToAppend], fieldData];
        });

        if (authority === "INTERVIEWER") {
          data.row1.sort((a, b) => a.order - b.order);
          data.row2.sort((a, b) => a.order - b.order);

          if (data.row2.length > 4) {
            [data.row2[3], data.row2[4]] = [data.row2[4], data.row2[3]];
          }
        }

        setIsFieldsLoading(false);
        setSearchFields(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    FetchEnterpriseData(searchParams);
  }, [searchParams, currentPage, sortedBy]);

  const FetchEnterpriseData = async (params) => {
    setIsDataLoading(true);
    await axiosInstance
      .get(`${backEndURL}/enterprise/search`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
        params: {
          paged: true,
          page: currentPage,
          size: 15,
          organizationTaxCode: params?.ENTERPRISE_SID_CODE,
          sidCode: params?.ENTERPRISE_TAX_CODE,
          organizationName: params?.ENTERPRISE_NAME,
          interviewerId: params?.ENTERPRISE_INTERVIEWER,
          submissionStatusId: params?.ENTERPRISE_SUBMISSION_STATUS,
          regionId: params?.REGION,
          surveyInitialId: params?.SURVEY,
          year: params?.SURVEY_YEAR,
          quarter: params?.SURVEY_QUARTER,
          month: params?.SURVEY_MONTH,
          sort: `${sortedBy.name},${sortedBy.asc === false && "DESC"}`,
        },
      })
      .then((response) => {
        setIsDataLoading(false);
        setEnterpriseData(response.data);
        // console.log(response.data.content, "response.data.content");
      })
      .catch((error) => {
        setIsDataLoading(false);
        if (error.response && error.response.status === 401) {
          checkAccessToken(params);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    setSearchParams(formDataObject);
  };

  useEffect(() => {
    // console.log(selectedEnterprises, "selectedEnterprises");
  }, [selectedEnterprises]);

  sessionStorage.removeItem("enterpriseId");

  const handleAllSelect = () => {
    const currentPageIds = enterpriseData.content.map(
      (each) => each.enterpriseId
    );
    let updatedSelects = selectedEnterprises.concat(currentPageIds);
    updatedSelects = [...new Set(updatedSelects)];
    setSelectedEnterprises(updatedSelects);
  };

  const handleAllDiselect = () => {
    const currentPageIds = enterpriseData.content.map(
      (each) => each.enterpriseId
    );
    let updatedSelects = selectedEnterprises;
    updatedSelects = updatedSelects.filter(
      (element) => !currentPageIds.includes(element)
    );
    setSelectedEnterprises(updatedSelects);
  };

  const handleFormButtonClick = () => {
    if (selectedEnterprises.length > 0) setFormWindowShown(true);
    else addMessage("ჯერ მონიშნეთ საწარმო!", "red");
  };

  const handleDeadlineBtnClick = () => {
    setDeadlineWindowShown(true);
  };

  const handleMailButtonClick = () => {
    setMailWindowShown(true);
  };

  const UpdateExcelFile = async () => {
    setIsFileDownloading(true);
    await axiosInstance
      .get(`${backEndURL}/report/export-enterprise`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
        responseType: "arraybuffer",
        // params: downloadParams,
        params: {
          size: 15,
          organizationTaxCode: searchParams?.ENTERPRISE_SID_CODE,
          sidCode: searchParams?.ENTERPRISE_TAX_CODE,
          organizationName: searchParams?.ENTERPRISE_NAME,
          interviewerId: searchParams?.ENTERPRISE_INTERVIEWER,
          submissionStatusId: searchParams?.ENTERPRISE_SUBMISSION_STATUS,
          regionid: searchParams?.REGION,
          surveyInitialId: searchParams?.SURVEY,
          year: searchParams?.SURVEY_YEAR,
          quarter: searchParams?.SURVEY_QUARTER,
          month: searchParams?.SURVEY_MONTH,
          sort: `${sortedBy.name},${sortedBy.asc == false && "DESC"}`,
        },
      })
      .then((response) => {
        const excelBlob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        setExcelData(excelBlob);
        setIsFileDownloading(false);
      })
      .catch((error) => {
        setIsFileDownloading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    return () => {
      if (excelData) {
        URL.revokeObjectURL(excelData);
      }
    };
  }, [searchParams]);

  const handleDownload = async () => {
    UpdateExcelFile();
  };

  useEffect(() => {
    if (excelData) {
      const blobUrl = URL.createObjectURL(excelData);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "data.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(excelData);
    }
  }, [excelData]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      setIsFileUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axiosInstance.post(
        `${backEndURL}/report/save-enterprises`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsFileUploading(false);
      setSelectedFile(null);
      fileUpRef.current.value = null;
      addMessage("წარმატებით გაიგზავნა", "green");
      // setSendMessageShown(true);
      // setTimeout(hideSendMessage, 3000);
    } catch (error) {
      addMessage("გაგზავნა ვერ მოხერხდა", "red");
      console.error("Error uploading file: ", error);
    }
  };

  const authority = localStorage.getItem("authority");

  const location = useLocation();
  const navigate = useNavigate();

  const handleReportClick = (event) => {
    event.preventDefault();
    const reportUrl = "/reporting";
    navigate(reportUrl);
  };

  const handleSmsClick = (event) => {
    event.preventDefault();
    const reportUrl = "/newsms";
    navigate(reportUrl);
  };

  const handleSyncClick = (event) => {
    // event.preventDefault();
    console.log("Sync button clicked");
  };

  const hideSendMessage = () => {
    setSendMessageShown(false);
  };

  return (
    <>
      <div className="main-temp">
        <MessageWindow isVisible={isMessageVisible} text={text} color={color} />
        {formWindowShown && (
          <FormAddWindow
            formWindowShown={formWindowShown}
            setFormWindowShown={setFormWindowShown}
            selectedEnterprises={selectedEnterprises}
            addMessage={addMessage}
          />
        )}
        {deadlineWindowShown && (
          <DeadlineAddWindow
            formWindowShown={deadlineWindowShown}
            setFormWindowShown={setDeadlineWindowShown}
            addMessage={addMessage}
          />
        )}
        {mailWindowShown && (
          <MailAddWindow
            formWindowShown={mailWindowShown}
            setFormWindowShown={setMailWindowShown}
            selectedEnterprises={selectedEnterprises}
            addMessage={addMessage}
          />
        )}
        {passWindnowShown && (
          <PassChangeWindow
            passWindnowShown={passWindnowShown}
            setPassWindowShown={setPassWindowShown}
            userId={selectedEnterpriseId}
            addMessage={addMessage}
          />
        )}
        {interviewerWindowShown && (
          <InterviewerEditWindow
            windowShown={interviewerWindowShown}
            setWindowShown={setInterviewerWindowShown}
            enterpriseId={selectedEnterpriseId}
          />
        )}
        <div className="datatable">
          <form className="datatable-header" onSubmit={handleSubmit}>
            <div className="header-row">
              {(authority === "ADMIN" ||
                authority === "BRANCH" ||
                authority === "REGION" ||
                authority === "INTERVIEWER") && (
                <>
                  <button
                    type="button"
                    onClick={handleReportClick}
                    className="btn orange-btn"
                  >
                    რეპორტი
                  </button>
                </>
              )}

              {(authority === "ADMIN" ||
                authority === "BRANCH" ||
                authority === "REGION") && (
                <button onClick={handleSyncClick} className="btn blue-btn">
                  სინქრონიზაცია
                </button>
              )}
              {authority === "ADMIN" && (
                <button
                  type="button"
                  onClick={handleSmsClick}
                  className="btn sms-button"
                >
                  სმსები
                </button>
              )}
            </div>

            {/* ჩვეულებრივი ზედა ჰედერი, რომელიც არ უჩანს ინტერვიუერს */}

            <div className="header-row">
              {authority !== "INTERVIEWER" && (
                <>
                  {isFieldsLoading
                    ? [0, 1, 2, 3, 4].map((each) => {
                        return (
                          <Skeleton
                            containerClassName="skeleton"
                            height={30}
                            key={each}
                          />
                        );
                      })
                    : searchFields.row1.map((field, index) => {
                        return React.cloneElement(field.component, {
                          key: field.key,
                          name: field.name,
                          order: field.order,
                          placeholder: field.placeholder,
                          isPeriod: field.isPeriod,
                          value:
                            field.name === "SURVEY"
                              ? enterpriseSurvey
                              : field.name === "REGION"
                              ? enterpriseSurveyRegion
                              : field.name === "ENTERPRISE_INTERVIEWER"
                              ? enterpriseInterviewer
                              : "",
                          onChange: (e) => {
                            const { value } = e.target;
                            if (field.name === "SURVEY") {
                              setEnterpriseSurvey(value);
                            } else if (field.name === "REGION") {
                              setEnterpriseSurveyRegion(value);
                            } else if (
                              field.name === "ENTERPRISE_INTERVIEWER"
                            ) {
                              setEnterpriseInterviewer(value);
                            }
                          },
                        });
                      })}
                </>
              )}
            </div>

            {/* ჩვეულებრივი ქვედა ჰედერი პ.ს SURVEY_ის დამატება ხდება row2_ში, როცა ინტერვიუერის იუზერით დავლოგინდებით*/}

            <div className="header-row">
              {authority !== "TEST" && (
                <>
                  {isFieldsLoading
                    ? [0, 1, 2, 3, 4, 5].map((each) => (
                        <Skeleton
                          containerClassName="skeleton"
                          height={30}
                          key={each}
                        />
                      ))
                    : searchFields.row2.map((field) =>
                        React.cloneElement(field.component, {
                          key: field.key,
                          name: field.name,
                          order: field.order,
                          placeholder: field.placeholder,
                          isPeriod: field.isPeriod,
                          value:
                            field.name === "ENTERPRISE_NAME"
                              ? enterpriseName
                              : field.name === "ENTERPRISE_SID_CODE"
                              ? enterpriseSidCode
                              : field.name === "ENTERPRISE_TAX_CODE"
                              ? enterpriseTaxCode
                              : field.name === "ENTERPRISE_SUBMISSION_STATUS"
                              ? enterpriseSubmissionStatus
                              : field.name === "SURVEY_MONTH"
                              ? enterpriseSurveyMonth
                              : field.name === "SURVEY_YEAR"
                              ? enterpriseSurveyYear
                              : field.name === "SURVEY_QUARTER"
                              ? enterpriseSurveyQuarter
                              : "",
                          onChange: (e) => {
                            const { value } = e.target;
                            if (field.name === "ENTERPRISE_NAME") {
                              setEnterpriseName(value);
                            } else if (field.name === "ENTERPRISE_SID_CODE") {
                              setEnterpriseSidCode(value);
                            } else if (field.name === "ENTERPRISE_TAX_CODE") {
                              setEnterpriseTaxCode(value);
                            } else if (
                              field.name === "ENTERPRISE_SUBMISSION_STATUS"
                            ) {
                              setEnterpriseSubmissionStatus(value);
                            } else if (field.name === "SURVEY_MONTH") {
                              setEnterpriseSurveyMonth(value);
                            } else if (field.name === "SURVEY_YEAR") {
                              setEnterpriseSurveyYear(value);
                            } else if (field.name === "SURVEY_QUARTER") {
                              setEnterpriseSurveyQuarter(value);
                            }
                          },
                        })
                      )}
                  {!isFieldsLoading && (
                    <>
                      <input
                        type="submit"
                        value="ძიება"
                        className="btn gray-btn"
                      />
                      <input
                        type="reset"
                        className="btn gray-btn"
                        value="ძიების გაუქმება"
                        onClick={handleReset}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </form>
          <table className="datatable-content">
            <thead>
              <HeadRow sortedBy={sortedBy} setSortedBy={setSortedBy} />
            </thead>
            <tbody>
              {isDataLoading
                ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                    (each) => {
                      return (
                        <tr className="mainList">
                          {/* <td>
                          <Skeleton containerClassName="skeleton" height={30} />
                        </td> */}
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      );
                    }
                  )
                : enterpriseData.content.map((enterprise) => {
                    return (
                      <DataRow
                        enterprise={enterprise}
                        key={enterprise.enterpriseId}
                        selectedEnterprises={selectedEnterprises}
                        setSelectedEnterprises={setSelectedEnterprises}
                        setPassWindowShown={setPassWindowShown}
                        setInterviewerWindowShown={setInterviewerWindowShown}
                        selectTrigger={selectTrigger}
                        setSelectedEnterpriseId={setSelectedEnterpriseId}
                      />
                    );
                  })}
            </tbody>
          </table>
          <div
            className={`datatable-pagination ${
              authority === "INTERVIEWER" ? "interviewer-pagination" : ""
            }`}
          >
            {authority !== "INTERVIEWER" && (
              <>
                <div className="footer-btns">
                  <div className="checkbox-btns">
                    <button onClick={() => handleAllSelect()} className="btn">
                      ყველას მონიშვნა
                    </button>
                    <button onClick={() => handleAllDiselect()} className="btn">
                      მონიშვნის გაუქმება
                    </button>
                  </div>
                  <button
                    onClick={() => handleFormButtonClick()}
                    className="btn gray-btn"
                  >
                    ფორმის დამატება
                  </button>
                  <button
                    onClick={() => handleDeadlineBtnClick()}
                    className="btn gray-btn"
                  >
                    დედლაინის დამატება
                  </button>
                  <button
                    onClick={() => handleMailButtonClick()}
                    className="btn gray-btn"
                  >
                    მეილების გაგზავნა
                  </button>
                </div>
              </>
            )}
            <div className="pagination-wrapper">
              <DataPagination
                totalPages={enterpriseData.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isDataLoading={isDataLoading}
              />
              <p>{`სულ: ${enterpriseData.totalElements}`}</p>
            </div>
          </div>
          <div className="datatable-footer">
            <ul className="status-list">
              <li key="status-header">
                <h5>სტატუსი:</h5>
              </li>
              <li key="unopened">
                <img src={redDot} alt="Red dot" />
                <h5>გაუხსნელი;</h5>
              </li>
              <li key="edited">
                <img src={blueDot} alt="Blue dot" />
                <h5>რედაქტირებული;</h5>
              </li>
              <li key="sent">
                <img src={yellowDot} alt="Yellow dot" />
                <h5>გადაგზავნილი;</h5>
              </li>
              <li key="sent-by-interviewer">
                <img src={greenDot} alt="Green dot" />
                <h5>გადაგზავნილი (ინტერვიუერის მიერ);</h5>
              </li>
              <li key="returned">
                <img src={purpleDot} alt="Purple dot" />
                <h5>დაბრუნებულია გასასწორებლად;</h5>
              </li>
              <li key="completed">
                <img src={blackDot} alt="Black dot" />
                <h5>დასრულებულია;</h5>
              </li>
            </ul>
            <div className="file-upload">
              {authority !== "INTERVIEWER" && (
                <>
                  <button
                    onClick={() =>
                      isFileDownloading === false && handleDownload()
                    }
                    className="btn gray-btn btn-spinner"
                  >
                    ჩამოტვირთვა
                    {isFileDownloading && (
                      <div className="spinner-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#ffffff"
                            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                  <input
                    ref={fileUpRef}
                    className="btn gray-btn"
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    //value={"კითხვარის ატვირთვა"} //(კვარტალი - 2023_4)
                    id="upload"
                    name="upload"
                  />
                  <button
                    className="btn gray-btn btn-spinner"
                    onClick={() =>
                      isFileUploading == false && handleFileUpload()
                    }
                    disabled={!selectedFile}
                  >
                    <p>საწარმოების ატვირთვა</p>
                    {isFileUploading && (
                      <div className="spinner-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#ffffff"
                            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                  {sendMessageShown && <p>წარმატებით გაიგზავნა</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
