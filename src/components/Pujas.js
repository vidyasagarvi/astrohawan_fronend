import React from 'react';
import { useTranslation } from 'react-i18next';
import Config from '../config/Config';
import { Link } from 'react-router-dom';

const Pujas = ({setIsDrawerOpen, productsByCategory }) => {
  const { t } = useTranslation();
  const { dispatch } = useCart();

  const searchParams = new URLSearchParams(location.search);
  const language = searchParams.get('lang') || 'en';

  const handleAddToCart = (productId) => {
    dispatch({ type: 'ADD_TO_CART', payload: productId,quantity:1});
    setIsDrawerOpen(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const strippedText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags
    if (strippedText.length <= maxLength) {
        return strippedText;
    }

    return (
        <>
            {strippedText.substring(0, maxLength)}
            <span className="readmore_toggle_text">....</span>
        </>
    );
    // return strippedText.substring(0, maxLength) +  'More ...';
};

  return (
    <div className="container-fluid py-1">
      <div className="container">
        {Object.keys(productsByCategory).map((category, index) => (
          <div key={index} className="my-4">
            <h2>{category}</h2>
            <div className="row g-5">
              {productsByCategory[category].map((product) => (
                <div key={product._id} className="col-md-5 col-lg-5 col-xl-3">
                  <div className="card storeitems" >
                  <Link to={`/pooja-store/${product._id}?lang=${language}`}>

                  <span className="card-imgtext">{t('cart_imgtext')}</span>
       
                    {product._discount>0 ? (
                        <span className="card-discount">{product._discount}% OFF</span>
                      ) : (
                       <span></span>
                    )}
                   
                      <img
                        src={`${Config.apiUrl}${product._images[0]}`}
                        alt={product._images[0]}
                        className="card-img-top"
                      />
                      <span className="card-price">{t('price')}: {product._price}</span>
                   </Link>
                    <div className="card-body">
                    <Link to={`/pooja-store/${product._id}?lang=${language}`}>
                    <h3 className="card-title">
                    {truncateText(product._categoryId[0].title, 90)}
                    </h3>
                      
                      </Link>
                      <button onClick={() => handleAddToCart(product._id)} className="btn btn-primary add-tocard">
                        {t('add_to_cart')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pujas;
