import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config/Config'; // Adjust the import according to your project structure
import '../../css/ServicesList.css'; // Create and import the CSS file for styling
import { useTranslation } from 'react-i18next';
import { CartContext } from "../../context/CartContext";



function HawansList() {
    const [hawans, setHawans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { cart, addToCart } = useContext(CartContext);
    const userData = JSON.parse(localStorage.getItem("userData"));


    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';
    useEffect(() => {
        const fetchHawans = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}hawans/getall?lang=${language}`); // Adjust the endpoint URL
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
                                <img src={`${Config.imageUrl}${hawan.images[0]}`} alt="product" style={{ width: '100%', height: '230px' }} />
                            </div>
                            <div className='text-center mt-2'>
                                <p className="fw-bold mb-0 text-black">{hawan.translations.name}</p>
                            </div>

                            <div className="text-center mt-1">
                                <p className="color-darkpink  mb-0">

                                {!userData ? (
                                            <span>  ₹{hawan.price_national} - ${hawan.price_international}</span>
                                        ) : userData.calling_code === "91" ? (
                                            <span>  ₹{hawan.price_national}</span>
                                        ) : (
                                            <span> ${hawan.price_international}</span>
                                        )}
  
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className=" text-center">
                        <button onClick={() => addToCart({ ...hawan, type: "hawan" }, 1)}
                            className="payment_button btn border border-secondary rounded-pill px-5 text-primary">
                            Add to cart
                        </button>

                    </div>

                </div>

            ))}

        </div>

    );
}

export default HawansList;
