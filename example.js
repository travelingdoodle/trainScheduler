database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;
	
	var minAway = trainFreq - (moment().diff(moment.unix(trainStart, "YYYY-MM-DD HH:mm"), "minutes") % trainFreq);
	
	var minElapsed = moment().diff(moment.unix(trainStart, "YYYY-MM-DD HH:mm"), "minutes");
	
	var nextTrain = parseInt(trainStart) + ((minElapsed + minAway) * 60);
	console.log(nextTrain);
	
	var nextTrainPretty = moment.unix(nextTrain).format("LT");
	console.log(nextTrainPretty);


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrainPretty + "</td><td>" + minAway + "</td></tr>");
});



			// // ----------ALL OF THIS WORKS TO CALCULATE CURRENT TIME COMPARED TO ARRIVAL TIME------------
				// convertedTime = moment(snapVal.arrival, "H:mm");
				// console.log(convertedTime);

				

				// // Compare current time with the arrival time to give minz to arrival
				// minsToArrival = moment(convertedTime).diff(moment(), "minutes");
				// console.log(minsToArrival);
