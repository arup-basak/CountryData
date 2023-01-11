const countries_elem = document.querySelector(".container");

const data = {
  Asia: [],
  Europe: [],
  Africa: [],
  Americas: [],
  Oceania: [],
};

function getCountry(country, capital) {
  return `  
    <div class="country_container">
      <span class="country_name">${country}</span>
      <span class="country_capital">${capital}</span>
    </div>    
      `;
}

function getCountries(arr) {
  let str = "";
  arr.forEach((elem) => {
    str += getCountry(elem[0], elem[1]);
  });
  return str;
}

function getContinent(continent, countries) {
  return `
  <div class="continent">
    <span class="continent_name">${continent}</span>
    <div class="countries">
      ${getCountries(countries)}
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
  const response = await fetch("https://restcountries.com/v3.1/all");
  const result = await response.json();
  // console.log(result);

  result.forEach((element) => {
    if (element.independent == true) {
      data[element.region].push([
        element.name.common,
        arrToString(element.capital),
      ]);
    }
  });

  for (const [key, value] of Object.entries(data)) {
    countries_elem.innerHTML += getContinent(key, value);
    // console.log(key)
  }
}

loadJson();
