var map = L.map('map').setView([21.1397, -99.6266], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.zoom({
    position: 'topright'
}).addTo(map);

L.control.scale().addTo(map);

var currentRoute = null;

var markers = [
    {coords: [21.13480, -99.62855], name: 'Mirador Pinal De Amoles', popup: '<b>Mirador Pinal De Amoles</b><br><a href="pinal.html"><img src="res/PINAL.jpg" alt="Mirador Pinal" width="150" height="100"></a>'},
    {coords: [21.18546, -99.61196], name: 'Puente De Dios', popup: '<b>Puente De Dios</b><br><a href="puentededios.html"><img src="res/puente de dios.jpg" alt="Puente De Dios" width="150" height="100"></a>'},
    {coords: [21.21668, -99.47386], name: 'Jalpan De Serra', popup: '<b>Jalpan De Serra</b><br><a href="jalpan.html"><img src="res/jalpan.jpg" alt="Jalpan De Serra" width="150" height="100"></a>'},
    {coords: [21.18390, -99.32157], name: 'Landa De Matamoros', popup: '<b>Landa De Matamoros</b><br><img src="res/" alt="" width="150" height="100">'},

    {coords: [21.08033, -99.66208], name: 'Mirador Cuatro Palos', popup: '<b>Mirador Cuatro Palos</b><br><img src="res/mirador-cuatro-palos.jpg" alt="Mirador Cuatro Palos" width="150" height="100">'},
    {coords: [21.13461, -99.62533], name: 'Parroquia San Jose Pinal De Amoles', popup: '<b>Parroquia San Jose Pinal De Amoles</b><br><img src="res/parroquia-san-jose.jpg" alt="Parroquia San Jose" width="150" height="100">'},
    {coords: [21.13434, -99.62746], name: 'Museo Comunitario Pinal De Amoles', popup: '<b>Museo Comunitario Pinal De Amoles</b><br><img src="res/museo-comunitario.jpg" alt="Museo Comunitario" width="150" height="100">'},
    {coords: [21.13324, -99.62546], name: 'Auditorio Municipal', popup: '<b>Auditorio Municipal</b><br><img src="res/auditorio-municipal.jpg" alt="Auditorio Municipal" width="150" height="100">'},
    {coords: [21.13072, -99.63108], name: 'Gasolineria', popup: '<b>Gasolineria</b><br><img src="res/Gasolineria.jpg" alt="Gasolineria" width="150" height="100">'
    }
];

var directionsList = document.getElementById('directions-list');

markers.forEach(function(marker) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#" data-lat="${marker.coords[0]}" data-lng="${marker.coords[1]}">${marker.name}</a>`;
    directionsList.appendChild(listItem);

    L.marker(marker.coords).addTo(map)
        .bindPopup(marker.popup)
        .on('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var userLocation = [position.coords.latitude, position.coords.longitude];
                    
                    if (currentRoute) {
                        map.removeControl(currentRoute);
                    }

                    currentRoute = L.Routing.control({
                        waypoints: [
                            L.latLng(userLocation),
                            L.latLng(marker.coords)
                        ],
                        routeWhileDragging: true,
                        language: 'es'
                    }).addTo(map);
                }, function(error) {
                    alert("Error al obtener la ubicación: " + error.message);
                });
            } else {
                alert("Geolocalización no es soportada por este navegador.");
            }
        });
});

directionsList.addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        var lat = event.target.getAttribute('data-lat');
        var lng = event.target.getAttribute('data-lng');
        var destination = [lat, lng];

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLocation = [position.coords.latitude, position.coords.longitude];
                
                if (currentRoute) {
                    map.removeControl(currentRoute);
                }

                currentRoute = L.Routing.control({
                    waypoints: [
                        L.latLng(userLocation),
                        L.latLng(destination)
                    ],
                    routeWhileDragging: true,
                    language: 'es'
                }).addTo(map);
            }, function(error) {
                alert("Error al obtener la ubicación: " + error.message);
            });
        } else {
            alert("Geolocalización no es soportada por este navegador.");
        }
    }
});
