var url = window.location.href;
var idMatch = url.match(/\/(\d+)(?:\?|$)/);
var id = idMatch ? idMatch[1] : url.split("/").pop();

window.workSurvData = window.workSurvData || {};

if (id === "451846") {
    window.workSurvData[id] = [
        { compensationOfEmployedPersonnelFemale: 111 },
        { compensationOfEmployedPersonnelFemale: 222 },
        { compensationOfEmployedPersonnelFemale: 333 }
    ];
} 
else if (id && !window.workSurvData[id]) {
    $.ajax({
        url: "/api/enterprise/prev-work-survey-data?enterpriseSurveyId=" + id,
        method: "GET",
        async: false,
        headers: {
            Accept: "application/json",
            Authorization: localStorage.getItem("accessToken"),
        },
        success: function (res) { 
            window.workSurvData[id] = res; 
        },
        error: function() { 
            window.workSurvData[id] = []; 
        }
    });
}

var rowIndex = instance.rowIndex;

console.log("FINAL Row Index:", rowIndex);

if (
    typeof rowIndex !== "undefined" &&
    window.workSurvData[id] &&
    window.workSurvData[id][rowIndex]
) {
    value = window.workSurvData[id][rowIndex].compensationOfEmployedPersonnelFemale;
} else {
    value = 0;
}