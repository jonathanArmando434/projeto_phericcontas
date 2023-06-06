import { BsCheck } from 'react-icons/bs'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import client1 from '../assets/images/client-001.png'
import client2 from '../assets/images/client-02.png'
import client3 from '../assets/images/client-03.png'
import client4 from '../assets/images/client-04.png'
import client5 from '../assets/images/client-05.png'
import client6 from '../assets/images/client-06.png'
import client7 from '../assets/images/client-07.png'
import client8 from '../assets/images/client-08.png'

const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
};

const Carousel = () => {
    return (
        <Slider {...settings}>
            <div className="d-flex container-slider-logo m-0 row">
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client5} alt="" />
                </div>
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client6} alt="" />
                </div>
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client7} alt="" />
                </div>
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client8} alt="" />
                </div>
            </div>
            <div className="d-flex container-slider-logo m-0 row">
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client1} alt="" />
                </div>
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client2} alt="" />
                </div>
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client3} alt="" />
                </div>
                <div className="m-0 col-3 box-logo">
                    <img className='logo-client' src={client4} alt="" />
                </div>
            </div>
        </Slider>
    );
};

export default Carousel;
