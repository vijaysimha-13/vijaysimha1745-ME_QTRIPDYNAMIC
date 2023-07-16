import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let data;
  try{
    let res = await fetch(`${config.backendEndpoint}/cities`);
    data = await res.json();
  }
  catch(err){
    data = null;
  }
  finally{
    return data;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let dataDiv = document.getElementById("data");

  let colDiv = document.createElement("div");
  colDiv.classList.add("col-6");
  colDiv.classList.add("col-md-4");
  colDiv.classList.add("col-lg-3");
  colDiv.classList.add("mb-4");

  colDiv.innerHTML = `
  <a href="pages/adventures/?city=${id}" id=${id}>
  <div class="tile">
  <img src=${image} alt=${city}>
  <div class="tile-text text-center">
  <h5>${city}</h5>
  <p>${description}</p>
  </div>
  </div>
  </a>
  `;

  dataDiv.appendChild(colDiv);

}

export { init, fetchCities, addCityToDOM };
