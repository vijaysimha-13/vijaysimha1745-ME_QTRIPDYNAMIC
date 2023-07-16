import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  const params = new URLSearchParams(search);
  const adventureId = params.get("adventure");
  console.log(adventureId);
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let data;
  try{
    const res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    data = await res.json();
  }
  catch(err){
    data = null;
  }
  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const adventureNameDiv = document.getElementById('adventure-name');
  adventureNameDiv.textContent = adventure.name;

  const adventureSubDiv = document.getElementById('adventure-subtitle');
  adventureSubDiv.textContent = adventure.subtitle;

  const photoGalleryDiv = document.getElementById('photo-gallery');

  adventure.images.forEach(image => {

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('activity-card');

    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image);
    imageElem.classList.add('activity-card-image');

    imageDiv.appendChild(imageElem);

    photoGalleryDiv.appendChild(imageDiv);
  });

  const adventureContDiv = document.getElementById('adventure-content');
  adventureContDiv.textContent = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGalleryDiv = document.getElementById('photo-gallery');
  photoGalleryDiv.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-div">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`;

  const carouselInner = document.getElementById('carousel-div');
  
  images.forEach((image, index) => {
    const divElem = document.createElement('div');
    divElem.classList.add('carousel-item');
    if(index == 0){
      divElem.classList.add('active');
    }

    divElem.innerHTML = `
    <img src=${image} class="d-block w-100 activity-card-image" alt="...">
    `;

    carouselInner.appendChild(divElem);
  })



}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const resAvailPanel = document.getElementById('reservation-panel-available');
  const resSoldOutPanel = document.getElementById('reservation-panel-sold-out');

  if(adventure.available){
    resSoldOutPanel.style.display = "none";
    resAvailPanel.style.display = "block";
    const resPersonCost = document.getElementById('reservation-person-cost');
    resPersonCost.innerHTML = String(adventure.costPerHead);
  }
  else{
    resSoldOutPanel.style.display = 'block';
    resAvailPanel.style.display = 'none';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const resCost = document.getElementById('reservation-cost');
  resCost.innerHTML = String(persons * adventure.costPerHead);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const formDiv = document.getElementById('myForm');

  const nameInputDiv = document.querySelector(".form-control[name=name]");
  const dateInputDiv = document.querySelector(".form-control[name=date]");
  const personInputDiv = document.querySelector(".form-control[name=person]");

  
  // const options = ;

  // const reserveBtn = document.querySelector(".reserve-button[type=submit]");
  
  formDiv.addEventListener('submit', async (event) => {
    event.preventDefault();
    const infoObj = {
      name: nameInputDiv.value,
      date: dateInputDiv.value,
      person: personInputDiv.value,
      adventure: adventure.id
    };  
    try{
      let data = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoObj)
      });
      if(data.ok){
        alert('Success!');
        window.location.reload();
      }
      else{
        alert('Failed!');
      }
      
    }catch(err){
      alert('Failed!');
      console.log(err);
    }
    });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const resBannerDiv = document.getElementById('reserved-banner');
  if(adventure.reserved){
    resBannerDiv.style.display = 'block';
  }
  else{
    resBannerDiv.style.display = 'none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
