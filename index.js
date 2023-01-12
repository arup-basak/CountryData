// Main File: index.html
//container initialization
const container = document.querySelector(".container");
const urlDomain = "https://restcountries.com";
const apiVersion = 3.1
const url = `${urlDomain}/v${apiVersion}/all`

// Default Object that Stores Region data as Array
const data = {
  Asia: [],
  Europe: [],
  Africa: [],
  Americas: [],
  Oceania: [],
};

// Return a String that containes HTML of element
function getContinent(continent, countries) {//Input String, Array
  // create a empty string
  let countryElement = "";

  // For Each countries create element
  countries.forEach((elem) => {
    countryElement += `  
    <div class="country_container">
      <span class="country_name">${elem[0]}</span>
      <span class="country_capital">${elem[1]}</span>
    </div>    
      `;
  });

  // Return a HTML String of continent
  return `
  <div class="continent">
    <span class="continent_name">${continent}</span>
    <div class="countries">
      ${countryElement}
    </div>
  </div>`;
}

function arrToString(array) {
  let str = "";
  try {
    array.forEach((element) => {
      str += element + ", ";
    });
    return str.substring(0, str.length - 2);
  } catch (e) {
    return str;
  }
}

async function loadJson() {
  // Fetch URL
  const response = await fetch(url);
  const result = await response.json();

  // for Each JSON result...
  // deine the DATA object
  result.forEach((element) => {
    if (element.independent == true) {
      data[element.region].push([
        element.name.common,
        arrToString(element.capital),
      ]);
    }
  });

  for (const [key, value] of Object.entries(data)) {
    container.innerHTML += getContinent(key, value);
  }
}

loadJson();
