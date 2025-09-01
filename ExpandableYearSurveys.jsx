import "./expandable.scss";
import React, { useEffect, useState } from "react";
import { Box, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentIcon from "@mui/icons-material/Comment";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EnterpriseService from "../../../services/EnterpriseService";
import ReplayIcon from "@mui/icons-material/Replay";
import { axiosInstance, backEndURL } from "../../../components/helpers/helper";
import Modal from "@mui/material/Modal";

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

const ExpandableYearSurveys = ({ enterpriseId, year }) => {
  const token = localStorage.getItem("accessToken");
  const authority = localStorage.getItem("authority");

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);

  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (open) {
      if (content.length < 1) {
        const fetchSurveys = async () => {
          let response;
          if (authority === "ENTERPRISE") {
            response = await EnterpriseService.getEnterpriseSendSurveysByYear({
              year,
            });
          } else {
            response = await EnterpriseService.getEnterpriseSendSurveysByYear({
              year,
              enterpriseId,
            });
          }
          if (response) {
            setContent(response);
          }
        };
        fetchSurveys();
      }
    }
  }, [open, authority, year, enterpriseId, content]);

  const [itemId, setItemId] = useState(null);
  const [sendHistory, setSendHistory] = useState(null);

  useEffect(() => {
    if (itemId) {
      const fetchSurveySendInfo = async () => {
        try {
          const response = await EnterpriseService.getSurveySendInfo(itemId);
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

  const handleReturnSurvey = async (enterpriseSurveyId) => {
    EnterpriseService.surveyReturn(enterpriseSurveyId).then(function (
      response
    ) {
      window.location.reload();
    });
  };

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
        extraClassName = "showReturnBtn";
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
            {(extraClassName.includes("hideStatus") ||
              extraClassName.includes("showReturnBtn")) && (
              <Tooltip title="უკან დაბრუნება">
                <button
                  className="replay_button"
                  onClick={() => handleReturnSurvey(item.id)}
                  disabled={loading}
                >
                  {loading ? (
                    "Loading..."
                  ) : (
                    <ReplayIcon className="center_icon" fontSize="small" />
                  )}
                </button>
              </Tooltip>
            )}
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
            {(authority === "INTERVIEWER" ||
              authority === "ADMIN" ||
              authority === "BRANCH") && (
              <Tooltip title="შევსება">
                <Link
                  to={
                    authority === "ENTERPRISE"
                      ? `/enterprises/survey/${localStorage.getItem(
                          "userId"
                        )}/${item.id}`
                      : `/enterprises/survey/${enterpriseId}/${item.id}`
                  }
                >
                  <button className="default_button_small">
                    შევსება
                    <EditNoteIcon className="center_icon" fontSize="medium" />
                  </button>
                </Link>
              </Tooltip>
            )}
            <Tooltip title="ნახვა">
              <Link to={"/enterprises/survey/view/" + item.id}>
                <button className="default_button_small default_button_white">
                  ნახვა
                  <SearchIcon className="center_icon" fontSize="medium" />
                </button>
              </Link>
            </Tooltip>
          </div>
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
        თქვენი საწარმოს (ორგანიზაციის) მიერ შევსებული კითხვარები ({year})
        {open ? (
          <ExpandLessIcon className="expand_icon" fontSize="large" />
        ) : (
          <ExpandMoreIcon className="expand_icon" fontSize="large" />
        )}
      </div>
      <Collapse in={open} className="content_wrapper">
        <div>{renderContent(content)}</div>
      </Collapse>
      <hr />
    </div>
  );
};

export default ExpandableYearSurveys;
