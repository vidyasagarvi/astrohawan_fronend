// src/components/Pujas.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import usePujas from '../hooks/usePujas';
import Config from '../config/Config';

const Pujas = () => {
  const { t, i18n } = useTranslation();
  const { pujas, error } = usePujas(i18n.language);

  if (error) {
    return <div>{t('error_fetching_pujas')}</div>;
  }

  console.log(pujas);

  return (

      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-className text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>{t('product_list')}</h1>
              </div>

            </div>

            <div className="fade show p-0 active">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="row g-4">

                  {pujas.map((puja) => (
                    <div className="col-md-6 col-lg-4 col-xl-3">
                      <div className="rounded position-relative fruite-item">
                        <div className="fruite-img">
                        <img  src= {Config.apiUrl+puja._images[0]} alt={puja._images[0]}  className="img-fluid w-100 rounded-top"/>

                        {/*puja._images.map((image, index) => (
                        <img key={index} src={image} alt={`${puja._translations[0].title} ${index + 1}`}  className="img-fluid w-100 rounded-top"/>
                        ))*/}

                        </div>
                        <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>20% Off</div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4>{puja._translations[0].title}</h4>
                          <p>{puja._translations[0].description}</p>
                          <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">{t('price')}: {puja._price}</p>
                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Pujas;
