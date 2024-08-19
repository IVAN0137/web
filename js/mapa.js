// Inicializar el mapa y establecer la vista inicial
var map = L.map('map').setView([21.1397, -99.6266], 13);

// Añadir la capa de tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir controles de zoom y escala
L.control.zoom({
    position: 'topright'
}).addTo(map);

L.control.scale().addTo(map);

var currentRoute = null;

// Array de marcadores
var markers = [
    { coords: [21.13480, -99.62855], name: 'PINAL DE AMOLES', popup: '<b>PINAL DE AMOLES</b><br><a href="pinal.html"><img src="res/PINAL.jpg" alt="Mirador Pinal" width="150" height="100"></a>' },
    { coords: [21.18546, -99.61196], name: 'PUENTE DE DIOS', popup: '<b>PUENTE DE DIOS</b><br><a href="puentededios.html"><img src="res/puente de dios.jpg" alt="Puente De Dios" width="150" height="100"></a>' },
    { coords: [21.08033, -99.66208], name: 'MIRADOR CUATRO PALOS', popup: '<b>MIRADOR CUATRO PALOS</b><br><img src="res/mirador-cuatro-palos.jpg" alt="Mirador Cuatro Palos" width="150" height="100">' },
    { coords: [21.13461, -99.62533], name: 'PARROQUIA SAN JOSE PINAL DE AMOLES', popup: '<b>PARROQUIA SAN JOSE PINAL DE AMOLES</b><br><img src="res/parroquia-san-jose.jpg" alt="Parroquia San Jose" width="150" height="100">' },
    { coords: [21.13434, -99.62746], name: 'MUSEO COMUNITARIO PINAL DE AMOLES', popup: '<b>MUSEO COMUNITARIO PINAL DE AMOLES</b><br><img src="res/museo-comunitario.jpg" alt="Museo Comunitario" width="150" height="100">' },
    { coords: [21.13324, -99.62546], name: 'AUDITORIO MUNICIPAL', popup: '<b>AUDITORIO MUNICIPAL</b><br><img src="res/auditorio-municipal.jpg" alt="Auditorio Municipal" width="150" height="100">' },
    { coords: [21.161765, -99.561271], name: 'CASCADA EL CHUVEJE', popup: '<b>CASCADA EL CHUVEJE</b><br><a href="#"><img src="res/chuveje.jpg" alt="Cascada El Chuveje" width="150" height="100"></a>' },
    { coords: [21.126811, -99.637523], name: 'PUERTA DEL CIELO', popup: '<b>PUERTA DEL CIELO</b><br><img src="res/puerta-del-cielo.jpg" alt="Puerta del Cielo" width="150" height="100">' },
    { coords: [21.035866, -99.619614], name: 'CAMPAMENTO EL MANGAL, BUCARELI', popup: '<b>CAMPAMENTO EL MANGAL, BUCARELI</b><br><img src="res/campamento-el-mangal.jpg" alt="Campamento El Mangal" width="150" height="100">' },
    { coords: [36.973480, -3.583528], name: 'CUEVA DE LOS RISCOS', popup: '<b>CUEVA DE LOS RISCOS</b><br><img src="res/cueva-de-los-riscos.jpg" alt="Cueva de los Riscos" width="150" height="100">' },
    { coords: [-11.738486, -76.282706], name: 'CAÑON DEL INFIERNILLO', popup: '<b>CAÑON DEL INFIERNILLO</b><br><img src="res/canon-del-infiernillo.jpg" alt="Cañon del Infiiernillo" width="150" height="100">' },
    { coords: [21.21668, -99.47386], name: 'Jalpan De Serra', popup: '<b>Jalpan De Serra</b><br><a href="jalpan.html"><img src="res/jalpan.jpg" alt="Jalpan De Serra" width="150" height="100"></a>' },
    { coords: [21.18390, -99.32157], name: 'Landa De Matamoros', popup: '<b>Landa De Matamoros</b><br><img src="res/landa-de-matamoros.jpg" alt="Landa de Matamoros" width="150" height="100">' }
];

// Crear marcadores y añadir eventos
markers.forEach(function(marker) {
    // Crear un marcador y añadirlo al mapa
    var leafletMarker = L.marker(marker.coords).addTo(map);
    leafletMarker.bindPopup(marker.popup);

    // Añadir a la lista de direcciones
    var listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#" data-lat="${marker.coords[0]}" data-lng="${marker.coords[1]}">${marker.name}</a>`;
    document.getElementById('directions-list').appendChild(listItem);

    // Evento de clic en el marcador del mapa
    leafletMarker.on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLocation = [position.coords.latitude, position.coords.longitude];
                
                // Eliminar la ruta actual si existe
                if (currentRoute) {
                    map.removeControl(currentRoute);
                }

                // Crear y añadir la nueva ruta
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

// Añadir eventos de clic para la lista de destinos
document.getElementById('directions-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        var lat = parseFloat(event.target.getAttribute('data-lat'));
        var lng = parseFloat(event.target.getAttribute('data-lng'));
        var destination = [lat, lng];

        if (!isNaN(lat) && !isNaN(lng)) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var userLocation = [position.coords.latitude, position.coords.longitude];
                    
                    // Eliminar la ruta actual si existe
                    if (currentRoute) {
                        map.removeControl(currentRoute);
                    }

                    // Crear y añadir la nueva ruta
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
        } else {
            alert("Coordenadas del destino no válidas.");
        }
    }
});
