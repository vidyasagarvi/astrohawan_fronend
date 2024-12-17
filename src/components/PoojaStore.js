// src/components/ServicesOffered.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const PoojaStore = () => {
  const { t } = useTranslation();

  return (
      <div className="container-fluid page-header py-3">
        <h1 className="text-center text-white display-6">{t('mypooja_store')}</h1>
      </div>
  );
};

export default PoojaStore;
