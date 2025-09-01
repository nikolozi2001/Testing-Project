var statistician = {
  title: "პირადი სტატისტიკოსი",
  fullName: "John Doe",
  tel: "+1234567890",
  image:
    "https://questionnaires.geostat.ge/static/media/avatar.040c0cf817808ec9b00e2fea13a76b1f.svg",
};

const footerUsersString = sessionStorage.getItem("setFooterUsers");

if (footerUsersString) {
  const footerUsers = JSON.parse(footerUsersString);

  const foundUser = footerUsers.find(
    (user) => user.surveyName === "მონაცემები შრომის შესახებ"
  );

  if (foundUser) {
    statistician.fullName = foundUser.interviewerFullName;
    statistician.tel = foundUser.mobile;
  }
} else {
  console.error("No footer users found in session storage.");
}

var statisticianHTML =
  '<div class="statistician-card"><h3>' +
  statistician.title +
  '</h3><img src="' +
  statistician.image +
  '" alt="' +
  statistician.fullName +
  '" style="width: 150px; height: 150px;"><p><strong></strong> ' +
  statistician.fullName +
  '</p><p><strong><i class="fa fa-phone" style="font-size:24px"></i> </strong> ' +
  statistician.tel +
  "</p></div>";

document.getElementById("statistician-info").innerHTML = statisticianHTML;
