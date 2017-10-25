// js/index.js

//GLOBAL VARIABLES
var rootAPI= 'http://pokeapi.salestock.net/api/v2/';

//READ API
function sendRequest(endpoint, successFunction) {
	$.ajax({
		url: rootAPI + endpoint,
		dataType: 'json',
		crossDomain: true,
		success: successFunction,
		beforeSend: function(jqXHR, settings) {
						console.log("#beforeSend execute" + '\n' +
						 			"jqXHR is ", jqXHR,
						 			"setting is ", settings);
						},
		complete: function(jqXHR, textStatus) { 
						console.log("#complete execute" + '\n' +
						 			"jqXHR is ", jqXHR,
						 			"textStatus is ", textStatus);
						},
	}).done(function() {
		console.info("hecho")
	});
};



/*function 
	$.ajax({
	  method: "POST",
	  url: "some.php",
	  data: { name: "John", location: "Boston" }
	})
	  .done(function( msg ) {
	    alert( "Data Saved: " + msg );
	  });
*/



//REQUEST PROCESSING


//REQUEST BY ID




//EVENTS

$('#id_button').on("click", function() {
    //$('.row.first').remove() // reset panel
    var pokemon_id = $('#id').val();
    var endpoint = "pokemon/" + pokemon_id + "/"; //Adds the query 
    //request.open('GET', new_url, true); //javascript open request
    //request.send(); // javascript request send
    //input = 1;
    sendRequest(endpoint, function (a) {
    	console.log("a is ", a);
    });
});