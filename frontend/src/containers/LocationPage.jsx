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
    <div className="location-page">
      <div className="location-container">
        <h1>Local Doctors</h1>
        <h3>Please enable location sharing on your browser</h3>
      <LocationCarousel
      information={[
        { name:'Jamie Lavender, MD - Sharp Rees-Stealy Downtown', 
          occupation: 'doctor', // Type of doctor
          lat: 32.7256337,
          'location-img': 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mapquest.com%2Fus%2Fcalifornia%2Fpacific-medical-care-359975010&psig=AOvVaw2ERT7QrSHArk2grhw5VJIz&ust=1615241678166000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNDVl6aan-8CFQAAAAAdAAAAABAD',
          long: -117.1616766,
          address: '1501 Fifth Ave Suite 100, San Diego',
          'phone-num': '(858)-263-9700',
          'office-hours': '9:00AM - 5:00PM',
          website:'https://pacificmedicalcare.net/'
      },
       { name:'Anthony Puopolo, MD', 
         occupation: 'doctor', // Type of doctor
         lat: 32.7256001,
         'location-img': 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.sharp.com%2Flocations%2Fsharp-rees-s-912-1.jpg&imgrefurl=https%3A%2F%2Fwww.sharp.com%2Flocations%2Fsharp-rees-stealy-downtown-912&tbnid=B-uWIOT5TOI40M&vet=12ahUKEwibrpeDmp_vAhVkP30KHa9DCysQMygAegQIARBr..i&docid=6xM43XES6JpLRM&w=730&h=408&q=300%20fir%20street&hl=en&ved=2ahUKEwibrpeDmp_vAhVkP30KHa9DCysQMygAegQIARBr',
         long: -117.1616203,
         address: '300 Fir St, San Diego', // Address of doctor office
         'phone-num': '(619)-446-1575',
         'office-hours': '8:00AM - 5:00PM',
         website:'https://www.sharp.com/'
      },
          { name: 'Dr. Wilma J. Wooten, MD', 
          occupation: 'doctor', // Type of doctor
          lat: 32.7256001,
          'location-img': 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.sharp.com%2Flocations%2Fsharp-rees-s-912-1.jpg&imgrefurl=https%3A%2F%2Fwww.sharp.com%2Flocations%2Fsharp-rees-stealy-downtown-912&tbnid=B-uWIOT5TOI40M&vet=12ahUKEwibrpeDmp_vAhVkP30KHa9DCysQMygAegQIARBr..i&docid=6xM43XES6JpLRM&w=730&h=408&q=300%20fir%20street&hl=en&ved=2ahUKEwibrpeDmp_vAhVkP30KHa9DCysQMygAegQIARBr',
          long: -117.1616203,
          address: '300 Fir Str, San Diego', // Address of doctor office
          'phone-num': '(619)-446-1575',
          'office-hours': '8:00AM - 5:00PM',
          website:'https://www.sharp.com/'
      }
    ]}
    />
    </div>
  <Map mapLoad={mapLoad} />
  </div>
  )
}

export default LocationPageContainer;
