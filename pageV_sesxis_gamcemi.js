function isEmpty(str) {
  return !str;
}

const countryIds = [];
for (let i = 0; i < data.partniorDataGrid.length; i++) {
  let countryId = data.partniorDataGrid[i]["page37"];
  if (!isEmpty(countryId)) {
    if (countryId !== 1) {
      countryIds.push(countryId);
    }
  }
}

if (countryIds.length > 0) {

  jQuery.ajax({
    url: 'http://192.168.1.244:81/api/lib/getCountiesByIds?countryIds=' + countryIds,
    success: function (result) {
      values = result;
    },
    async: false
  });

} else {
  values = countryIds;
}
