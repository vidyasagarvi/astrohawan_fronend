import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
    const { t } = useTranslation();
  return (
<div>
   
<div className='container py-5'>
      <h1>{t('about_menu')}</h1>

      <div dangerouslySetInnerHTML={{__html: t('about_content')}}>
      </div>
      {/* Add more content about services offered here */}
    </div>

</div>

  )
}

export default About
