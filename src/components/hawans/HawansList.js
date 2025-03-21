import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config/Config'; // Adjust the import according to your project structure
import '../../css/ServicesList.css'; // Create and import the CSS file for styling
import { useTranslation } from 'react-i18next';

function HawansList() {
    const [hawans, setHawans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';
    useEffect(() => {
        const fetchHawans = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/hawans/getall?lang=${language}`); // Adjust the endpoint URL
                const data = await response.json();

                if (response.ok) {
                    setHawans(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching Hawans');
            } finally {
                setLoading(false);
            }
        };

        fetchHawans();
    }, [language]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
  
        <div className="services-container">
            
            {hawans.map((hawan) => (
              <div key={hawan.id} className="service-card">
                <div key={hawan.id} className="mandir-card">
                    <Link to={`/hawan/${hawan.id}?lang=${language}`}>

                    <div className="service-images">
                    <img src={`${Config.apiUrl}${hawan.images[0]}`} alt="product" style={{ width: '100%', height: '230px' }} />
                        </div>
                        <div className='text-center mt-2'>
                                <p className="fw-bold mb-0 text-black">{hawan.translations.name}</p>
                            </div>

                            <div class="text-center mt-1">
                                <p class="color-darkpink  mb-0">
                                ₹{hawan.price_national} - ${hawan.price_international}
                                </p>
                            </div>
                    </Link>
                </div>
                <div className=" text-center">
                        <button className="payment_button btn border border-secondary rounded-pill px-5 text-primary">Add to Cart</button>
                    </div>

                </div>
               
            ))}

        </div>
   
    );
}

export default HawansList;
