//js/index.js
//
//~~~ DOCUMENTATION ~~~
// 1-Global Variables
// 2-Templates
// 3-Read API by AJAX
// 4-Events
// 		A-Invoke Pokemos Button
// 		B-Remove Pokemos Button
// 		
// This is a project for educational purpose to practice open API
// 
// Courtesy Paco Padilla
//~~~~~~~~~~~~~~~~~~~~~~		

	 	
//GLOBAL VARIABLES
//https://pokeapi.co/api/v2/
//http://pokeapi.salestock.net/api/v2/
//https://cors.now.sh/https://pokeapi.co/api/v2/
var rootAPI= 'https://pokeapi.co/api/v2/';


//TEMPLATES
var tpmlCard = "<div id='{{id}}' class='cartaPokemon'>" +
						"<figure class='containerImage'>" + 
							"<img src='{{sprites.front_default}}'/>" +
						"</figure>" + 
						"<h5>{{ id }} ~ {{ name }}</h5>" +
					 	"<h6>{{#types}}{{#type}}" +
					 	"<strong>{{name}} </strong>" +
					 	"{{/type}}{{/types}}</h6>" +
					"</div>";
var tpmlLoading = "<div id='id' class='loadAnimation'>" +
						"<img src='img/ajax-loader.gif'/>" +
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
		method: 'GET',
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
		$('#remove').removeClass('hide')
		
	});
};

//EVENTS
//Press botton invoke
$('#invoke').on("click", function() {
	var vId = $('#id').val().toLowerCase().trim();
	var vType = $('#type').val()

	$('#id').val("");
	$('#type').val("");

	if (vId === "rafa") {
		sendRequest("pokemon/pikachu/", function (response) {
			displayTemplate(tpmlCard, response);
		});
	}else if (vId !== "") {
		var endpoint = "pokemon/" + vId + "/";
		sendRequest(endpoint, function (response) {
	    	displayTemplate(tpmlCard, response);
	    });
	}

	if (vType !== "") {
		var endpointType = "type/" + vType;

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
	}	
});

//Press botton to Save Pokemons
$('#remove').on("click", function() {
	$('.cartaPokemon').remove();
	$('#remove').addClass('hide');
})


