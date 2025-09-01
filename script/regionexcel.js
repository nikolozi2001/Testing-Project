const municipalitiesEn = [
    { id: 1, name: "Adjara" },
    { id: 2, name: "Guria" },
    { id: 3, name: "C.%20Tbilisi" },
    { id: 4, name: "Imereti" },
    { id: 5, name: "Kakheti" },
    { id: 6, name: "Mtskheta-Mtianeti" },
    { id: 7, name: "Racha-Lechkhumi%20and%20Kvemo%20Svaneti" },
    { id: 8, name: "Samegrelo-Zemo%20Svaneti" },
    { id: 9, name: "Samtskhe-Javakheti" },
    { id: 10, name: "Kvemo%20Kartli" },
    { id: 11, name: "Shida%20Kartli" },
  ];
  
  const municipalitiesKa = [
    { id: 1, name: "აჭარა" },
    { id: 2, name: "გურია" },
    { id: 3, name: "ქ.%20თბილისი" },
    { id: 4, name: "იმერეთი" },
    { id: 5, name: "კახეთი" },
    { id: 6, name: "მცხეთა-მთიანეთი" },
    { id: 7, name: "რაჭა-ლეჩხუმი%20და%20ქვემო%20სვანეთი" },
    { id: 8, name: "სამეგრელო-ზემო%20სვანეთი" },
    { id: 9, name: "სამცხე-ჯავახეთი" },
    { id: 10, name: "ქვემო%20ქართლი" },
    { id: 11, name: "შიდა%20ქართლი" },
  ];
  
  const regionKey = [
    { id: 1, name: "adjara" },
    { id: 2, name: "guria" },
    { id: 3, name: "Tbilisi" },
    { id: 4, name: "imereti" },
    { id: 5, name: "Kakheti" },
    { id: 6, name: "mtskheta_mtianeti" },
    { id: 7, name: "Racha" },
    { id: 8, name: "Samegrelo" },
    { id: 9, name: "samtskhe_javakheti" },
    { id: 10, name: "kvemo_kartli" },
    { id: 11, name: "shida_kartli" },
  ];
  
  const linkData = {
    forlinks: {},
    // Other categories can be added here...
  };
  
  // Populate linkData dynamically
  municipalitiesEn.forEach((municipality, index) => {
    const municipalityKey = regionKey[index].name; // e.g., "batumi"
    const kaMunicipalityName = municipalitiesKa[index].name; // Corresponding name in Georgian
  
    linkData.forlinks[municipalityKey] = {
      ka: `/regions/regions/მოსახლეობის%20აღწერა%20წინასწარი/მოსახლეობა%20სქესის%20მიხედვით/${kaMunicipalityName}.xlsx`,
      en: `/regions/regionseng/Population%20census%20pre/number%20of%20population%20by%20sex/${municipality.name}.xlsx`,
    };
  
    // Log the municipality and its generated links
    // console.log(
    //   `Municipality: ${municipality.name}, Path (KA): ${linkData.forlinks[municipalityKey].ka}, Path (EN): ${linkData.forlinks[municipalityKey].en}`
    // );
  });
  
  // Output the complete linkData structure
  console.log(linkData);
  