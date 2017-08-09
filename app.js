$(document).ready(function(){	
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCPoccIhJxqSEB7Mnq2Y2EaTrvIgR6zCmE",
    authDomain: "trainscheduler-487ad.firebaseapp.com",
    databaseURL: "https://trainscheduler-487ad.firebaseio.com",
    projectId: "trainscheduler-487ad",
    storageBucket: "trainscheduler-487ad.appspot.com",
    messagingSenderId: "437295954378"
  };
  firebase.initializeApp(config);

  database = firebase.database();
  
  $('#submit-train').on('click',function(){
  	event.preventDefault();
  	name = $('#train-name').val().trim();
  	destination = $('#train-destination').val().trim();
  	freakquency = $('#train-Freakquency').val().trim();
  	arrival = $('#train-arrival').val().trim();

  	database.ref().push({
  		name : name,
  		destination : destination,
		freakquency : freakquency,
		arrival : arrival,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
	  });
	
  	$('#train-name').val('');
  	$('#train-destination').val('');
  	$('#train-Freakquency').val('');
	$('#train-arrival').val('');

  });
  database.ref().on("child_added",function(snapshot){
  	snapVal = snapshot.val();
	newRow = $('<div>').addClass('train row');
	nameCol = $('<div class="col-xs-3">'+snapVal.name+'</div>');
  	destinationCol = $('<div class="col-xs-3">'+snapVal.destination+'</div>');
   	freakquencyCol = $('<div class="col-xs-2">'+snapVal.freakquency+'</div>');
  	
	
	// Calculate the next arrival time based on start time
	var firstArrival = moment(snapVal.arrival, "HH:mm");
	console.log("firstArrival: " + firstArrival);
	
	var freakquency = snapVal.freakquency;
	console.log("freakquency: " + freakquency);
	
	var menitsAway = freakquency - (moment().diff(moment.unix(firstArrival, "HH:mm"), "minutes") % freakquency);
	console.log("menitsAway: " + menitsAway);

	var timeBetween = moment().diff(moment.unix(firstArrival, "HH:mm"), "minutes");
	console.log("timeBetween: " + timeBetween);

	var nextTrain = parseInt((firstArrival) + ((timeBetween + menitsAway) * 60));
	console.log("nextTrain: "+ nextTrain);

	var trainDisplay = moment.unix(nextTrain).format("LT");
	console.log(trainDisplay);
	
	minzAwayCol = $('<div class="col-xs-2">'+menitsAway+'</div>');
	arrivalCol = $('<div class="col-xs-2">'+trainDisplay+'</div>');
	newRow.append(nameCol);
	newRow.append(destinationCol);
	newRow.append(freakquencyCol);
	newRow.append(arrivalCol);
	newRow.append(minzAwayCol);
  	$('#train-container').append(newRow);
  });
 });



