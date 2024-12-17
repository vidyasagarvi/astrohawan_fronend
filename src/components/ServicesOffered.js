// src/components/ServicesOffered.js
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
const ServicesList = React.lazy(() => import('././ourServices/ServicesList.js'));

const ServicesOffered = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div class="container-fluid page-header py-3">
        <h1 class="text-center text-white display-6">{t('services_offered')}</h1>
      </div>
      <div className="container py-4">
        <Suspense fallback={<div>Loading services details...</div>}>
          <ServicesList />
        </Suspense>

      </div>
    </div>
  );
};

export default ServicesOffered;
