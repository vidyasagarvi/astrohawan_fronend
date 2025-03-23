import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config/Config'; // Adjust the import according to your project structure
import '../../css/ServicesList.css'; // Create and import the CSS file for styling
import { useTranslation } from 'react-i18next';
import { CartContext } from "../../context/CartContext";
function JaapList() {
    const [jaaps, setJaaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { cart, addToCart } = useContext(CartContext);
    const userData = JSON.parse(localStorage.getItem("userData"));


    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    useEffect(() => {
        const fetchJaaps = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}jaap/getall?lang=${language}`); // Adjust the // Adjust the endpoint URL
                const data = await response.json();

                if (response.ok) {
                    setJaaps(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching Hawans');
            } finally {
                setLoading(false);
            }
        };

        fetchJaaps();
    }, [language]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
  
        <div className="services-container">
            
            {jaaps.map((jaap) => (
              <div key={jaap.id} className="service-card">
                <div key={jaap.id} className="mandir-card">
                    <Link to={`/jaap/${jaap.id}?lang=${language}`}>

                    <div className="service-images">
                    <img src={`${Config.imageUrl}${jaap.images[0]}`} alt="product" style={{ width: '100%', height: '230px' }} />
                        </div>
                        <div className='text-center mt-2'>
                                <p className="fw-bold mb-0 text-black">{jaap.translations.name}</p>
                            </div>

                            <div class="text-center mt-1">
                                <p class="color-darkpink  mb-0">
                                {!userData ? (
                                            <span>  ₹{jaap.price_national} - ${jaap.price_international}</span>
                                        ) : userData.calling_code === "91" ? (
                                            <span>  ₹{jaap.price_national}</span>
                                        ) : (
                                            <span> ${jaap.price_international}</span>
                                        )}
                                </p>
                            </div>
                    </Link>
                </div>
                <div className=" text-center">
                <button onClick={() => addToCart({ ...jaap, type: "jaap" }, 1)}
                            className="payment_button btn border border-secondary rounded-pill px-5 text-primary">
                            Add to cart
                        </button>
                    </div>

                </div>
               
            ))}

        </div>
   
    );
}

export default JaapList;
