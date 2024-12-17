import React, {Suspense} from 'react';
import { useTranslation } from 'react-i18next';
import MandirList from './mandir/MandirList.js';
const Process = React.lazy(() => import('./Process.js'));
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
            <h2 className='mandir-title'>{t('home_page_temple_title')}</h2>
           
            <MandirList />
           
            <Suspense fallback={<div>Loading Process Details...</div>}>
            <Process lang={language} />
            </Suspense>

            <Suspense fallback={<div>Loading Process Details...</div>}>
            <Testimonials lang={language} />
            </Suspense>

        </div>
        </div>
    );
}

export default HomePage;
