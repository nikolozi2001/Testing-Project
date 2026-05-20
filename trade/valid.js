let uniqueCombinations = new Set();

for (let i = 0; i < data.page2SaqonlisRemonti.length; i++) {
  const country = data.page2SaqonlisRemonti[i]["page45"].value;
  const currency = data.page2SaqonlisRemonti[i]["page7"].value;
  const combination = `${country}_${currency}`;

  if (uniqueCombinations.has(combination)) {
    valid =
      "რომელიმე მომსახურება კონკრეტული ქვეყნიდან და კონკრეტულ ვალუტაში, მხოლოდ ერთხელ უნდა შეივსოს მთლიანი თანხის მითითებით !";
    break;
  } else {
    uniqueCombinations.add(combination);
  }
}


let uniqueCombinations = new Set();
result = false;

for (let i = 0; i < data.page2SaqonlisRemonti.length; i++) {
  const country = data.page2SaqonlisRemonti[i].page45;
  const currency = data.page2SaqonlisRemonti[i].page7;
  const combination = `${country}_${currency}`;

  if (uniqueCombinations.has(combination)) {
    result = true;
    break;
  } else {
    uniqueCombinations.add(combination);
  }
}

