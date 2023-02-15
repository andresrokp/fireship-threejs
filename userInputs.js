import { resetAirplane } from "./main";
import { places } from "./mocks";

// reset button action
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', resetAirplane)

// lat lon button action
const goButton = document.getElementById('go-btn');
goButton.addEventListener('click',(e)=>{
  const lat = parseFloat(document.getElementById('lat-text').value);
  const lon = parseFloat(document.getElementById('lon-text').value);
  console.log(latLonToSphere(lat, lon));
})

// coordinate transformation helper
function latLonToSphere(latitude, longitude) {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = longitude * (Math.PI / 180);
  return {phi, theta};
}

const countrySelector = document.getElementById('country-selector');
const citySelector = document.getElementById('city-selector');
const cityActionBtn = document.getElementById('city-button');

places.forEach(p => {
    const option = new Option(p.name,p.name);
    countrySelector.appendChild(option);
})

countrySelector.addEventListener('change',function(){
  const selectedCountryName = this.value
  console.log(selectedCountryName)
  const selectedCountryData = places.find(data => data.name == selectedCountryName);
  selectedCountryData.cities.forEach(c => {
    const option = new Option(c.name,c.name);
    citySelector.appendChild(option);
  })
  citySelector.removeAttribute('disabled')
})