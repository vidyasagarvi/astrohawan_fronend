import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Config from '../../config/Config';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Disclamer from '../Disclamer.js';
import ReturnsPolicy from '../ReturnsPolicy.js';

function PujaStoreDetails({ setIsDrawerOpen }) {
    const { t } = useTranslation();
    const { dispatch } = useCart();
    const { productId } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const increaseCount = () => {
        setCount(count + 1);
    };
    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    // Extract the language parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    const handleAddToCart = (productId) => {
        dispatch({ type: 'ADD_TO_CART', payload: productId, quantity: count });
        setIsDrawerOpen(true);
    };



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}${Config.endpoints.pujastore}/${productId}?lang=${language}`);
                const data = await response.json();

                if (response.ok) {
                    setProduct(data);
                    fetchRelatedProducts(data._category.id);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedProducts = async (categoryId) => {
            try {
                const response = await fetch(`${Config.apiUrl}${Config.endpoints.pujastore}?lang=${language}`);
                const data = await response.json();
                
                if (response.ok) {
                    setRelatedProducts(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching related products');
            }
        };

        fetchProduct();
    }, [productId, language]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }


    const { _id, _images, _price, _discount, _translations, _category } = product;
    const translationsDetails = _translations.find(cat => cat.language_code === language);
    const discount = _price - (_price * _discount) / 100;
    
    
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



    return (
        <div>
            <div className="container-fluid page-header py-3">
                <h1 className="text-center text-white display-5">{translationsDetails?.title}</h1>
            </div>

            <div className="container py-4">
                <div className="row g-4 mb-5">
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="border rounded">
                                    <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                        <div className="carousel-inner" role="listbox">
                                            {_images && _images.map((image, index) => (
                                                <div className="carousel-item active rounded"><img key={index} src={`${Config.imageUrl}${image}`} alt={`Product ${index}`} className="img-fluid w-100 h-80 bg-secondary rounded" /> </div>
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

                                <h2 className="mb-3">Category: {_category.name}</h2>
                                <span className="f_price" data-attr="1825"> {t('price')}{discount.toFixed(2)}</span>
                                <span className='mrp'>MRP:</span> <span className="o_price1">
                                    {t('price')}{_price}
                                </span>

                                <span className="discount" data-attr="25" content="25"> {_discount}% off</span>


                                <div className="quantity-selector store-details">

                                    <button className="quantity-btn" onClick={decreaseCount} >-</button>
                                    <div className='quantity'>{count}</div>
                                    <button className="quantity-btn" onClick={increaseCount}>+</button>


                                </div>
                                <button onClick={() => handleAddToCart(product._id)} className="single_add_to_cart_button button alt">{t('add_to_cart')}</button>


                            </div>
                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">
                                        <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                            id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                            aria-controls="nav-about" aria-selected="true">DESCRIPTION</button>
                                        <button className="nav-link border-white border-bottom-0" type="button" role="tab"
                                            id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                            aria-controls="nav-mission" aria-selected="false">SHIPPING & RETURNS</button>
                                    </div>
                                </nav>
                                <div className="tab-content mb-5">
                                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">

                                        <div
                                            dangerouslySetInnerHTML={{ __html: translationsDetails?.description || 'Description not available' }}
                                        />
                                    </div>
                                    <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                                       
                                            
                                            <h3>Returns Policy</h3>

                                            {<ReturnsPolicy  />}
                                         
                                    </div>
                                    <h2>Disclamer</h2>
                                    {<Disclamer  />}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                { /*<h2 className="mandir-title">Related Products</h2>
                <Slider {...settings}>
                    {relatedProducts.map((category) => (
                        <Link to={`/pooja-store/${category._products[0]._id}?lang=${language}`}>
                            <div className="related-product border border-primary rounded position-relative vesitable-item" >

                                <div className="vesitable-img" key={product._id} >
                                    <img
                                        src={`${Config.apiUrl}${category._products[0]._images[0]}`}
                                        alt="product"
                                        style={{ width: '100%', height: '200px' }}
                                    /></div>

                                <div className="rounded-bottom">
                                    <h3>{category._products[0]._categoryId[0].title}</h3>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">{t('price')}{category._products[0]._price}</p>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <Link to={`/pooja-store/${product._id}?lang=${language}`}><h3 className="card-title"></h3></Link>
                                    <button className="btn btn-primary add-tocard">
                                        {t('add_to_cart')}
                                    </button>
                                </div>

                            </div>



                        </Link>
                    ))}
                </Slider> */ }

            </div>
        </div>
    );
}

export default PujaStoreDetails;
