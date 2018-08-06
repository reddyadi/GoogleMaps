google.maps.event.addDomListener(window, 'load', initmap);
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

}
