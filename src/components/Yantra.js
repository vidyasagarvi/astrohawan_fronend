// src/components/ServicesOffered.js
import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
const YantraList = lazy(() => import('./yantra/YantraList.js'))

const Yantra = () => {
  const { t } = useTranslation();

  return (

    <div>
      <div class="container-fluid page-header py-2">
      <h2 class="text-center fw-bold heading pb-2">{t('yantra_menu')}</h2>
      </div>

      <div className="container py-1">
        <Suspense fallback={<div>Loading services details...</div>}>
        <YantraList />
        </Suspense>
      </div>
    </div>



  );
};

export default Yantra;
