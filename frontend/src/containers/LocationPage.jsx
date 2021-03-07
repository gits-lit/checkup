import React from 'react';

import LocationCarousel from '../components/LocationCarousel';
import Map from '../components/Map';

const LocationPageContainer = () => {
  const mapLoad = map => {
    setTimeout(() => {
      window.map = map;
      //loadLocations(map, locations);
    }, 2000);
  };

  return (
    <div className="location-carousel">
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
  <Map mapLoad={mapLoad} />
  </div>
  )
}

export default LocationPageContainer;