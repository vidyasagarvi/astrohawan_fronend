// src/components/ServicesOffered.js
import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/ServicesList.css';
const HelpsList = lazy(() => import('./helps/HelpsList'))

const Helps = () => {
  const { t } = useTranslation();

  return (

    <div>
      <div class="container-fluid page-header py-3">
        <h1 class="text-center text-white display-6">{t('helpto_needy')}</h1>
      </div>
      <div className="container py-4">
        <Suspense fallback={<div>Loading services details...</div>}>
        <HelpsList />
        </Suspense>

      </div>
    </div>



  );
};

export default Helps;
