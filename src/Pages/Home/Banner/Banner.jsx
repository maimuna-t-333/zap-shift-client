import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banImg1 from '../../../assets/banner/banner1.png';
import banImg2 from '../../../assets/banner/banner2.png';
import banImg3 from '../../../assets/banner/banner3.png';
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel className='my-10' autoPlay={true} infiniteLoop={true} showThumbs={false}>
            <div>
                <img src={banImg1} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={banImg2} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={banImg3} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default Banner;