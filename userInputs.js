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
