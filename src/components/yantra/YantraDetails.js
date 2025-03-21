import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../../css/RelatedItem.css'
import { CartContext } from "../../context/CartContext";
import PanditImage from '../../assets/mages/pandit.png';
import ExperienceImage from '../../assets/mages/experience.png';
import PujaImage from '../../assets/mages/puja.png';
import SolutionImage from '../../assets/mages/solution.png';

function YantraDetails() {
    const { t } = useTranslation();
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { yantraId } = useParams();
    const [relatedItems, setRelatedItems] = useState([]);
    const { cart, addToCart } = useContext(CartContext);

    const searchParams = new URLSearchParams(window.location.search);
    const language = searchParams.get('lang') || 'en';

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/yantra/get/${yantraId}/${language}`);
                const data = await response.json();

                if (response.ok) {
                    setItems(data);
                    fetchRelatedItems(language);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching Services');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [yantraId, language]);


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


    const fetchRelatedItems = async (language) => {
        try {
            const response = await fetch(`${Config.apiUrl}api/yantra/getall?lang=${language}`);
            const data = await response.json();
            if (response.ok) {
                setRelatedItems(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error fetching related products');
        }
    };




    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!items) {
        return <div>No Service Found</div>;
    }


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,  // Default for larger screens
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,  // 3 seconds
        responsive: [
            {
                breakpoint: 1024,  // For screens smaller than 1024px
                settings: {
                    slidesToShow: 2,  // Show 2 slides at a time
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,  // For screens smaller than 600px
                settings: {
                    slidesToShow: 1,  // Show 1 slide at a time
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]


    };

    return (

        <div>

            <div className="d-flex">
                <div className="container-fluid py-5">
                    <div className="container py-0">
                        <div className="row g-4 mb-5">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                        <div className="carousel-inner puja-card" role="listbox">
                                            {items.images.map((image, index) => (
                                                <div className={`carousel-item ${index === 0 ? 'active' : ''} puja-image`} key={index}>
                                                    <img
                                                        src={`${Config.apiUrl}${image}`}
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



                                {/* Right Side - Details */}
                                <div className="puja-details">
                                    <h2 className="puja-title">{items.translations.name}</h2>

                                    {/* Ratings */}
                                    {/* <div className="puja-rating">
          ⭐ 4.8
          <span className="stars">★★★★☆</span>
        </div> */}

                                    {/* Button Group for "Laghu" & "Maha" */}

                                    {/* Price */}
                                    <div className="puja-price">
                                        <span className="price">₹ 18,000</span>
                                        <p className="advance-payment">
                                            An advanced payment will be required to make a booking
                                        </p>
                                    </div>

                                    {/* Buttons - Add to Cart & Book Puja */}
                                    <div className="puja-buttons">
                                        <button onClick={() => handleAddToCart({ ...items, type: "service" })}
                                            className="add-to-cart">
                                            Add to cart
                                        </button>

                                        <button onClick={() => handlePlaceOrderClick({ ...items, type: "service" })}
                                            className="book-puja">
                                            Book Puja
                                        </button>
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


                                <div className="col-lg-12">

                                    <div className="detail-description" role="tabpanel" aria-labelledby="nav-about-tab">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: items.translations.description || 'Description not available' }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='related-items-container'>
                            <h2 class="text-center fw-bold heading pb-2">YOU MAY ALSO LIKE</h2>
                            <Slider {...settings}>
                                {relatedItems.map((Items, index) => (
                                    <Link key={index} to={`/yantras/${Items.id}?lang=${language}`}>
                                        <div className="realted-item-card" >
                                            <div className="realted-item-images" key={Items.id} >
                                                <img
                                                    src={`${Config.apiUrl}${Items.images[0]}`}
                                                    alt="product"
                                                    style={{ width: '100%', height: '210px' }}
                                                />
                                            </div>

                                            <div className='text-center mt-2'>
                                                <p className="fw-bold mb-0 text-black">{Items.translations.name}</p>
                                            </div>

                                            <div class="text-center mt-1">
                                                <p class="color-darkpink  mb-0">
                                                    ₹5100 - $150
                                                </p>
                                            </div>

                                            <div className="text-center">
                                                <button className="payment_button btn border border-secondary rounded-pill px-5 text-primary">Add to Cart</button>
                                            </div>
                                        </div>


                                    </Link>
                                ))}
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default YantraDetails;
