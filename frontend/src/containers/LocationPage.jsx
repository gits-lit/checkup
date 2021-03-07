import React from 'react';
import {loadLocations} from './utils.js';

import LocationCarousel from '../components/LocationCarousel';
import Map from '../components/Map';

const LocationPageContainer = () => {
  const mapLoad = map => {
    setTimeout(() => {
      window.map = map;
      loadLocations(map, [{lat: -117.06651266267941, long: 32.76570649214452}]);
    }, 2000);
  };

  return (
    <div className="location-page">
      <div className="location-container">
        <h1>Local Doctors</h1>
        <h3>Please enable location sharing on your browser</h3>
      <LocationCarousel
      information={[
        { name:'Dr. Nguyen’s Dermatology', 
          occupation: 'doctor', // Type of doctor
          lat: 123,
          'location-img': 'https://video-images.vice.com/articles/5cd59ef7daa55c00076c7abf/lede/1557504091472-Screen-Shot-2019-05-10-at-102810-AM.png',
          long: 123,
          address: '2382 Camino Noguera Rd, San Francisco, 94122', // Address of doctor office
          'phone-num': '626)-319-3791',
          'office-hours': '8:00AM - 5:00PM',
          website:'https://lotusdental.com/'
      },
      { name:'asdasdasdasdasy', 
          occupation: 'doctor', // Type of doctor
          lat: 123,
          'location-img': 'https://video-images.vice.com/articles/5cd59ef7daa55c00076c7abf/lede/1557504091472-Screen-Shot-2019-05-10-at-102810-AM.png',
          long: 123,
          address: '2382 Camino Noguera Rd, San Francisco, 94122', // Address of doctor office
          'phone-num': '(626)-319-3791',
          'office-hours': '8:00AM - 5:00PM',
          website:'https://lotusdental.com/'
      },
      { name:'dsadasdsadsaday', 
          occupation: 'doctor', // Type of doctor
          lat: 123,
          'location-img': 'https://video-images.vice.com/articles/5cd59ef7daa55c00076c7abf/lede/1557504091472-Screen-Shot-2019-05-10-at-102810-AM.png',
          long: 123,
          address: '2382 Camino Noguera Rd, San Francisco, 94122', // Address of doctor office
          'phone-num': '(626)-319-3791',
          'office-hours': '8:00AM - 5:00PM',
          website:'https://lotusdental.com/'
      }
    ]}
    />
    </div>
  <Map mapLoad={mapLoad} />
  </div>
  )
}

export default LocationPageContainer;