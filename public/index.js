const app = function () {
  const url = 'https://restcountries.eu/rest/v2/all';


   makeRequest(url, requestComplete);

   const dropDownList = document.querySelector('select');
   dropDownList.addEventListener('change', onOptionSelection);


  // const countryButton = document.querySelector('#country-button');
  // countryButton.addEventListener('click', function () { //only run this fucntion when click happens
  //   makeRequest(url, requestComplete);

};

let countries = [];

//could also use this but the above is better
// const handleButtonClick = function () {
//   const url = 'https://restcountries.eu/rest/v2/all';
//   makeRequest(url, requestComplete;)
// }

const makeRequest = function (url, callback) { //callback now refers to requestComplete
  //create a request object, comes with V8/JS
  const request = new XMLHttpRequest();
  //initialize it, just setting it for now
  request.open( 'GET', url ); //http verb + url up there, 'POST'
  request.send(); //if you were making a POST request, you'd put data as a parameter
  //this is gonna take a little bit of time so now a do the callback
  request.addEventListener('load', callback); //event + behaviour

}

const requestComplete = function() {
  if (this.status !== 200) return; //refers to request
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  // populateList(countries);
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
  info.innerText = "Country: " + selectedCountry.name + ", Population: " + selectedCountry.population;
}

document.addEventListener('DOMContentLoaded', app);
