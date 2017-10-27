
//GLOBAL VARIABLES
var rootAPI= 'http://pokeapi.salestock.net/api/v2/';

//TEMPLATES
var tpmlCard = "<div id='{{id}}' class='cartaPokemon'>" +
						"<figure class='containerImage'>" + 
							"<img src='{{sprites.front_default}}'/>" +
						"</figure>" + 
						"<h2>Numero {{id}}</h2>" +
					 	"<h1>I am: {{ name }}</h1>" +
					"</div>";
var tpmlLoading = "<div id='id' class='loadAnimation'>" +
						"<img src='ajax-loader.gif'/>" +
					"</div>";

//HELPERS
function displayTemplate (template, jsonData) {
	var html = Mustache.to_html(template, jsonData);
	$('#cardsBoard').append(html);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeLoadAnimation() {
	$('.loadAnimation').remove();
}






//READ API
function sendRequest(endpoint, successFunction) {
	$.ajax({
		url: rootAPI + endpoint,
		dataType: 'json',
		crossDomain: true,
		success: successFunction,
		beforeSend: function(jqXHR, settings) {
						console.log("#beforeSend execute#" + '\n' +
						 			"jqXHR is ", jqXHR,
						 			"setting is ", settings);
						
						displayTemplate(tpmlLoading);
						},
		complete: function(jqXHR, textStatus) { 
						console.log("#complete execute#" + '\n' +
						 			"jqXHR is ", jqXHR,
						 			"textStatus is ", textStatus);
						removeLoadAnimation(endpoint);
						},
	}).done(function(done) {
		console.log("done is ", done);
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
//Show just one card by ID or NAME.
$('#id_button').on("click", function() {
    //$('.row.first').remove() // reset panel
    var idorName = $('#id').val();
    var endpoint = "pokemon/" + idorName + "/"; //Adds the query 
    //request.open('GET', new_url, true); //javascript open request
    //request.send(); // javascript request send
    //input = 1;
    sendRequest(endpoint, function (response) {
    	displayTemplate(tpmlCard, response);
    });
});

//Show 10 cards by type.
$('#type_button').on("click", function() {
	
	var pokemonType = $('#type').val();
	var endpointType = "type/" + pokemonType;

	sendRequest(endpointType, function (response) {	
		for (var i = 0; i < 10; i++) {

			var randomIndex = getRandomInt(0, response.pokemon.length);
			var name = response.pokemon[randomIndex].pokemon.name;

			var endpointByName = "pokemon/" + name + "/";

			sendRequest(endpointByName, function (response) {
				displayTemplate(tpmlCard, response);
			})
		}
		
		
	}); 
});

$('#remove').on("click", function() {
	$('.cartaPokemon').remove();
})


