import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ServicesList.css'; // Create and import the CSS file for styling
import Config from '../../config/Config'; // Adjust the import according to your project structure
import { useTranslation } from 'react-i18next';
import { CartContext } from "../../context/CartContext";

function ServicesList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { cart, addToCart } = useContext(CartContext);

    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';
    const userData = JSON.parse(localStorage.getItem("userData"));


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


    const handleAddToCart = async (servicesCart) => {
        const savedCart = localStorage.getItem("cartItems");

        let quantity = 1;
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                quantity = parsedCart.filter(item => item.type === "service").length + 1;
            }
        }

        const fetchedPrices = await fetchPrice(quantity); // Use returned value
        if (!fetchedPrices || fetchedPrices.length === 0) {
            console.error("Failed to fetch prices.");
            return;
        }

        const groupedPrices = fetchedPrices.reduce((acc, item) => {
            if (!acc[item.currency]) {
                acc[item.currency] = 0;
            }
            acc[item.currency] += parseFloat(item.price);
            return acc;
        }, {});

        addToCart({ ...servicesCart, type: 'service', groupedPrices }, 1);

    };


    const fetchPrice = async (quantity) => {
        try {
            const priceResponse = await fetch(`${Config.apiUrl}api/services/getprice/${quantity}`);
            const priceData = await priceResponse.json();
            if (priceResponse.ok) {
                return priceData; // Return the fetched price
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error fetching price:", err);
            return null;
        }
    };

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

                                {!userData ? (
                                <span> ₹5100 - $150</span>
                                ) : userData.calling_code === "+91" ? (
                                <span>₹5100</span>
                                ) : (
                                <span>$150</span>
                                )}

                                </p>
                            </div>
                        </Link>

                    <div className="text-center">

                        <button onClick={() => handleAddToCart({ ...service, type: "service" })} className="payment_button btn border border-secondary rounded-pill px-5 text-primary">
                            Add to Cart
                        </button>
                    </div>

                </div>

            ))}

        </div>

    );
}

export default ServicesList;
