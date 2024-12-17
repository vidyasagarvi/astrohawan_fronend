// FAQSection.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

function Testimonials({ faqs }) {

    const { t } = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Adjust for responsiveness
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // 3 seconds
        arrows: false, 
        responsive: [
            {
                breakpoint: 768, // For tablets
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480, // For mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="testimonials">
            <h2>{t('testimonials_title')}</h2>
            <h3>9 / 10 Devotees rate satim 5⭐ for our good service</h3>
            <Slider {...settings}>
                <div className="testimonials-card rounded position-relative">
                    <div className="p-4 pb-0 rounded-bottom">
                        <p>Very Good Services and Response. And you people doing great job in these day of technology. We can please God on particular occasions in particular places with help of Satim Team. Thanks a lot 🙏🙏🙏
                        </p>
                        <h4>- Parsely</h4>
                    </div>
                </div>
                <div className="testimonials-card rounded position-relative">
                  
                    <div className="p-4 pb-0 rounded-bottom">
                       
                        <p>Very Good Services and Response. And you people doing great job in these day of technology. We can please God on particular occasions in particular places with help of Satim Team. Thanks a lot 🙏🙏🙏
                        </p>
                        <h4>- Parsely</h4>
                    </div>
                </div>

                <div className="testimonials-card rounded position-relative">
                    <div className="p-4 pb-0 rounded-bottom">
                        <p>Very Good Services and Response. And you people doing great job in these day of technology. We can please God on particular occasions in particular places with help of Satim Team. Thanks a lot 🙏🙏🙏
                        </p>
                        <h4>- Parsely</h4>
                    </div>
                </div>

            </Slider>



        </div>
    );
}

export default Testimonials;
