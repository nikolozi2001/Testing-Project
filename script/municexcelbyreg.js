const municipalitiesEn = [
  { id: 1, name: "Batumi" },
  { id: 2, name: "Keda" },
  { id: 3, name: "Kobuleti" },
  { id: 4, name: "Shuakhevi" },
  { id: 5, name: "Khelvachauri" },
  { id: 6, name: "Khulo" },
  { id: 7, name: "Abasha" },
  { id: 8, name: "Zugdidi" },
  { id: 9, name: "Martvili" },
  { id: 10, name: "Mestia" },
  { id: 11, name: "Senaki" },
  { id: 12, name: "Poti" },
  { id: 13, name: "Chkhorotsku" },
  { id: 14, name: "Tsalenjikha" },
  { id: 15, name: "Khobi" },
  { id: 16, name: "Lanchkhuti" },
  { id: 17, name: "Ozurgeti" },
  { id: 18, name: "Chokhatauri" },
  { id: 19, name: "Adigeni" },
  { id: 20, name: "Aspindza" },
  { id: 21, name: "Akhalkalaki" },
  { id: 22, name: "Akhaltsikhe" },
  { id: 23, name: "Borjomi" },
  { id: 24, name: "Ninotsminda" },
  { id: 25, name: "Baghdati" },
  { id: 26, name: "Vani" },
  { id: 27, name: "Zestaponi" },
  { id: 28, name: "Terjola" },
  { id: 29, name: "Samtredia" },
  { id: 30, name: "Sachkhere" },
  { id: 31, name: "Tkibuli" },
  { id: 32, name: "Kutaisi" },
  { id: 33, name: "Tskaltubo" },
  { id: 34, name: "Chiatura" },
  { id: 35, name: "Kharagauli" },
  { id: 36, name: "Khoni" },
  { id: 37, name: "Ambrolauri" },
  { id: 38, name: "Lentekhi" },
  { id: 39, name: "Oni" },
  { id: 40, name: "Tsageri" },
  { id: 41, name: "Bolnisi" },
  { id: 42, name: "Gardabani" },
  { id: 43, name: "Dmanisi" },
  { id: 44, name: "Tetritskaro" },
  { id: 45, name: "Marneuli" },
  { id: 46, name: "Rustavi" },
  { id: 47, name: "Tsalka" },
  { id: 48, name: "Gori" },
  { id: 49, name: "Kaspi" },
  { id: 50, name: "Kareli" },
  { id: 51, name: "Khashuri" },
  { id: 52, name: "Dusheti" },
  { id: 53, name: "Tianeti" },
  { id: 54, name: "Mtskheta" },
  { id: 55, name: "Kazbegi" },
  { id: 56, name: "Tbilisi" },
  { id: 57, name: "Akhmeta" },
  { id: 58, name: "Gurjaani" },
  { id: 59, name: "Dedoplistskaro" },
  { id: 60, name: "Telavi" },
  { id: 61, name: "Lagodekhi" },
  { id: 62, name: "Sagarejo" },
  { id: 63, name: "Sighnaghi" },
  { id: 64, name: "Kvareli" },
];

const municipalitiesKa = [
  { id: 1, name: "ბათუმი" },
  { id: 2, name: "ქედა" },
  { id: 3, name: "ქობულეთი" },
  { id: 4, name: "შუახევი" },
  { id: 5, name: "ხელვაჩაური" },
  { id: 6, name: "ხულო" },
  { id: 7, name: "აბაშა" },
  { id: 8, name: "ზუგდიდი" },
  { id: 9, name: "მარტვილი" },
  { id: 10, name: "მესტია" },
  { id: 11, name: "სენაკი" },
  { id: 12, name: "ფოთი" },
  { id: 13, name: "ჩხოროწყუ" },
  { id: 14, name: "წალენჯიხა" },
  { id: 15, name: "ხობი" },
  { id: 16, name: "ლანჩხუთი" },
  { id: 17, name: "ოზურგეთი" },
  { id: 18, name: "ჩოხატაური" },
  { id: 19, name: "ადიგენი" },
  { id: 20, name: "ასპინძა" },
  { id: 21, name: "ახალქალაქი" },
  { id: 22, name: "ახალციხე" },
  { id: 23, name: "ბორჯომი" },
  { id: 24, name: "ნინოწმინდა" },
  { id: 25, name: "ბაღდათი" },
  { id: 26, name: "ვანი" },
  { id: 27, name: "ზესტაფონი" },
  { id: 28, name: "თერჯოლა" },
  { id: 29, name: "სამტრედია" },
  { id: 30, name: "საჩხერე" },
  { id: 31, name: "ტყიბული" },
  { id: 32, name: "ქუთაისი" },
  { id: 33, name: "წყალტუბო" },
  { id: 34, name: "ჭიათურა" },
  { id: 35, name: "ხარაგაული" },
  { id: 36, name: "ხონი" },
  { id: 37, name: "ამბროლაური" },
  { id: 38, name: "ლენტეხი" },
  { id: 39, name: "ონი" },
  { id: 40, name: "ცაგერი" },
  { id: 41, name: "ბოლნისი" },
  { id: 42, name: "გარდაბანი" },
  { id: 43, name: "დმანისი" },
  { id: 44, name: "თეთრიწყარო" },
  { id: 45, name: "მარნეული" },
  { id: 46, name: "რუსთავი" },
  { id: 47, name: "წალკა" },
  { id: 48, name: "გორი" },
  { id: 49, name: "კასპი" },
  { id: 50, name: "ქარელი" },
  { id: 51, name: "ხაშური" },
  { id: 52, name: "დუშეთი" },
  { id: 53, name: "თიანეთი" },
  { id: 54, name: "მცხეთა" },
  { id: 55, name: "ყაზბეგი" },
  { id: 56, name: "თბილისი" },
  { id: 57, name: "ახმეტა" },
  { id: 58, name: "გურჯაანი" },
  { id: 59, name: "დედოფლისწყარო" },
  { id: 60, name: "თელავი" },
  { id: 61, name: "ლაგოდეხი" },
  { id: 62, name: "საგარეჯო" },
  { id: 63, name: "სიღნაღი" },
  { id: 64, name: "ყვარელი" },
];

