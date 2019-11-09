//beginning variable initialization
var trainTime = "";
var destinationName = "";
var firstTrainTime = "";
var trainFrequency = "";
var trains = [];

var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
$('#currentTime').text(currentTime);

//this function stores all data
function storeData() {
    trainName = $('#Train-Name').val();
    destinationName = $('#Destination-Name').val();
    firstTrainTime = $('#First-Time').val();
    trainFrequency = $('#Frequency').val();
}

//this creates a new train
function newTrain() {
    trains.push(trainName = {
        trainName, 
        destinationName,
        firstTrainTime,
        trainFrequency
    })
}

//this function displays train info
function displayTrainInfo() {
    for (var i = 0; i < trains.length; i++) {
        console.log(trains[i].trainName);
        $('#trainInfo').append(trains[i].trainName);
    }
}

//this code calculates time remaining for trains
function timeTilNextTrain() {
    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

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
}

$(".addTrain").on("click", function(event) {
    event.preventDefault();
    storeData();
    newTrain();
    displayTrainInfo();
});