google.maps.event.addDomListener(window, 'load', initmap);
var map, infobox, allMarkers = [];

function initmap() {
  var mapOptions = {
    center :{
      lat: -41.279214,
      lng: 174.780340
    },
    zoom: 12,
    disableDefaultUI: true,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.LEFT_CENTER,
      mapTypeIds: ['roadmap', 'terrain']
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    styles: [
      {
        featureType: 'water',
        stylers: [
          {
            color: '#FFD100'
          }
        ]
      },
      {
        featureType: 'landscape.man_made',
        stylers: [
          {
            color: '#1A71C8'
          }
        ]
      },
      {
        featureType: 'landscape.natural',
        stylers: [
          {
            color: '#000000'
          }
        ]
      }
    ]
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  addAllMarkers();

}

function addAllMarkers(){
  $.ajax({
    url: 'data/markers.json',
    type: 'GET',
    dataType: 'json',
    success: function(markers){
      for (var i = 0; i < markers.length; i++) {
        console.log(markers[i]);
        $("#places").append(
          "<div class='place' data-id='"+markers[i].id+"'>"+
            "<h3>"+markers[i].place_name+"</h3>"+
            "<div class='panel'>"+
              "<p>"+markers[i].description+"</p><br>"+
            "</div>"+
          "</div>"+
          "<hr>"
        );

        var marker = new google.maps.Marker({
          position: {
            lat: markers[i].lat,
            lng: markers[i].lng
          },
          title: markers[i].place_name,
          markerID: markers[i].id,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: 'images/logo.png'
        });
      }
      markerClickEvent(marker);
      allMarkers.push(marker);
    },
    error: function(error){
      console.log("Error, something went wrong, can't get the markers");
      console.log(error);
    }
  });
}

function markerClickEvent(marker){
  if(infobox){
    infobox.close();
  }
  infobox = new google.maps.InfoWindow();
  map.panTo(marker.position);
  google.maps.event.addListener(marker, 'click', function(){
    infobox.setContent(
      '<div class="infobox">'+
        '<strong>'+marker.title+'</strong><br>'+
        marker.description+'<br>'+
      '</div>');
    infobox.open(map, marker);
  });
}

function moveMap(){
  var latlng = new google.maps.LatLng(-41.2959299, 174.772154);
  map.panTo(latLng);
  map.setZoom(17);
}

$(document).on('click', '.place', function(){
  if(infobox){
    infobox.close();
  }
  var id = $(this).data('id');
  $('.panel').slideUp();
  $(this).find('.panel').slideDown()
  for (var i = 0; i < allMarkers.length; i++) {
    if(allMarkers[i].markerID == id){
      map.panTo(allMarkers[i].position);
      map.setZoom(17);
      infobox = new google.maps.InfoWindow();
      infobox.setContent(
        'div class="infobox">'+
          '<strong>'+allMarkers[i].title+'</strong><br>'+
          allMarker[i].description+'<br>'+
        '</div>');
      infobox.open(map, allMarkers[i]);
      break;
    }
  }
});
