// src/components/ServicesOffered.js
import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
const ServicesList = lazy(() => import('./services/ServicesList'))

const Helps = () => {
  const { t } = useTranslation();

  return (

    <div>

<div class="container-fluid page-header py-2">
      <h2 class="text-center fw-bold heading pb-2">{t('home_page_service_title')}</h2>
      </div>

      <div className="container py-1">
        <Suspense fallback={<div>Loading services details...</div>}>
        <ServicesList />
        </Suspense>

      </div>
    </div>



  );
};

export default Helps;
