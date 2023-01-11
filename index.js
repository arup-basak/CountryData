const countries_elem = document.querySelector(".countries");

function getCountry(country, capital, language) {
  return `<div class="country_container">
            <span class="country_name">${country}</span>
            <span class="country_capital">${capital}</span>
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
  console.log(result[0]);

  let country = "",
    capital = "";
  for (let i = 0; i < result.length; i++) {
    if (result[i].independent == true) {
      country = result[i].name.common;
      capital = arrToString(result[i].capital);
      countries_elem.innerHTML += getCountry(country, capital);
    }
  }
}

loadJson();
