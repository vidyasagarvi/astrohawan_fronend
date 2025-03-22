import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
const ServicesList = React.lazy(() => import('./services/ServicesList.js'));
const HawansList = React.lazy(() => import('./hawans/HawansList.js'));
const Testimonials = React.lazy(() => import('./Testimonials.js'));
function HomePage() {

    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';
    const { t } = useTranslation();
    return (
        <div className='container-fluid py-2'>
            <div className='container'>
                <div className='home_pagetitle shadow-lg p-3 mb-5 bg-white rounded'>
                    <h1>{t('home_page_title')}</h1>
                    <p>{t('home_page_content')}</p>
                </div>

                <div className="container-fluid">
                    <h2 className="text-center fw-bold heading pb-2">{t('home_page_service_title')}</h2>
                </div>


                <div className='home_pagetitle shadow-lg p-3 mb-5 bg-white rounded'>

                    <p className="pricing-line">
                        <span className="national-price">₹5100</span> for 2 &nbsp; | &nbsp;
                        <span className="national-price">₹7100</span> for 3 &nbsp; | &nbsp;
                        <span className="national-price">₹11000</span> for more than 3 &nbsp; <span className="separator">|</span> &nbsp;
                        <span className="on-call">ON CALL</span> &nbsp; <span className="separator">|</span> &nbsp;
                        <span className="international-price">$150</span> for 2 &nbsp; | &nbsp;
                        <span className="international-price">$200</span> for 3 &nbsp; | &nbsp;
                        <span className="international-price">$300</span> for more than 3
                    </p>
                </div>

                <Suspense fallback={<div>Loading Process Details...</div>}>
                    <ServicesList lang={language} />
                </Suspense>

                <div className="container-fluid py-4">
                    <h2 className="text-center fw-bold heading">{t('hawan_title')}</h2>
                </div>
                <Suspense fallback={<div>Loading Process Details...</div>}>
                    <HawansList lang={language} />
                </Suspense>

                <Suspense fallback={<div>Loading Process Details...</div>}>
                    <Testimonials lang={language} />
                </Suspense>

            </div>
        </div>
    );
}

export default HomePage;
