
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
	}else{
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

//Press botton Save Pokemons
$('#remove').on("click", function() {
	$('.cartaPokemon').remove();
	$('#remove').addClass('hide');
})


