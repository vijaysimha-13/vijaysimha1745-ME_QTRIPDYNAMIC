import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let data;
  try{
    let res = await fetch(`${config.backendEndpoint}/reservations/`);
    data = await res.json();
  }
  catch(err){
    data = null;
  }

  // Place holder for functionality to work in the Stubs
  return data;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  const noResBanner = document.getElementById('no-reservation-banner');
  const resTablePar = document.getElementById('reservation-table-parent');

  if(reservations.length == 0){
    noResBanner.style.display = 'block';
    resTablePar.style.display = 'none';
  }
  else{
    noResBanner.style.display = 'none';
    resTablePar.style.display = 'block';
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const resTable = document.getElementById('reservation-table');

  reservations.forEach((reservation) => {

    const tableRow = document.createElement('tr');

    const date = new Date(reservation.date);
    const bookingDate = new Date(reservation.time);
    const optionOne = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const optionTwo = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }
    let dateText = date.toLocaleDateString("en-IN");
    let bookingDateText = bookingDate.toLocaleString('en-IN', optionOne) + ", " + bookingDate.toLocaleString('en-IN', optionTwo);
    
    tableRow.innerHTML = `
    <td><a href='../detail/?adventure=${reservation.adventure}'>${reservation.id}</a></td>
    <td>${reservation.name}</td>
    <td>${reservation.adventureName}</td>
    <td>${reservation.person}</td>
    <td>${dateText}</td>
    <td>${reservation.price}</td>
    <td>${bookingDateText}</td>
    <td><button class="reservation-visit-button" id=${reservation.id}><a href='../detail/?adventure=${reservation.adventure}'>Visit Adventure</a></button></td>
    `;

    resTable.appendChild(tableRow);
  })

}

export { fetchReservations, addReservationToTable };
