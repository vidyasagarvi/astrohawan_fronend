import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  return (
    <div>
      <div class="container-fluid page-header py-3">
        <h1 class="text-center text-white display-6">{t('about_menu')}</h1>
      </div>
      <div className='container py-4'>
        <div dangerouslySetInnerHTML={{ __html: t('about_content') }}>
        </div>
        {/* Add more content about services offered here */}
      </div>

    </div>

  )
}

export default About
