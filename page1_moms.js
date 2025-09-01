value = "";
if (row.page3sxva_saqmiani_moms2_saxe) {
  value = "10." + row.page3sxva_saqmiani_moms2_saxe;
}

// სხვა კოდი

value = "";
if (row.mshenebloba_mSaxe) {
  let selectComponent = row.mshenebloba_mSaxe;

  if (selectComponent === 1) {
    value = "4.0";
  } else if (selectComponent === 2) {
    value = "4.1";
  } else if (selectComponent === 3) {
    value = "4.2";
  } else if (selectComponent === 4) {
    value = "2.3.2.2";
  } else if (selectComponent === 5) {
    value = "2.3.2.3";
  } else if (selectComponent === 6) {
    value = "2.3.2.4";
  } else if (selectComponent === 7) {
    value = "2.3.3";
  }
}
