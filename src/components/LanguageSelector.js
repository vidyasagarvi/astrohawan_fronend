// src/components/LanguageSelector.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    navigate(`?lang=${lng}`);
  };

  return (
<div className='language_selector'>
      <select className="form-select" onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>

  );
};

export default LanguageSelector;
