import React, { useEffect, useState ,useContext} from 'react';
import { useTranslation } from 'react-i18next';
import Config from '../config/Config.js';
import { CartContext } from "../context/CartContext";
import '../css/RakshaKitDetails.css'; // Updated CSS
import PanditImage from '../assets/mages/pandit.png';
import ExperienceImage from '../assets/mages/experience.png';
import PujaImage from '../assets/mages/puja.png';
import SolutionImage from '../assets/mages/solution.png';

function RakshaKit() {
    const { t } = useTranslation();
    const [rakshakit, setRakshaKit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { cart, addToCart } = useContext(CartContext);
    


    useEffect(() => {
        const fetchRakshkit = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}rakshakit/getall?lang=${language}`);
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
            </div>
            <div className='container'>
            {rakshakit.map((kit) => (
            <div className="rakshakit-container">
               
                    <div className="rakshakit-card" key={kit.id}>
                        {/* Left: Image Slider */}
                        <div className="rakshakit-image-section">


                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner puja-card" role="listbox">
                                    {kit.images.map((image, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''} puja-image`} key={index}>
                                            <img
                                                src={`${Config.imageUrl}${image}`}
                                                alt={`Product ${index}`}
                                                className="img-fluid bg-secondary rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>

                            </div>
                        </div>

                        {/* Right: Details */}

                        <div className="puja-details">
                            <h2 className="puja-title">{kit.translations.name}</h2>

                            {/* Price */}
                            <div className="puja-price">
                                     {!userData ? (
                                            <span className="price">  ₹{kit.price_national} - ${kit.price_international}</span>
                                        ) : userData.calling_code === "91" ? (
                                            <span className="price">  ₹{kit.price_national}</span>
                                        ) : (
                                            <span className="price"> ${kit.price_international}</span>
                                        )}

                                <p className="advance-payment">
                                    An advanced payment will be required to make a booking
                                </p>
                            </div>

                            {/* Buttons - Add to Cart & Book Puja */}
                            <div className="puja-buttons">
                                <button onClick={() => addToCart({ ...kit, type: "rakshakit" }, 1)}
                                    className="add-to-cart">
                                    Add to cart
                                </button>

                                {/* <button onClick={() => handlePlaceOrderClick({ ...kit, type: "rakshakit" })}
                                    className="book-puja">
                                    Book Puja
                                </button> */}
                            </div>


                            {/* Features List */}
                            <ul className="puja-features">
                                <li>
                                    <img src={PanditImage} alt="Authentic Ritual Experts" />

                                    Authentic Ritual Experts
                                </li>
                                <li>
                                    <img src={ExperienceImage} alt="More than 20 Years of Proven Experience" />
                                    More than 20 Years of Proven Experience
                                </li>
                                <li>
                                    <img src={SolutionImage} alt="Trusted Ritual Solutions" />
                                    Trusted Ritual Solutions
                                </li>
                                <li>
                                    <img src={PujaImage} alt="Performed Sacred Rituals for Devotees Worldwide" />
                                    Performed Sacred Rituals for Devotees Worldwide
                                </li>
                            </ul>
                        
                        </div>
                    </div>
                <div
                    dangerouslySetInnerHTML={{ __html: kit.translations.description || 'Description not available' }}
                />

            </div>
        ))}
        </div>
           
        </div>
    );
}

export default RakshaKit;
