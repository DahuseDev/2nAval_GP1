function iniciar() {
    var view = new ol.View({
      center: [0, 0],
      zoom: 2
    });
    console.log(ol.layer)
    var layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    var map = new ol.Map({
      layers: [
        layer
      ],
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        })
      }),
      view: view
    });
    
    var geolocation = new ol.Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });
      
    var accuracyFeature = new ol.Feature();
    
    var positionFeature = new ol.Feature();
    console.log(ol.layer)
    
    layer.on('change:geometry', function() {
        positionFeature.transform(function() {}, function(coordinates) {
          return coordinates ? new ol.geom.Point(coordinates) : null;
        });

      });

    var featuresOverlay = new ol.layer.Vector({
      map: map,
      features: [accuracyFeature, positionFeature]
    });
    
  
  }
  
  
  
  window.addEventListener("load", iniciar, true);
  