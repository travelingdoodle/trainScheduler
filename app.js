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

var d = new Date();
var timeStamp = d.getTime()+1;
console.log(timeStamp);
// var month = d.getMonth()+1;
// var day = d.getDate();
// var today = d.getFullYear() + '-' +  (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day 
// console.log(today)

  database.ref().on("child_added",function(snapshot){
  	snapVal = snapshot.val();
	newRow = $('<div>').addClass('train row');
	nameCol = $('<div class="col-xs-2">'+snapVal.name+'</div>');
  	destinationCol = $('<div class="col-xs-2">'+snapVal.destination+'</div>');
   	freakquencyCol = $('<div class="col-xs-2">'+snapVal.freakquency+'</div>');
  	arrivalCol = $('<div class="col-xs-2">'+snapVal.arrival+'</div>');
    
	convertedTime = moment(snapVal.arrival, "H:mm");
	console.log(convertedTime);

	// Compare current time with the arrival time
	minsToArrival = moment(convertedTime).diff(moment(), "minutes");
	// minsToArrival = moment(convertedTime).diff(moment(), "minutes");
	console.log(minsToArrival);

	minzAwayCol = $('<div class="col-xs-2">'+minsToArrival+'</div>');
	
	// billedCol = $('<div class="col-xs-2">'+billed+'</div>')

	newRow.append(nameCol);
	newRow.append(destinationCol);
	newRow.append(freakquencyCol);
	newRow.append(arrivalCol);
	newRow.append(minzAwayCol);
	


  	$('#train-container').append(newRow);
  });
 });



