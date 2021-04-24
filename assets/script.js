//global variables
let timeDisplay = $("#time-display");
let projectForm = $("#project-form");
let projectDisplay = $("#project-display");
let projectModal = $("#project-modal");

//funcitons

//delete row
function deleteRow(event) {
  //remove row from DOM
  let btnClicked = $(event.target);
  btnClicked.parent("tr").remove();
}

//get form data
function getFormData(event) {
  event.preventDefault();

  //grab data and save it to variables
  let projectName = $("#project-name-input").val().trim();
  let projectType = $("#project-name-input").val().trim();
  let hourlyRate = $("#hourly-rate-input").val().trim();
  let dueDate = $("#due-date-input").val().trim();
  //show form data
  showFormData(projectName, projectType, hourlyRate, dueDate);

  //clear the form
  projectForm[0].reset();
}

//show the form data in the table
function showFormData(name, type, rate, date) {
  //determine value cells
  let daysRemaining = moment(date, "MM/DD/YYYY").diff(moment(), "days");
  let possibleMoney = rate * 8 * daysRemaining;

  // add the row to the table and put the name in the first cell
  let tableRow = $("<tr>");

  //add data to table cells
  let nameTD = $("<td>").addClass("p-2").text(name);
  let typeTD = $("<td>").addClass("p-2").text(type);
  let rateTD = $("<td>").addClass("p-2").text(rate);
  let dateTD = $("<td>").addClass("p-2").text(date);
  let daysRemainingTD = $("<td>").addClass("p-2").text(daysRemaining);
  let possibleMoneyTD = $("<td>").addClass("p-2").text(`$${possibleMoney}`);
  let deleteBtnTD = $("<td>")
    .addClass("p-2 delete-project-btn text-center js-delete-btn")
    .text("x");

  //append tds to row
  tableRow.append(
    nameTD,
    typeTD,
    rateTD,
    dateTD,
    daysRemainingTD,
    possibleMoneyTD,
    deleteBtnTD
  );

  // close the modal
  projectModal.modal("hide");

  //append row to the table
  projectDisplay.append(tableRow);
}

//show time
function displayTime() {
  //replace div with new time
  let rightNow = moment().format("MMM Do, YYYY [at] hh:mm:ss a");
  timeDisplay.text(rightNow);
}

//init
function init() {
  setInterval(displayTime, 1000);
}

//event listeners
init();
projectForm.on("submit", getFormData);
projectDisplay.on("click", ".js-delete-btn", deleteRow);

//show date picker
$(function () {
  $("#due-date-input").datepicker();
});
