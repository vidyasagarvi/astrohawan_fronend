import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config/Config'; // Adjust the import according to your project structure
import '../../css/Services_List.css'; // Create and import the CSS file for styling
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function MandirList() {
    const [mandirs, setMandirs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    const NextArrow = ({ onClick }) => {
        return (
            <div className="next-arrow" onClick={onClick}>
                <span style={{ fontSize: '24px', color: 'white' }}>{'>'}</span>
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="prev-arrow" onClick={onClick}>
                <span style={{ fontSize: '24px', color: 'white' }}>{'<'}</span>
            </div>
        );
    };



    useEffect(() => {
        const fetchMandirs = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/services/getall?lang=${language}`); // Adjust the endpoint URL
                const data = await response.json();

                if (response.ok) {
                    setMandirs(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching mandirs');
            } finally {
                setLoading(false);
            }
        };

        fetchMandirs();
    }, [language]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        nextArrow: <NextArrow />,  // Custom Next Arrow
        prevArrow: <PrevArrow />   // Custom Prev Arrow
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
  
        <div className="mandir-list">

            {mandirs.map((mandir) => (
                <div>
           
                <div key={mandir.id} className="mandir-card">
                    <Link to={`/mandir/${mandir.id}?lang=${language}`}>

                        <div className="mandir-images">
                            <Slider {...sliderSettings}>
                                {mandir.images.map((image, index) => (
                                    <div key={index}>
                                        <img src={`${Config.apiUrl}${image}`} alt="Services" style={{ height: '200px' }} />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <h3>{mandir.translations.name}</h3>
                    </Link>

                 
                </div>
                <div className="card-body">
                        <Link to={`/mandir/${mandir.id}?lang=${language}`}>
                            <h3 className="card-title btn btn-primary add-tocard">PARTICIPATE</h3></Link>
                    </div>

                </div>
               
            ))}

        </div>
   
    );
}

export default MandirList;
