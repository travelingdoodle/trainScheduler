$(document).ready(function(){	
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2P3JURJEZcaG1PzDlOnYilV2KsQBHsvA",
    authDomain: "timesheet-c070b.firebaseapp.com",
    databaseURL: "https://timesheet-c070b.firebaseio.com",
    projectId: "timesheet-c070b",
    storageBucket: "",
    messagingSenderId: "763391736641"
  };
  firebase.initializeApp(config);

  database = firebase.database();
  
  $('#submit-employee').on('click',function(){
  	event.preventDefault();
  	name = $('#employee-name').val().trim();
  	role = $('#employee-role').val().trim();
  	startdate = $('#employee-startdate').val().trim();
  	monthlyrate = $('#employee-monthlyrate').val().trim();

  	database.ref().push({
  		name : name,
  		role : role,
  		startdate : startdate,
  		monthlyrate : monthlyrate,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});

  	$('#employee-name').val('');
  	$('#employee-role').val('');
  	$('#employee-startdate').val('');
  	$('#employee-monthlyrate').val('');

  });

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var today = d.getFullYear() + '-' +  (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day 
console.log(today)

  database.ref().on("child_added",function(snapshot){
  	snapVal = snapshot.val();
  	newRow = $('<div>').addClass('employee row');
  	nameCol = $('<div class="col-xs-2">'+snapVal.name+'</div>');
   	roleCol = $('<div class="col-xs-2">'+snapVal.role+'</div>');
  	dateCol = $('<div class="col-xs-2">'+snapVal.startdate+'</div>');
    
    convertedDate = moment(snapVal.startdate, "MM/DD/YYYY");

    monthsDuration = moment(convertedDate).diff(moment(), "months");

    monthsDuration *= -1

    monthsWorkedCol = $('<div class="col-xs-2">'+monthsDuration+'</div>');
  	
  	rateCol = $('<div class="col-xs-2">'+snapVal.monthlyrate+'</div>');
  	
  	var billed = parseInt(snapVal.monthlyrate * monthsDuration);
	
	billedCol = $('<div class="col-xs-2">'+billed+'</div>')

	newRow.append(nameCol);
	newRow.append(roleCol);
	newRow.append(dateCol);
	newRow.append(monthsWorkedCol);
	newRow.append(rateCol);
	newRow.append(billedCol);


  	$('#employee-container').append(newRow);
  });
 });



