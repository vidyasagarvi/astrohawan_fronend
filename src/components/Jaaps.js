// src/components/ServicesOffered.js
import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/ServicesList.css';
const JaapList = lazy(() => import('./jaap/JaapList'))

const Jaap = () => {
  const { t } = useTranslation();

  return (

    <div>
      <div class="container-fluid page-header py-2">
      <h2 class="text-center fw-bold heading pb-2">{t('jaap_menu')}</h2>
      </div>
      <div className="container py-">
        <Suspense fallback={<div>Loading jaap details...</div>}>
        <JaapList />
        </Suspense>

      </div>
    </div>



  );
};

export default Jaap;
