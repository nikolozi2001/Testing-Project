const defaultStatData = {
  title: "პირადი სტატისტიკოსი",
  fullName: "John Doe",
  tel: "+1234567890",
  image: "https://questionnaires.geostat.ge/static/media/avatar.040c0cf817808ec9b00e2fea13a76b1f.svg",
};

function getUpdatedStatistician() {
  try {
    const rawData = sessionStorage.getItem("setFooterUsers");
    if (!rawData) return defaultStatData;

    const users = JSON.parse(rawData);
    const found = users.find(u => u.surveyName === "მონაცემები შრომის შესახებ");

    if (found) {
      return {
        ...defaultStatData,
        fullName: found.interviewerFullName || defaultStatData.fullName,
        tel: found.mobile || defaultStatData.tel,
      };
    }
  } catch (e) {
    console.error("Session data error:", e);
  }
  return defaultStatData;
}

function renderStatisticianV2() {
  const data = getUpdatedStatistician();
  const container = document.getElementById("statistician-info");

  if (!container) return;

  container.innerHTML = `
    <div class="ps_v2-card-container"> 
      <div class="ps_v2-card">
        <h3 class="ps_v2-title">${data.title}</h3>
        <img src="${data.image}" alt="${data.fullName}" class="ps_v2-image">
        <p class="ps_v2-name">${data.fullName}</p>
        <p class="ps_v2-tel">
          <i class="fa fa-phone"></i> ${data.tel}
        </p>
      </div>
    </div>
  `;
}

renderStatisticianV2();

