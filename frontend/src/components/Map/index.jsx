import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

import './style.scss';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw'
});

const MapComponent = (props) => {
  const leftMargin = props.sideBarVis ? '15vw' : '0';
  console.log(props.sideBarVis);

  return (
    <div className="map-container">
    <Map
      antialias={true}
      containerStyle={{
        height: '70vh',
        width: '45%',
        position: 'absolute',
        right: '4.5vw',
        top: '20vh',
        transition: '.5s',
        overflow: 'hidden',
        borderRadius: '15px',
        objectFit: 'cover',
        outline: 'none'
      }}
      center={[-117.06651266267941, 32.76570649214452]}
      flyToOptions={{
        speed: 2
      }}
      onClick={props.mapClick}
      onStyleLoad={props.mapLoad}
      pitch = {[60]}
      style="mapbox://styles/mapbox/streets-v11"
      zoom = {[16]}
    >
    </Map>
    </div>
  );
}

export default MapComponent;