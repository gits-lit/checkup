import React from 'react';
import { Carousel } from 'antd';

import phone from '../../assets/phone.svg';
import web from '../../assets/web.svg';

import './style.scss';

const LocationCarousel = (props) => {

  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    slidesToShow: 1,
    centerPadding: '0',
  };

  return (
    <Carousel {...settings}>
      {props.information.map((info, index) => {
        return (
        <div className="location-carousel">
          <h3 className="index">{index + 1} of {props.information.length}</h3>
            <img src={info['location-img']} alt="location-image" className="location-image" />
            <h1>{info.name}</h1>
            <h2 className="address">{info.address}</h2>
          <div>
          </div>
          <div className="information">
            <img src={phone} alt="phone" className="phone" />
            <h3>{info['phone-num']}</h3>
            <img src={web} alt="web" className="web" />
            <h3>{info.website}</h3>
          </div>
        </div>
        )
      })}
        </Carousel>
  )
}

export default LocationCarousel;