import {Threebox} from 'threebox-plugin';

export const loadLocations = (map, coords) => {
  console.log('load')
  let truck;

  map.addLayer({
    id: 'mapmapmap',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, mbxContext) {

      window.tb = new Threebox(
        map,
        mbxContext,
        { defaultLights: true }
      );

      var options = {
        obj: '/pill/scene.gltf',
        type: 'gltf',
        scale: 20,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 90, y: 180, z: 0 } //default rotation
      }

      for (let i = 0; i < coords.length; i ++) {
        console.log(coords);
        const coord = coords[i];
        window.tb.loadObj(options, function (model) {
          console.log('placing');
          truck = model.setCoords([coord.long, coord.lat]);
          window.tb.add(truck);
          let rotation = 0;
          function animate() {
      
            setTimeout( function() {
      
              requestAnimationFrame( animate );
      
            }, 1000 / 20 );
            truck.setRotation({x:0, y:0, z: rotation += 10});
          }
      
          animate();
        })
      }
    },
    render: function (gl, matrix) {
      window.tb.update();
    }
  });
}