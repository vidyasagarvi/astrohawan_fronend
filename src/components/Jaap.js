// src/components/ServicesOffered.js
import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/ServicesList.css';
const JaapList = lazy(() => import('./jaap/JaapList'))

const Jaap = () => {
  const { t } = useTranslation();

  return (

    <div>
      <div class="container-fluid page-header py-3">
        <h1 class="text-center text-white display-6">{t('jaap_menu')}</h1>
      </div>
      <div className="container py-4">
        <Suspense fallback={<div>Loading jaap details...</div>}>
        <JaapList />
        </Suspense>

      </div>
    </div>



  );
};

export default Jaap;
