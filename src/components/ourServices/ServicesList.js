import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config/Config'; // Adjust the import according to your project structure
import '../../css/ServicesList.css'; // Create and import the CSS file for styling

function ServicesList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/services/getall?lang=${language}`); // Adjust the endpoint URL
                const data = await response.json();

                if (response.ok) {
                    setServices(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching mandirs');
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
        <div className="service-list">
            {services.map((service) => (
                <div>

                    <div key={service.id} className="service-card">
                        <Link to={`/service/${service.id}?lang=${language}`}>

                            <div className="service-images">
                                <img src={`${Config.apiUrl}${service.images[0]}`} alt="Service" style={{ height: '200px' }} />
                            </div>
                            <h3>{service.translations.title}</h3>
                        </Link>
                    </div>

                    <div className="card-body">
                        <Link to={`/service/${service.id}?lang=${language}`}>
                            <h3 className="card-title btn btn-primary add-tocard">PARTICIPATE</h3></Link>
                    </div>
                </div>

            ))}
        </div>
    );
}

export default ServicesList;
