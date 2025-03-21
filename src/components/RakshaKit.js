import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Config from '../config/Config.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/RakshaKitDetails.css'; // Updated CSS

function RakshaKit() {
    const { t } = useTranslation();
    const [rakshakit, setRakshaKit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    useEffect(() => {
        const fetchRakshkit = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/rakshakit/getall?lang=${language}`);
                const data = await response.json();
                if (response.ok) {
                    setRakshaKit(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchRakshkit();
    }, [language]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!rakshakit.length) return <div>No Raksha Kits Found</div>;

    return (
        <div className='container-fluid'>
            
            <div class="container-fluid page-header py-2">
      <h2 class="text-center fw-bold heading pb-2">{t('home_page_service_title')}</h2>
      </div>
            <div className="rakshakit-container">
                {rakshakit.map((kit) => (
                    <div className="rakshakit-card" key={kit.id}>
                        {/* Left: Image Slider */}
                        <div className="rakshakit-image-section">
                            <Slider
                                dots={false}
                                infinite={true}
                                speed={500}
                                slidesToShow={1}
                                slidesToScroll={1}
                                autoplay={true}
                            >
                                {kit.images.map((image, index) => (
                                    <div key={index}>
                                        <img src={`${Config.apiUrl}${image}`} alt={`Raksha Kit ${index}`} />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* Right: Details */}
                        <div className="rakshakit-info-section">

                        <p className="rakshakit-price">₹{kit.price_local}</p>
                        <button className="rakshakit-add-to-cart">Add to Cart</button>
                            
                            <div
                                            dangerouslySetInnerHTML={{ __html: kit.translations.description || 'Description not available' }}
                             />
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RakshaKit;
