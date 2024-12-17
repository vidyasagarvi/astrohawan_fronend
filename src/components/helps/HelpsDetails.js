import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CommonCart from '../CommonCart';

function HelpsDetails() {
    const { t } = useTranslation();
    const [helps, setHelps] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { helpsId } = useParams();
    const [HelpsProducts, setHelpsProduct] = useState([]);
    const [relatedItems, setRelatedItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    useEffect(() => {
        const fetchHelps = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/helpsneedy/get/${helpsId}/${language}`);
                const data = await response.json();

                if (response.ok) {
                    setHelps(data);
                    fetchHelpsProduct(language);
                    fetchRelatedItems(language)
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching mandir');
            } finally {
                setLoading(false);
            }
        };



        const fetchRelatedItems = async (language) => {
            try {
                const response = await fetch(`${Config.apiUrl}api/helpsneedy/getall/?lang=${language}`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setRelatedItems(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching related products');
            }
        };


        const fetchHelpsProduct = async (language) => {
            try {
                const response = await fetch(`${Config.apiUrl}api/helpsneedy/product/?lang=${language}`);
                const data = await response.json();

                if (response.ok) {
                    setHelpsProduct(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching related products');
            }
        };

        fetchHelps();
    }, [helpsId, language]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('helps_cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart)); // Load cart from localStorage
        }
    }, []);

    const saveCartToLocalStorage = (updatedCart) => {

        let cartForLocalStorage = updatedCart.map(item => {
            return {
                parentId: helpsId, // Or set your desired parentId logic here
                id: item.id,
                images: item.images,
                price: item.price,
                language_code: item.language_code,
                title: item.title,
                quantity: item.quantity,
                totalPrice: item.totalPrice
            };
        });

        localStorage.setItem('helps_cart', JSON.stringify(cartForLocalStorage));
    };


    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            const price = parseFloat(product.price) || 0;
            let updatedCart;
            if (existingItem) {
                const newQuantity = existingItem.quantity + 1;
                const newTotalPrice = Number((newQuantity * price).toFixed(2));
                updatedCart = prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity, totalPrice: newTotalPrice }
                        : item
                );
            } else {
                const initialTotalPrice = Number(price.toFixed(2));
                updatedCart = [...prevCart, { ...product, quantity: 1, totalPrice: initialTotalPrice }];
            }
            saveCartToLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    const removeFromCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            const price = parseFloat(product.price) || 0;

            let updatedCart;
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    updatedCart = prevCart.filter(item => item.id !== product.id);
                } else {
                    const newQuantity = existingItem.quantity - 1;
                    const newTotalPrice = Number((newQuantity * price).toFixed(2));
                    updatedCart = prevCart.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: newQuantity, totalPrice: newTotalPrice }
                            : item
                    );
                }
            } else {
                updatedCart = prevCart;
            }

            saveCartToLocalStorage(updatedCart);
            return updatedCart;
        });
    };


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,  // Default for larger screens
        slidesToScroll: 1,
        autoplay: true,
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


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!helps) {
        return <div>No Helps Found</div>;
    }

    return (
        <div className="d-flex">
            <div className="container-fluid py-5 mt-5">
                <div className="container py-0">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                            <div className="carousel-inner" role="listbox">
                                                {helps.images.map((image, index) => (
                                                    <div className={`carousel-item ${index === 0 ? 'active' : ''} rounded`} key={index}>
                                                        <img
                                                            src={`${Config.apiUrl}${image}`}
                                                            alt={`Product ${index}`}
                                                            className="img-fluid w-100 h-80 bg-secondary rounded"
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
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{helps.translations.name}</h4>
                                    <p className="mb-3">{helps.translations.address}</p>
                                    <p className="mb-3">{helps.contact_no}</p>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: helps.translations.description || 'Description not available' }}
                                    />

                                </div>
                                <div className="col-lg-12">


                                    <div className="mandir-list" id="nav-product" role="tabpanel" aria-labelledby="nav-product-tab">
                                        <p>{t('products_to_aid_devotees_description')}</p>

                                        {HelpsProducts.map((product) => {
                                            // Parse the images array if it's a string
                                            let productImages = [];
                                            try {
                                                productImages = JSON.parse(product.images);
                                            } catch (err) {
                                                console.error('Failed to parse product images:', err);
                                            }

                                            const cartItem = cart.find(item => item.id === product.id);
                                            const quantity = cartItem ? cartItem.quantity : 0;

                                            return (
                                                <div key={product.id} className="mandir-card" style={{ width: "260px" }}>
                                                    <div className="vesitable-img" style={{ float: "left", height: "200px" }}>
                                                        <img
                                                            src={`${Config.apiUrl}${productImages[0]}`}
                                                            alt={productImages[0]}
                                                            className="card-img-top" style={{ width: "200px", height: "150px" }}
                                                        />
                                                    </div>
                                                    <div className="p-3 pb-0">
                                                        <h4>{product.title}</h4>
                                                        <p><strong>Price / Unit:</strong> {product.price}</p>
                                                        <p> {product.description}</p>

                                                        <div className="card-body">
                                                            <button onClick={() => addToCart(product)} className="btn btn-primary add-tocard">
                                                                {t('add_to_cart')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="fw-bold text-primary mb-4">Related Mandir</h4>


                    <Slider {...settings}>

                        {relatedItems.map((Items) => (
                            <Link to={`/mandir/${Items.id}?lang=${language}`}>
                                <div className="related-product border border-primary rounded position-relative vesitable-item" >

                                    <div className="vesitable-img" key={Items.id} >
                                        <img
                                            src={`${Config.apiUrl}${Items.images[0]}`}
                                            alt="product"
                                            style={{ width: '100%', height: '150px' }}
                                        /></div>

                                    <div className="p-4 pb-0 rounded-bottom">
                                        <h3>{Items.translations.name}</h3>
                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                            <p className="text-dark fs-5 fw-bold">{Items.translations.place}</p>

                                            <div className="card-body">
                                                <Link to={`/pooja-store/?lang=${language}`}><h3 className="card-title"></h3></Link>
                                                <button className="btn btn-primary add-tocard">
                                                    {t('add_to_cart')}
                                                </button>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </Slider>



                </div>
            </div>
            {/* Fixed Cart Section */}
            <CommonCart cart={cart} isMobile={isMobile} addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
    );
}

export default HelpsDetails;
