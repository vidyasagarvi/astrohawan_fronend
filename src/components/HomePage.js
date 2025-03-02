import React, {Suspense} from 'react';
import { useTranslation } from 'react-i18next';
const ServicesList = React.lazy(() => import('./services/ServicesList.js'));
const HawansList = React.lazy(() => import('./hawans/HawansList.js'));
const Testimonials = React.lazy(() => import('./Testimonials.js'));
function HomePage() {

    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';
    const { t } = useTranslation();
    return (
        <div className='container-fluid py-3'>
            <div className='container'>
            <div className='home_pagetitle shadow-lg p-3 mb-5 bg-white rounded'>
            <h1>{t('home_page_title')}</h1>
            <p>{t('home_page_content')}</p>
       
            </div>
            <h2 className='mandir-title'>{t('home_page_service_title')}</h2>
  
            <Suspense fallback={<div>Loading Process Details...</div>}>
            <ServicesList lang={language} />
            </Suspense>

            <h2 className='mandir-title'>{t('hawan_title')}</h2>
           
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
