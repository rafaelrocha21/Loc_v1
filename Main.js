const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer({
  draggable: false,
});

//criar Mapa
const map = new google.maps.Map(document.getElementById("googleMap"), {
  zoom: 3,
  center: { lat: -15.793889, lng: -47.882778 },
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7c93a3",
        },
        {
          lightness: "-10",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#a0a4a5",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#62838e",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#dde3e3",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#3f4a51",
        },
        {
          weight: "0.30",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "poi.attraction",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.government",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.place_of_worship",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.school",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: "-100",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#bbcacf",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          lightness: "0",
        },
        {
          color: "#bbcacf",
        },
        {
          weight: "0.50",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#a9b4b8",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          invert_lightness: true,
        },
        {
          saturation: "-7",
        },
        {
          lightness: "3",
        },
        {
          gamma: "1.80",
        },
        {
          weight: "0.01",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a3c7df",
        },
      ],
    },
  ],
});

//conectar DirectionsRenderer para o mapa
directionsRenderer.setMap(map);

// Calcular Rota
function calcRoute() {
  var waypts = [
    { location: document.getElementById("parada1").value, stopover: true },
  ];
  directionsService
    .route({
      origin: document.getElementById("origem").value,
      destination: document.getElementById("destino").value,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((response) => {
      console.log({ response });
      directionsRenderer.setDirections(response);
    })
    .catch((err) => {
      console.log({ err });
    });
}

// Adicionar Paradas

var botaoAddWay = document.getElementById("botaoAddWay");
var parada = 2;

botaoAddWay.addEventListener("click", addWay);

function addWay() {
  document.getElementById("add_after_me").insertAdjacentHTML(
    "beforeend",
    `<div class="form-group">
                <label for=por${parada} class="col-xs-2 control-label"><i class="fas fa-map-marker-alt"></i></label>
                <div class="col-xs-4">
                    <input type="text" id="parada${parada}" placeholder="Parada ${parada}" class="form-control">
                </div>
                <input type="button" value="x" id="botaoAddWay">
               
            </div>`
  );
  //FALTA adicionar no Array!!!

  parada++;
}

//Marcadores de Area

var marker;
let numeroPontos = 0;
const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

map.addListener("click", function (e) {
  numeroPontos++;

  var clickposition = e.latLng;
  marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    label: `Area de Rastreio ${numeroPontos}`,
    draggable: true,
    position: clickposition,
    icon: image,
  });
  new google.maps.Circle({
    strokeColor: "#008000",
    strokeWeight: 2,
    strokeOpacity: 1,
    fillColor: "#008000",
    fillOpacity: 0.4,
    center: marker.position,
    radius: 30000,
    map: map,
  });
  // Display Marcadores no Console.
  console.log(`Latitude ${numeroPontos} é ${marker.getPosition().lat()}`);
  console.log(`Longitude ${numeroPontos} é ${marker.getPosition().lng()}`);
});

//complemento automatico
var options = {
  types: ["(cities)"],
};

var input1 = document.getElementById("origem");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("destino");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

// em paradas

var input3 = document.getElementById("parada1");
var autocomplete1 = new google.maps.places.Autocomplete(input3, options);
