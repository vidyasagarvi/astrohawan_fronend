import React, { useEffect, useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CommonCart from '../CommonCart.js';
import mandirIcon from '../../assets/hindu-temple-svgrepo-com.svg';
import Disclamer from '../Disclamer.js';


function MandirDetails() {
    const { t } = useTranslation();
    const [mandir, setMandir] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { mandirId } = useParams();
    const [mandirProducts, setMandirProduct] = useState([]);
    const [relatedItems, setRelatedItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showModal, setShowModal] = useState(false);
    const [showfulltextModal, setfulltextShowModal] = useState('');

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
        const fetchMandir = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}api/mandir/get/${mandirId}/${language}`);
                const data = await response.json();

                if (response.ok) {
                    setMandir(data);
                    fetchMandirProduct(language);
                    fetchRelatedItems(language);
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
                const response = await fetch(`${Config.apiUrl}api/mandir/getall?lang=${language}`);
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



        const fetchMandirProduct = async (language) => {
            try {
                const response = await fetch(`${Config.apiUrl}api/mandir/product/?lang=${language}`);
                const data = await response.json();

                if (response.ok) {

                    data.forEach(item => {
                        item.parentId = mandirId; 
                        item.type = 'mandir'// Replace "newValue" with your desired value
                    });
  
                     setMandirProduct(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching related products');
            }
        };

        fetchMandir();
    }, [mandirId, language]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('mandir_cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart)); // Load cart from localStorage
        }
    }, []);


    const saveCartToLocalStorage = (updatedCart) => {

        let cartForLocalStorage = updatedCart.map(item => {
            return {
                parentId: mandirId, // Or set your desired parentId logic here
                id: item.id,
                images: item.images,
                price: item.price,
                language_code: item.language_code,
                title: item.title,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
                type:'mandir',
            };
        });

        localStorage.setItem('mandir_cart', JSON.stringify(cartForLocalStorage));
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

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        const strippedText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags
        if (strippedText.length <= maxLength) {
            return strippedText;
        }

        return (
            <>
                {strippedText.substring(0, maxLength) + '...'}
                <span className="readmore_toggle_text" onClick={() => onShowMore(text)}>Read More &#x25BC;</span>
            </>
        );
        // return strippedText.substring(0, maxLength) +  'More ...';
    };

    const onShowMore = (text) => {
        setfulltextShowModal(text)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);


    const CartSummary = ({ cart }) => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return (
            <div className="cart-summary-mahakumbh fixed-bottom p-3 shadow">
                <div className="container d-flex justify-content-between align-items-center">
                    <span>{totalItems} item(s) in the cart</span>
                    <span>Total: ₹{totalPrice}</span>
                    <span className="checkout-mahakumbh">Next</span>
                </div>
            </div>
        );
    };


    const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!mandir) {
        return <div>No Mandir Found</div>;
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
            <div className="container-fluid page-header py-3">
                <h1 className="text-center text-white display-5">{mandir.translations.name}</h1>
            </div>
            <div className="d-flex">
                <div className="container-fluid py-4 mt-2">
                    <div className="container py-0">
                        <div className="row g-4 mb-5">
                           
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="border rounded">
                                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                                <div className="carousel-inner" role="listbox">
                                                    {mandir.images.map((image, index) => (
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
                                        <h2>{t('benefits_of_helping_devotees')}</h2>
                                        <ul className='benefits-list'>
                                            {mandir.benefits.map((benefit) => (
                                                <li key={benefit.id}>{benefit.description}</li>
                                            ))}
                                        </ul>
                                        <span className='mandir-icondetails'><img src={mandirIcon} alt="Mandir place" ></img></span>
                                        <p className='mandir-discriptionplace'>{mandir.translations.place}</p>
                                    </div>
                                    
                                    <div className="col-lg-12">

                                        <ul className="nav nav-tabs mb-3">
                                            <li className="nav-item">
                                                <a className="nav-link" aria-current="page" href="#nav-description">{t('tab_description')}</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#nav-benefit">{t('benefits_of_helping_devotees')}</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#nav-product">{t('products_to_aid_devotees')}</a>
                                            </li>
   

                                        </ul>

                                        <div className="tab-content mb-5">


                                            <div id="nav-description" role="tabpanel" aria-labelledby="nav-about-tab">
                                                <h2>{t('tab_description')}</h2>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: mandir.translations.description || 'Description not available' }}
                                                />
                                            </div>

                                            <div id="nav-benefit" role="tabpanel" aria-labelledby="nav-mission-tab">
                                                <h2>{t('benefits_of_helping_devotees')}</h2>
                                                <div className="d-flex">
                                                    <ul className='benefits-list'>
                                                        {mandir.benefits.map((benefit , index) => (
                                                            <li key={index}>{benefit.description}</li>
                                                        ))}
                                                    </ul>
                                                  
                                                </div>
                                                <h2>Disclamer</h2>
                                                {<Disclamer  />}
                                            </div>
                                            <p></p>

                                            <h2>{t('products_to_aid_devotees')}</h2>
                                            <p></p>

                                            <div className='mandir-list' id="nav-product" role="tabpanel" aria-labelledby="nav-product-tab">

                                                <p>{t('products_to_aid_devotees_description')}</p>
                                                
                                                {mandirProducts.map((product) => {

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
                                                        <div>
                                                            <div key={product.id} className="mandir-card" style={{ width: "260px" }}>
                                                                <div className="mandir-images">
                                                                    <img
                                                                        src={`${Config.apiUrl}${productImages[0]}`}
                                                                        alt={productImages[0]}
                                                                        className="card-img-top" style={{ width: "230px", height: "200px" }}
                                                                    />
                                                                </div>

                                                                <div className='mandir-content'>
                                                                    <h3>{product.title}</h3>

                                                                    <p><strong>Price :</strong> {product.price}  {product.price_description} </p>

                                                                   {/*product.person > 1 ? (
                                                                    <p><strong>Price :</strong> {product.price} for {product.person} person</p>
                                                                    ) : (
                                                                        <p><strong>Price :</strong> {product.price} per  person</p>
                                                                    )*/}

                                                                    <p> {truncateText(product.description, 150)}</p>
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <button onClick={() => addToCart(product)} className="btn btn-primary add-tocard">
                                                                    {t('add_to_cart')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                           
                        </div>
                        
                        <h2 className="mandir-title">Related Mandir</h2>

                        <Slider {...settings}>

                            {relatedItems.map((Items , index) => (
                                <Link key={index} to={`/mandir/${Items.id}?lang=${language}`}>
                                    <div className="mandir-card" >
                                        <div className=" mandir-images" key={Items.id} >
                                            <img
                                                src={`${Config.apiUrl}${Items.images[0]}`}
                                                alt="product"
                                                style={{ width: '100%', height: '150px' }}
                                            />
                                        </div>
                                        <div className='related-item'>
                                        <h3>{Items.translations.name} </h3>
                                        </div>
                                        <div className="card-body">
                                            <Link to={`/mandir/${Items.id}?lang=${language}`}>
                                                <h3 className="card-title btn btn-primary add-tocard">PARTICIPATE</h3></Link>
                                        </div>

                                    </div>


                                </Link>

                            ))}
                        </Slider>

                    </div>
                </div>
                {/* Fixed Cart Section */}
                <CommonCart cart={cart} isMobile={isMobile} addToCart={addToCart} removeFromCart={removeFromCart} />

                {cart.length > 0 && <CartSummary cart={cart} />}


                {/* Modal for showing the full description */}
                <Modal show={showModal} onHide={handleCloseModal} className='show-fulltext'>
                    <Modal.Body>
                        <p dangerouslySetInnerHTML={{ __html: showfulltextModal }} />
                        <span className='close-fulltext' onClick={handleCloseModal}>X</span>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default MandirDetails;
