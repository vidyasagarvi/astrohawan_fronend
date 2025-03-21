import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ServicesList.css'; // Create and import the CSS file for styling
import Config from '../../config/Config'; // Adjust the import according to your project structure
import { useTranslation } from 'react-i18next';

function ServicesList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/services/getall?lang=${language}`);
                const data = await response.json();

                if (response.ok) {
                    setServices(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching Hawans');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [language]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (

        <div className="services-container">

            {services.map((service) => (
                <div key={service.id} className="service-card">
                        <Link to={`/service/${service.id}?lang=${language}`}>
                         <div className="service-images">
                                <img src={`${Config.apiUrl}${service.images[0]}`} alt="product" style={{ width: '100%', height: '230px' }} />
                            </div>
                            <div className='text-center mt-2'>
                                <p className="fw-bold mb-0 text-black">{service.translations.name}</p>
                            </div>

                            <div class="text-center mt-1">
                                <p class="color-darkpink  mb-0">
                                    ₹5100 - $150
                                </p>
                            </div>
                        </Link>

                    <div className="text-center">
                        <button className="payment_button btn border border-secondary rounded-pill px-5 text-primary">Add to Cart</button>
                    </div>

                </div>

            ))}

        </div>

    );
}

export default ServicesList;
