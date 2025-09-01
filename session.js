let p5radio = row["pageV2Radio"];

const currentValue = sessionStorage.getItem("p5radio");

if (currentValue && currentValue !== p5radio) {
  sessionStorage.removeItem("p5radio");
}

sessionStorage.setItem("p5radio", p5radio);
