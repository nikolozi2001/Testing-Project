/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormioService from "../../services/FormioService";
import { Form } from "@formio/react";

const FormioFormView = () => {
  const { enterpriseSurveyId } = useParams();
  const [formio, setFormio] = useState(null);
  const [formId, setFormId] = useState(null);

  const EDITGRID_KEY = "page2EditGridMain";
  const BUTTON_KEY = "page2EditGridMain2";

  // Function to process a single row and then call the next one
  const processRow = (editGrid, rowIndex) => {
    const totalRows = editGrid.dataValue.length;

    if (rowIndex >= totalRows) {
      console.log("--- All rows processed ---");
      return;
    }

    console.log(`Processing row ${rowIndex + 1} of ${totalRows}...`);
    if (typeof editGrid.editRow === "function") {
      editGrid.editRow(rowIndex);
    } else {
      // fallback (React-safe)
      const editButtons = editGrid.element.querySelectorAll(
        'button[ref="editRow"]'
      );
      if (editButtons[rowIndex]) {
        editButtons[rowIndex].click();
      }
    }

    let attempts = 0;
    const checkInterval = setInterval(() => {
      attempts++;

      // Access the components of the currently opening row
      const editRow = editGrid.editRows && editGrid.editRows[rowIndex];

      if (editRow && editRow.components) {
        // Look for the button inside this specific row
        let btnComp = null;
        editGrid.everyComponent(
          (child) => {
            if (child.key === BUTTON_KEY) {
              btnComp = child;
            }
          },
          { components: editRow.components }
        );

        if (btnComp) {
          console.log(`Row ${rowIndex}: Button found. Clicking...`);

          // Force trigger
          btnComp.emit("click");
          if (btnComp.refs.button) {
            btnComp.refs.button.disabled = false;
            btnComp.refs.button.click();
          }

          clearInterval(checkInterval);

          // Wait a moment for the click action to finish, then process NEXT row
          setTimeout(() => {
            processRow(editGrid, rowIndex + 1);
          }, 500);
          return;
        }
      }

      if (attempts > 15) {
        console.warn(
          `Row ${rowIndex}: Timeout finding button. Skipping to next...`
        );
        clearInterval(checkInterval);
        processRow(editGrid, rowIndex + 1);
      }
    }, 300);
  };

  const openAllEditGrids = (form) => {
    console.log("--- Scanning for EditGrids with _collapsed ---");

    const editGrids = [];

    // 🔍 Find all EditGrids
    form.everyComponent((comp) => {
      if (
        comp.type === "editgrid" &&
        comp.key &&
        comp.key.endsWith("_collapsed")
      ) {
        editGrids.push(comp);
      }
    });

    if (editGrids.length === 0) {
      console.warn("No matching EditGrids found.");
      return;
    }

    console.log(
      "Found EditGrids:",
      editGrids.map((g) => g.key)
    );

    // 🔁 Process each EditGrid sequentially
    const processNextGrid = (index) => {
      if (index >= editGrids.length) {
        console.log("--- All EditGrids processed ---");
        return;
      }

      const grid = editGrids[index];
      console.log(`\n--- Processing EditGrid: ${grid.key} ---`);

      const startProcessing = () => {
        processRow(grid, 0);

        // Wait before moving to next grid
        setTimeout(() => {
          processNextGrid(index + 1);
        }, 1000);
      };

      if (!grid.dataValue || grid.dataValue.length === 0) {
        console.log(`Grid ${grid.key} is empty. Adding row...`);
        grid.addRow();
        setTimeout(startProcessing, 300);
      } else {
        startProcessing();
      }
    };

    processNextGrid(0);
  };

  const i18n = {
    ka: {
      cancel: "შეწყვეტა",
      previous: "წინა გვერდი",
      next: "შემდეგი გვერდი",
      submit: "გაგზავნა",
      January: "იანვარი",
      February: "თებერვალი",
      March: "მარტი",
      April: "აპრილი",
      May: "მაისი",
      June: "ივნისი",
      July: "ივლისი",
      August: "აგვისტო",
      September: "სექტემბერი",
      October: "ოქტომბერი",
      November: "ნოემბერი",
      December: "დეკემბერი",
      Month: "თვე",
      Year: "წელი",
    },
  };

  useEffect(() => {
    FormioService.getEnterpriseFormById(enterpriseSurveyId, false).then(
      (response) => {
        if (response) {
          const form = JSON.parse(response["surveyFormJson"]);
          if (response["submissionData"]) {
            form["submission"] = {
              data: JSON.parse(response["submissionData"]),
            };
          }
          form.display = "form";
          setFormio(form);
          setFormId(form._id);
        }
      }
    );
  }, [enterpriseSurveyId]);

  const isReadOnly =
    formId !== "65f2af3242a5ac478599040d" &&
    formId !== "6544058943fc04bbf66a6325" &&
    formId !== "65a62b92691d70b0b19817da" &&
    formId !== "65f3e63442a5ac47859913d6";

  return (
    <Container className="pt-5">
      <div className="bg-light rounded-3 p-5 mb-4">
        <h4>{formio?.title}</h4>
        <div id="formio">
          {formio != null && (
            <Form
              form={formio}
              submission={formio?.submission}
              options={{
                buttonSettings: { showSubmit: true, showCancel: false },
                language: "ka",
                i18n: i18n,
                readOnly: isReadOnly,
              }}
              formReady={(form) => {
                sessionStorage.setItem("viewmode", "true");
                window.formio = form;
                // Form IDs that should skip row processing and set formview
                const specificFormIds = [
                  "65f2af3242a5ac478599040d",
                  "6544058943fc04bbf66a6325",
                  "65a62b92691d70b0b19817da",
                  "65f3e63442a5ac47859913d6",
                ];
                const currentFormId = formio?._id;
                if (specificFormIds.includes(currentFormId)) {
                  sessionStorage.setItem("formview", "true");
                } else {
                  // Give the form a moment to load data before looping rows
                  setTimeout(() => openAllEditGrids(form), 1500);
                }
              }}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default FormioFormView;
