let uniqueCombinations = new Set();

for (let i = 0; i < data.page2msheneblobaArarezidenti.length; i++) {
  const country = data.page2msheneblobaArarezidenti[i]["page66"].value;
  const currency = data.page2msheneblobaArarezidenti[i]["page67"].value;
  const combination = `${country}_${currency}`;

  if (uniqueCombinations.has(combination)) {
    valid = "რომელიმე მომსახურება კონკრეტული ქვეყნიდან და კონკრეტულ ვალუტაში, მხოლოდ ერთხელ უნდა შეივსოს მთლიანი თანხის მითითებით !";
    break;
  } else {
    uniqueCombinations.add(combination);
  }
}
