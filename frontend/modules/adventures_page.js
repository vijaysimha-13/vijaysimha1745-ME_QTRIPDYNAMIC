
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const cityName = params.get("city");
  return cityName;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let data;
  try{
    let res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    data = await res.json();
  }
  catch(err){
    data = null;
  }
  console.log(data);
  return data;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowDiv = document.getElementById('data');

  adventures.forEach(element => {
    let colDiv = document.createElement('div');
    colDiv.classList.add("col-12");
    colDiv.classList.add("col-sm-6");
    colDiv.classList.add("col-lg-3");
    colDiv.classList.add("mb-3");

     colDiv.innerHTML = `
    <a id="${element.id}" href="detail/?adventure=${element.id}">
    <div class="card activity-card">

    <img src="${element.image}">

    <div class="category-banner">${element.category}</div>
    
    <div class="card-body card-footer col-md-12 mt-2">
    
    <div class="d-flex justify-content-between">
    <p>${element.name}</p>
    <p>₹${element.costPerHead}</p>
    </div>
    
    <div class="d-flex justify-content-between">
    <p>Duration</p>
    <p>${element.duration} Hours</p>
    </div>

    </div>

    </div>
    </a>
    `;

    rowDiv.appendChild(colDiv);
  });

  

 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item => (item.duration >= low && item.duration <= high));
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(item => categoryList.includes(item.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category != undefined || filters.category.length > 0){
    list = filterByCategory(list, filters.category);
  }

  if(filters.duration != ""){
    let durArray = filters.duration.split("-");
    let minHours = parseInt(durArray[0]);
    let maxHours;
    if(durArray.length == 1){
      maxHours = Infinity;
    }
    else{
      maxHours = parseInt(durArray[1]);
    }
    list = filterByDuration(list,minHours, maxHours);

    return list;
  }
  console.log(list);

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const durationSelector = document.getElementById('duration-select');
  durationSelector.selectedIndex = durationSelector.selectedIndex;
  
  const categoryListDiv = document.getElementById("category-list");

  filters.category.forEach(item => {
    let div = document.createElement('div');
    div.classList.add("category-filter");
    div.innerText = item;
    categoryListDiv.appendChild(div);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
