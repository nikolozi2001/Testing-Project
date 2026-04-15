var id = window.location.href.split("/").pop();
var fieldKey = instance.component.key;

// 🔧 CONFIG (მხოლოდ ეს შეცვალე საჭიროების მიხედვით)
var UNIQUE_KEY = "sidCode"; // ან "id", "uuid" და ა.შ.

window.workSurvData = window.workSurvData || {};
window._fetchStarted = window._fetchStarted || {};

value = 0;

// --- FETCH ერთხელ ---
if (id && !window._fetchStarted[id]) {
  window._fetchStarted[id] = true;

  fetch("/api/enterprise/prev-work-survey-data?enterpriseSurveyId=" + id, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("DATA LOADED:", data);

      // 🔥 გადავაქციოთ map-ად (O(1) lookup)
      var map = {};
      data.forEach(item => {
        if (item[UNIQUE_KEY] != null) {
          map[item[UNIQUE_KEY]] = item;
        }
      });

      window.workSurvData[id] = map;

      instance.redraw();
    })
    .catch(err => {
      console.error("ERROR:", err);
      window.workSurvData[id] = {};
    });
}

// --- GET CURRENT ROW ---
var currentRow = instance.row || instance.data;

// --- GET MAP ---
var map = window.workSurvData[id];

// --- MATCH ---
var matchedRow = currentRow && map
  ? map[currentRow[UNIQUE_KEY]]
  : null;

// --- VALUE ---
value = matchedRow && matchedRow[fieldKey] != null
  ? matchedRow[fieldKey]
  : 0;