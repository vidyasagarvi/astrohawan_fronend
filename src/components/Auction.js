// src/components/ServicesOffered.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Auction = () => {
  const { t } = useTranslation();

  return (
    <div>
       <div class="container-fluid page-header py-3">
        <h1 class="text-center text-white display-6">{t('auction')}</h1>
      </div>
    <div className="container py-3">
      <p>COMMING SOON...</p>
      {/* Add more content about services offered here */}
    </div>
    </div>
  );
};

export default Auction;
