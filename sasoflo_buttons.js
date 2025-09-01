const enterpriseId = sessionStorage.getItem("enterpriseId");

if (enterpriseId) {
  window.location.href = "https://questionnaires.geostat.ge/enterprises/" + enterpriseId;
} else {
  console.error("Enterprise ID not found in sessionStorage");
}
