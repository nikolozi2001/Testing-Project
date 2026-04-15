// 1. საჭირო ცვლადების განსაზღვრა
var id = window.location.href.split("/").pop();
var fieldKey = "compensationOfEmployedPersonnelFemale";
var rowIndex = instance.rowIndex;

// გლობალური ობიექტის ინიციალიზაცია (თუ არ არსებობს)
window.workSurvCache = window.workSurvCache || {
  data: {},
  loading: {}
};

// 2. ფუნქცია მონაცემების წამოსაღებად
var fetchData = function(surveyId) {
  // თუ უკვე იტვირთება ან უკვე გვაქვს მონაცემები, აღარ გავაგზავნოთ
  if (window.workSurvCache.loading[surveyId] || window.workSurvCache.data[surveyId]) {
    return;
  }

  window.workSurvCache.loading[surveyId] = true;

  $.ajax({
    url: "/api/enterprise/prev-work-survey-data?enterpriseSurveyId=" + surveyId,
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": localStorage.getItem("accessToken"),
    },
    success: function (res) {
      window.workSurvCache.data[surveyId] = res;
      window.workSurvCache.loading[surveyId] = false;
      // ვატყობინებთ ფორმას, რომ მონაცემები მოვიდა და საჭიროა გადათვლა
      instance.emit('change'); 
    },
    error: function () {
      window.workSurvCache.data[surveyId] = [];
      window.workSurvCache.loading[surveyId] = false;
    },
  });
};

// 3. ლოგიკა მნიშვნელობის დასაბრუნებლად
if (id) {
  var cachedData = window.workSurvCache.data[id];

  if (cachedData) {
    // თუ მონაცემები უკვე გვაქვს ქეშში
    var surveyRow = cachedData[rowIndex];
    value = (surveyRow && surveyRow[fieldKey] != null) ? surveyRow[fieldKey] : 0;
  } else {
    // თუ მონაცემები ჯერ არ გვაქვს, ვიწყებთ ჩატვირთვას
    fetchData(id);
    value = 0; // დროებითი მნიშვნელობა ჩატვირთვამდე
  }
} else {
  value = 0;
}