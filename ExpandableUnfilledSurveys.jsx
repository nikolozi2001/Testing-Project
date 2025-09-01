import "./expandable.scss";
import React, { useEffect, useRef, useState } from "react";
import { Box, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import EditNoteIcon from "@mui/icons-material/EditNote";
import InfoIcon from "@mui/icons-material/Info";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentIcon from "@mui/icons-material/Comment";
import Tooltip from "@mui/material/Tooltip";
import { Link, useParams } from "react-router-dom";
import FormioService from "../../../services/FormioService";
import { Form } from "@formio/react";
import { toast } from "react-toastify";
import EnterpriseService from "../../../services/EnterpriseService";
import Modal from "@mui/material/Modal";
import LibService from "../../../services/LibService";
import { axiosInstance, backEndURL } from "../../../components/helpers/helper";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff", // Changing background color to white
  borderRadius: "10px", // Adding rounded corners
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Updated shadow for a softer look
  width: "400px", // Defining width
  padding: "20px", // Adding consistent padding
  outline: "none", // Removing any outline
};

const ExpandableUnfilledSurveys = ({ enterpriseId }) => {
  const token = localStorage.getItem("accessToken");
  const authority = localStorage.getItem("authority");

  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openTimesModal, setOpenTimesModal] = useState(false);
  const [openAddStatusModal, setOpenAddStatusModal] = useState(false);
  const [content, setContent] = useState([]);

  const [formio, setFormio] = useState(null);
  const [currentSurvey, setCurrentSurvey] = useState(null);

  const spendHourRef = useRef(null);
  const spendMinuteRef = useRef(null);
  const enterpriseSurveyStatusRef = useRef(null);
  const commentRef = useRef(null);

  const [enterpriseSurveyStatuses, setEnterpriseSurveyStatuses] = useState([]);

  const handleOpenModal = (survey) => {
    setCurrentSurvey(survey);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  function handleSend(survey) {
    if (currentSurvey.needValidationBeforeSend) {
      FormioService.getEnterpriseFormById(currentSurvey.id).then(function (
        response
      ) {
        if (response) {
          const form = JSON.parse(response["surveyFormJson"]);
          if (response["submissionData"]) {
            const submissionData = JSON.parse(response["submissionData"]);
            form["submission"] = { data: submissionData };
          }
          setFormio(form);
        }
      });
    } else {
      sendEnterpriseSurvey();
    }
  }

  function sendEnterpriseSurvey() {
    const request = {
      enterpriseSurveyId: currentSurvey.id,
      spendHour: spendHourRef.current.value,
      spendMinute: spendMinuteRef.current.value,
    };
    EnterpriseService.sendEnterpriseSurvey(request).then(function (response) {
      setOpenTimesModal(false);
      setOpenModal(false);
      toast.success("წარმატებით გაიგზავნა");

      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  const [itemId, setItemId] = useState(null);
  const [sendHistory, setSendHistory] = useState(null);

  useEffect(() => {
    if (itemId) {
      const fetchSurveySendInfo = async () => {
        try {
          const response = await EnterpriseService.getSurveySendInfo(itemId);
          // console.log("Survey send info fetched successfully:", response);
          setSendHistory(response);
        } catch (error) {
          console.error("Error fetching survey send info:", error);
        }
      };

      fetchSurveySendInfo();
    }
  }, [itemId]);

  const handleMouseEnter = (id) => {
    setItemId(id);
  };

  function openSyrveyAddStatusModal(survey) {
    LibService.getEnterpriseSurveyStatuses().then(function (response) {
      setEnterpriseSurveyStatuses(response);
      setCurrentSurvey(survey);
      setOpenAddStatusModal(true);
    });
  }

  function surveyAddStatus() {
    const request = {
      enterpriseSurveyId: currentSurvey.id,
      enterpriseSurveySubmissionStatus: enterpriseSurveyStatusRef.current.value,
      comment: commentRef.current.value,
    };
    EnterpriseService.addEnterpriseSurveyStatus(request).then(function (
      response
    ) {
      setOpenAddStatusModal(false);
      toast.success("წარმატებით გაიგზავნა");

      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  useEffect(() => {
    if (formio) {
      setTimeout(function () {
        if (window.formio.checkValidity()) {
          sendEnterpriseSurvey();
        } else {
          handleCloseModal();
          toast.error("ფორმა არ არის შევსბული");
          setFormio(null);
        }
      }, 1000);
    }
  }, [formio]);

  useEffect(() => {
    if (open) {
      if (content.length < 1) {
        if (authority === "ENTERPRISE") {
          EnterpriseService.getEnterpriseOwnUnfilledSurveys().then(function (
            response
          ) {
            if (response) {
              setContent(response);
            }
          });
        } else if (authority === "ADMIN") {
          EnterpriseService.getEnterpriseUnfilledSurveys(enterpriseId).then(
            function (response) {
              if (response) {
                setContent(response);
              }
            }
          );
        } else {
          EnterpriseService.getEnterpriseUnfilledSurveys(enterpriseId).then(
            function (response) {
              if (response) {
                setContent(response);
              }
            }
          );
        }
      }
    }
  }, [open]);

  const handleSubmitNote = (enterpriseSurveyId) => {
    const requestData = {
      enterpriseSurveyId: enterpriseSurveyId,
      note: noteText,
    };

    axiosInstance
      .post(`${backEndURL}/enterprise/return-survey-add-comment`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("შენიშვნა დაემატა წარმატებით!");
        setOpenNoteModal(false);
        setNoteText("");
      })
      .catch((error) => {
        toast.error("შენიშვნა არ დაემატა");
        console.error(error);
      });
  };

  sessionStorage.setItem("enterpriseId", enterpriseId);

  const renderContent = (contentArray) => {
    return contentArray.map((item, index) => {
      let backgroundColor = "transparent";
      let extraClassName = "";

      if (item.name.includes("მონაცემები შრომის შესახებ")) {
        backgroundColor = "#def2ff";
      } else if (
        item.name.includes("მონაცემები საგარეო ეკონომიკური საქმიანობის შესახებ")
      ) {
        backgroundColor = "#ddfff4";
      } else if (
        item.name.includes("საწარმოთა კვარტალური სტატისტიკური გამოკვლევა")
      ) {
        backgroundColor = "#fde1e1";
      } else if (item.name.includes("სასოფლო მეურნეობათა გამოკვლევა")) {
        if (authority !== "ENTERPRISE") {
          backgroundColor = "#bfff7f80";
          extraClassName = "hideStatus";
        } else {
          backgroundColor = "#bfff7f80";
        }
      } else if (item.name.includes("ფასების სტატისტიკური")) {
        backgroundColor = "#fdf6da";
      }

      const className = `content-item survid${item.id}`;
      const hideStatus = `default_button_small ${extraClassName}`;

      return (
        <div key={index} className={className} style={{ backgroundColor }}>
          <div>
            <h4 className="content_item_title">{item.name}</h4>
          </div>
          <div className="content_periods_container">
            <p>{`წელი: ${item.year}`}</p>
            {item.quarter && <p>{`კვარტალი: ${item.quarter}`}</p>}
            {item.month && <p>{`თვე: ${item.month}`}</p>}
            <Tooltip
              onMouseEnter={() => handleMouseEnter(item.id)}
              title={
                sendHistory ? (
                  <>
                    <p>
                      პირველი საწარმოს გაგზავნის თარიღი:{" "}
                      {sendHistory.firstEnterpriseSentDate}
                    </p>
                    <p>
                      პირველი ინტერვიუერის გაგზავნის თარიღი:{" "}
                      {sendHistory.firstInterviewerSentDate}
                    </p>
                    <p>
                      პირველმა ინტერვიუერმა გაგზავნა სრული სახელი:{" "}
                      {sendHistory.firstInterviewerSentFullName}
                    </p>
                    <p>
                      ბოლო საწარმოს გაგზავნის თარიღი:{" "}
                      {sendHistory.lastEnterpriseSentDate}
                    </p>
                    <p>
                      ბოლო ინტერვიუერის გაგზავნის თარიღი:{" "}
                      {sendHistory.lastInterviewerSentDate}
                    </p>
                    <p>
                      ბოლო ინტერვიუერმა გაგზავნა სრული სახელი:{" "}
                      {sendHistory.lastInterviewerSentFullName}
                    </p>
                  </>
                ) : (
                  "Loading info..."
                )
              }
            >
              <InfoIcon className="info_icon" />
            </Tooltip>
            <Tooltip title="დაამატეთ შენიშვნა">
              <AddCommentIcon
                onClick={() => setOpenNoteModal(true)}
                className="bugReport"
                fontSize="medium"
              />
            </Tooltip>
            <Modal open={openNoteModal} onClose={() => setOpenNoteModal(false)}>
              <Box sx={modalStyle} className="modern_modal_wrapper">
                <h3>შენიშვნის დამატება</h3>
                <textarea
                  className="form-control modern_textarea"
                  placeholder="ჩაწერეთ შენიშვნა"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <section className="modal_button_section">
                  <button
                    className="modern_button"
                    onClick={() => handleSubmitNote(item.id)}
                  >
                    დამატება
                  </button>
                  <button
                    className="modern_button cancel_button"
                    onClick={() => setOpenNoteModal(false)}
                  >
                    შეწყვეტა
                  </button>
                </section>
              </Box>
            </Modal>
          </div>
          <div className="content_buttons_container">
            <Tooltip title="შევსება">
              <Link
                to={
                  authority === "ENTERPRISE"
                    ? `/enterprises/survey/${localStorage.getItem("userId")}/${
                        item.id
                      }`
                    : `/enterprises/survey/${enterpriseId}/${item.id}`
                }
              >
                <button className="default_button_small">
                  შევსება
                  <EditNoteIcon className="center_icon" fontSize="medium" />
                </button>
              </Link>
            </Tooltip>
            {authority !== "ENTERPRISE" &&
              item.submissionStatus?.name !== "გაუხსნელი" && (
                <Tooltip title="გაგზავნა">
                  <button
                    className="default_button_small"
                    onClick={() => handleOpenModal(item)}
                  >
                    გაგზავნა
                    <SendIcon className="center_icon" fontSize="small" />
                  </button>
                </Tooltip>
              )}
            <Modal open={openModal} onClose={handleCloseModal}>
              <Box sx={modalStyle} className="warning_modal_content_wrapper">
                <section className="modal_text_section">
                  <p>გსურთ კითხვარის გადაგზავნა საქსტატში?</p>
                  <span>
                    კითხვარის გადაგზავნის შემდეგ მასში ცვლილებების შეტანა
                    შეუძლებელია!
                  </span>
                </section>
                <section className="modal_button_section">
                  <button
                    className="default_button_small_no_icon"
                    onClick={() => setOpenTimesModal(true)}
                  >
                    დიახ
                  </button>
                  <button
                    className="default_button_small_no_icon"
                    onClick={handleCloseModal}
                  >
                    არა
                  </button>
                </section>
              </Box>
            </Modal>
            <Modal
              open={openTimesModal}
              onClose={() => {
                setOpenTimesModal(false);
                setOpenModal(false);
              }}
            >
              <Box sx={modalStyle} className="warning_modal_content_wrapper">
                <section className="modal_text_section">
                  <p>კითხვარის შევსებაზე დახარჯული დრო</p>
                  <span>
                    საათი: <input type="text" ref={spendHourRef} />
                  </span>
                  <span>
                    წუთი: &nbsp;&nbsp;
                    <input type="text" ref={spendMinuteRef} />
                  </span>
                </section>
                <section className="modal_button_section">
                  <button
                    className="default_button_small_no_icon"
                    onClick={() => handleSend(item)}
                  >
                    გაგზავნა
                  </button>
                  <button
                    className="default_button_small_no_icon"
                    onClick={() => {
                      setOpenTimesModal(false);
                      setOpenModal(false);
                    }}
                  >
                    გაუქმება
                  </button>
                </section>
              </Box>
            </Modal>
            <Tooltip title="ნახვა">
              <Link to={`/enterprises/survey/view/${item.id}`}>
                <button className="default_button_small default_button_white">
                  ნახვა
                  <SearchIcon className="center_icon" fontSize="medium" />
                </button>
              </Link>
            </Tooltip>
          </div>
          {authority !== "ENTERPRISE" && (
            <div style={{ alignItems: "center" }}>
              <Tooltip title="სტატუსის მინიჭება">
                <button
                  className={hideStatus}
                  onClick={() => openSyrveyAddStatusModal(item)}
                >
                  სტატუსის მინიჭება
                </button>
              </Tooltip>
              <Modal
                open={openAddStatusModal}
                onClose={() => setOpenAddStatusModal(false)}
              >
                <Box sx={modalStyle} className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">აირჩიეთ სტატუსი</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setOpenAddStatusModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <select
                          ref={enterpriseSurveyStatusRef}
                          id="statusSelect"
                          className="form-select"
                        >
                          <option value="">- აირჩიეთ -</option>
                          {enterpriseSurveyStatuses.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.code} {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="commentTextArea" className="form-label">
                          კომენტარი
                        </label>
                        <textarea
                          ref={commentRef}
                          id="commentTextArea"
                          className="form-control"
                          placeholder="კომენტარი"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={() => surveyAddStatus()}
                    >
                      შენახვა
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="expandable_wrapper">
      <div
        className={`expandable_item ${open ? "bg_color_active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        თქვენი საწარმოს (ორგანიზაციის) შესავსები კითხვარები:
        {open ? (
          <ExpandLessIcon className="expand_icon" fontSize="large" />
        ) : (
          <ExpandMoreIcon className="expand_icon" fontSize="large" />
        )}
      </div>
      <Collapse in={open} className="content_wrapper">
        <div>{renderContent(content)}</div>
        <div id="formio" style={{ visibility: "hidden" }}>
          {formio != null && (
            <Form
              // src={'https://examples.form.io/wizard'}
              form={formio}
              submission={formio?.submission}
              onSubmit={() => console.log("Form submitted")}
              options={{
                buttonSettings: {
                  showSubmit: true,
                  showCancel: false,
                },
                language: "ka",
                i18n: window.i18n,
              }}
              formReady={(form) => {
                window.formio = form;
              }}
            />
          )}
        </div>
      </Collapse>
      <hr />
    </div>
  );
};

export default ExpandableUnfilledSurveys;
