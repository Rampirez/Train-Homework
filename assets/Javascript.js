//beginning variable initialization
var trainName = "";
var trainTime = "";
var destinationName = "";
var firstTrainTime = "";
var trainFrequency = "";
var trains = [];

var firebaseConfig = {
  apiKey: "AIzaSyCbQKmFPowskeXAdsmvUZnjqs35ejkWZtk",
  authDomain: "train-homework-f8d54.firebaseapp.com",
  databaseURL: "https://train-homework-f8d54.firebaseio.com",
  projectId: "train-homework-f8d54",
  storageBucket: "train-homework-f8d54.appspot.com",
  messagingSenderId: "1046173740632",
  appId: "1:1046173740632:web:b3dc3adfbadd03f7ba642d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//this sets initial current time
var currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
$("#currentTime").text(currentTime);

//this sets current time at an interval
setInterval(currentTimeInterval, 1000);

//this sets current time
function currentTimeInterval() {
  currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  $("#currentTime").text(currentTime);
}

//this function stores all data
function storeData() {
  trainName = $("#Train-Name").val();
  destinationName = $("#Destination-Name").val();
  firstTrainTime = $("#First-Time").val();
  trainFrequency = $("#Frequency").val();
}

//this empties textboxes
function emptyEntries() {
  $("#Train-Name").val("");
  $("#Destination-Name").val("");
  $("#First-Time").val("");
  $("#Frequency").val("");
}

//this creates a new train
function newTrain() {
  var newTrain = {
    trainName: trainName,
    destinationName: destinationName,
    firstTrainTime: firstTrainTime,
    trainFrequency: trainFrequency
  };

  //push to database
  database.ref().push(newTrain);
}

//this function displays train info
function displayTrainInfo() {
  var nextTrain = timeTilNextTrain();

  for (var i = 0; i < trains.length; i++) {
    console.log(trains[i].trainName);
    var newRow = $("<tr>").append(
      $("<td>").text(trains[i].trainName),
      $("<td>").text(trains[i].destinationName),
      $("<td>").text(trains[i].firstTrainTime),
      $("<td>").text(moment(nextTrain).format("hh:mm"))
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  }
}

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destinationName = childSnapshot.val().destinationName;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var trainFrequency = childSnapshot.val().trainFrequency;

  var nextTrain = timeTilNextTrain(trainFrequency, firstTrainTime);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationName),
    $("<td>").text(firstTrainTime),
    $("<td>").text(moment(nextTrain).format("hh:mm"))
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

//this code calculates time remaining for trains
function timeTilNextTrain(trainFrequency, firstTrainTime) {
  // Assumptions
  var tFrequency = trainFrequency;

  // Time is 3:30 AM
  var firstTime = firstTrainTime;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var timern = moment();
  console.log("CURRENT TIME: " + moment(timern).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  return nextTrain;
}

$(".addTrain").on("click", function(event) {
  event.preventDefault();
  storeData();
  newTrain();
  //displayTrainInfo();
  emptyEntries();
});
