if (row.page5column1 && row.page5column1.label) {
  var match = row.page5column1.label.match(/\d+/);
  value = match ? match[0] : '';
}
