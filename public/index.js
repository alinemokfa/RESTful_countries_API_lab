const app = function () {
  const url = 'https://restcountries.eu/rest/v2/all';

   makeRequest(url, requestComplete);

   const dropDownList = document.querySelector('select');
   dropDownList.addEventListener('change', onOptionSelection);

   // const persistingCountries = JSON.parse(localStorage.getItem('countrySelected')) || [];
   // populateList(persistingCountries);

};

let countries = [];

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open( 'GET', url );
  request.send();
  request.addEventListener('load', callback);

}

const requestComplete = function() {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateDropdownMenu(countries);
}

const populateList = function (countries) {
  const ul = document.querySelector('#country-list');
  countries.forEach(function(country){
    const li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  })
}

const populateDropdownMenu = function (countries) {
  const select = document.querySelector('#country-selection');
  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

const onOptionSelection = function() {
  const selectedIndex = this.value;
  const selectedCountry = countries[selectedIndex];
  const info = document.querySelector('#info')
  info.innerText = "Country: " + selectedCountry.name + ", Population: " + selectedCountry.population + ", Capital City: " + selectedCountry.capital;
  save(selectedCountry);
}

const save = function(item) {
  localStorage.clear();
  const persistingCountries = JSON.parse(localStorage.getItem('countrySelected')) || [];
  persistingCountries.push(item);
  const jsonStringArray = JSON.stringify(persistingCountries);
  localStorage.setItem('countrySelected', jsonStringArray);
}

document.addEventListener('DOMContentLoaded', app);
