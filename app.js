  // initialize the map
var myMap = L.map('mapid').setView([44.4475229, 1.441989], 15);
  // load a tile layer
L.tileLayer(
	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoibHVja3lzcGxpdCIsImEiOiJjamhocGhuZmsxcHlnM2NvNjJwOXY2cWRvIn0.0OaMnvkbtPLFBjMGckppUg'
}).addTo(myMap);


$.getJSON( "places.json", function ( data ) {

	// var point = [];
	  // 3 boucles pour boucler dans chacune des couches du fichier JSON
	for (var i = 0; i < data.length; i++) {
		var cat = '<div class="card-header"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '"><b>' + data[i].name + '</b></button></h5><div id="collapse' + i + '" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample"></div></div>';
		$("#menu").append(cat);

		for (var j = 0; j < data[i].children.length; j++) {
			var sousCat = '<button class="btn btn-link" type="button" data-toggle="" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">' + data[i].children[j].name + '</button><br/>';
			$("#collapse" + i).append(sousCat);
			var item = document.getElementById('collapse'+i);

			for (var k = 0; k < data[i].children[j].places.length; k++) {
				var myIcon = L.icon({iconUrl: data[i].children[j].icon});
				var marker = L.marker([data[i].children[j].places[k].lat, data[i].children[j].places[k].lon], {icon: myIcon});
					marker.bindPopup(data[i].children[j].places[k].name+'<br/>'+data[i].children[j].places[k].description).openPopup();

				item.onclick = function addMarker ( lieu ) {
					marker.addTo(myMap);
					console.log(lieu);
					// console.log(data[i].children[j].places[k].name);
				};
			}
		}
	}
				addMarker();
});
