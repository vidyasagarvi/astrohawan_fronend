// src/components/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>

<div>
      <select className="form-select" onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
    </div>
  );
};

export default LanguageSelector;