// Define region map with Georgian and English names
const regionMap = {
  guria: { en: "Guria", ka: "გურია" },
  adjara: { en: "Adjara%20A.R", ka: "აჭარა%20ა.რ" },
  imereti: { en: "Imereti", ka: "იმერეთი" },
  "Samtskhe-Javakheri": { en: "Samtskhe-Javakheti", ka: "სამცხე-ჯავახეთი" },
  Kakheti: { en: "Kakheti", ka: "კახეთი" },
  "Mtskheta-Mtianeti": { en: "Mtskheta-Mtianeti", ka: "მცხეთა-მთიანეთი" },
  kvemo_kartli: { en: "Kvemo%20Kartli", ka: "ქვემო%20ქართლი" },
  Racha: {
    en: "Racha-Lechkhumi%20and%20Kvemo%20Svaneti",
    ka: "რაჭა-ლეჩხუმი%20და%20ქვემო%20სვანეთი",
  },
  Samegrelo: { en: "Samegrelo-Zemo%20Svaneti", ka: "სამეგრელო-ზემო%20სვანეთი" },
  shida_kartli: { en: "Shida%20Kartli", ka: "შიდა%20ქართლი" },
};

// Utility function to determine region key based on municipality
function getRegionKey(municipal) {
  if (["Lanchkhuti", "Ozurgeti", "Chokhatauri"].includes(municipal)) {
    return "guria";
  } else if (
    [
      "Batumi",
      "Keda",
      "Kobuleti",
      "Khelvachauri",
      "Shuakhevi",
      "Khulo",
    ].includes(municipal)
  ) {
    return "adjara";
  } else if (
    [
      "Khoni",
      "Tskaltubo",
      "Baghdati",
      "Chiatura",
      "Kutaisi",
      "Sachkhere",
      "Samtredia",
      "Terjola",
      "Tkibuli",
      "Vani",
      "Kharagauli",
      "Zestaponi",
    ].includes(municipal)
  ) {
    return "imereti";
  } else if (
    [
      "Adigeni",
      "Aspindza",
      "Akhaltsikhe",
      "Akhalkalaki",
      "Borjomi",
      "Ninotsminda",
    ].includes(municipal)
  ) {
    return "Samtskhe-Javakheri";
  } else if (
    [
      "Akhmeta",
      "Dedoplistskaro",
      "Gurjaani",
      "Lagodekhi",
      "Sagarejo",
      "Sighnaghi",
      "Telavi",
      "Kvareli",
    ].includes(municipal)
  ) {
    return "Kakheti";
  } else if (
    ["Dusheti", "Mtskheta", "Tianeti", "Kazbegi"].includes(municipal)
  ) {
    return "Mtskheta-Mtianeti";
  } else if (
    [
      "Bolnisi",
      "Dmanisi",
      "Gardabani",
      "Marneuli",
      "Rustavi",
      "Tetritskaro",
      "Tsalka",
    ].includes(municipal)
  ) {
    return "kvemo_kartli";
  } else if (["Ambrolauri", "Tsageri", "Lentekhi", "Oni"].includes(municipal)) {
    return "Racha";
  } else if (
    [
      "Abasha",
      "Chkhorotsku",
      "Martvili",
      "Mestia",
      "Poti",
      "Senaki",
      "Tsalenjikha",
      "Khobi",
      "Zugdidi",
    ].includes(municipal)
  ) {
    return "Samegrelo";
  } else if (["Gori", "Kaspi", "Kareli", "Khashuri"].includes(municipal)) {
    return "shida_kartli";
  }
  return null;
}

const linkData = { forlinks: {} };

// Populate linkData dynamically
municipalitiesEn.forEach((municipality, index) => {
  // const municipalityKey = municipality.name.toLowerCase(); // e.g., "batumi"
  const municipalityKey =
    municipality.name.charAt(0).toUpperCase() +
    municipality.name.slice(1).toLowerCase();

  const kaMunicipalityName = municipalitiesKa[index].name; // Corresponding name in Georgian
  const regionKey = getRegionKey(municipalityKey);

  if (regionKey && regionMap[regionKey]) {
    linkData.forlinks[municipalityKey] = {
      ka: `/regions/municipal/განათლება/დირექტორები/${regionMap[regionKey].ka}/${kaMunicipalityName}ს%20მუნიციპალიტეტი.xlsx`,
      en: `/regions/municipal/ENG/Education/Directors/${regionMap[regionKey].en}/${municipality.name}%20Municipality.xlsx`,
    };
  }
});

console.log(linkData);
