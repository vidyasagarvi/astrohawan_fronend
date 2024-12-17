import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config/Config'; // Adjust the import according to your project structure

function HelpsList() {
    const [helps, setHelps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';


    useEffect(() => {
        const fetchMandirs = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/helpsneedy/getall?lang=${language}`); // Adjust the endpoint URL
                const data = await response.json();

                if (response.ok) {
                    setHelps(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching Helps');
            } finally {
                setLoading(false);
            }
        };

        fetchMandirs();
    }, [language]);


  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (


        <div className="service-list">
        {helps.map((help) => (
            <div>

                <div key={help.id} className="service-card">
                    <Link to={`/helps/${help.id}?lang=${language}`}>

                        <div className="service-images">
                            <img src={`${Config.apiUrl}${help.images[0]}`} alt="Service" style={{ height: '200px' }} />
                        </div>
                        <h3>{help.translations.title}</h3>
                        <h4>{help.translations.title}</h4>
                    </Link>
                </div>

                <div className="card-body">
                    <Link to={`/helps/${help.id}?lang=${language}`}>
                        <h3 className="card-title btn btn-primary add-tocard">DONATE NOW</h3></Link>
                </div>
            </div>

        ))}
    </div>


    );
  
}

export default HelpsList;
