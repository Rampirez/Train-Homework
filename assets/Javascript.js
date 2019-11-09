//beginning variable initialization
var trainTime = "";
var destinationName = "";
var firstTrainTime = "";
var trainFrequency = "";
var trains = [];

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

$(".addTrain").on("click", function(event) {
    event.preventDefault();
    storeData();
    newTrain();
    displayTrainInfo();
});