

// js/index.js

//DISPLAY A CARD
function builder(idCardx = "pokemonCard") {
    //card
    $('article').append('<div class="card" id="' + idCardx + '"></div>');
    $('#' + idCardx).append('<header class="card-header"></div>');
    $('#' + idCardx).append('<div class="card-image"></div>');
    $('#' + idCardx).append('<div class="card-content"></div>');
}
builder();

var stemplate = $("#template").html(); //nos traemos el codigo
console.log(stemplate);
var tmpl = Handlebars.compile(stemplate); //copilamos la plantilla

var ctx = {}
ctx.Baers = [{"Name":"Estrella","Brewery":"Damm","Style":"Euro Lager","Abv":"5.4","Ibu":"25","Favorite":false,"LastCheckin":{"When":"24/04/2013 - 20:00:01","Drinker":"@eiximenis"}},
{"Name":"Voll Damm","Brewery":"Damm","Style":"Bock","Abv":"7.2","Ibu":"40","Favorite":false,"LastCheckin":{"When":"24/04/2013 - 21:00:01","Drinker":"@CKGrafico"}},
{"Name":"Devil's","Brewery":"Marina","Style":"Indian Pale Ale","Abv":"9.0","Ibu":"150","Favorite":true,"LastCheckin":{"When":"24/04/2013 - 22:00:01","Drinker":"@midesweb"}},
{"Name":"Guinness Draught","Brewery":"Guinness","Style":"Irish Stout","Abv":"4.5","Ibu":"40","Favorite":true,"LastCheckin":{"When":"24/04/2013 - 23:00:01","Drinker":"@eiximenis"}}]

html = tmpl(ctx);

$("#cardsBoard").append(html);



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
						console.log("#beforeSend execute#" + '\n' +
						 			"jqXHR is ", jqXHR,
						 			"setting is ", settings);
						},
		complete: function(jqXHR, textStatus) { 
						console.log("#complete execute#" + '\n' +
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

$('#remove').on("click", function() {
	$('article').remove();
})