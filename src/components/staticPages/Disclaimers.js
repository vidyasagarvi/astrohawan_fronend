import React from 'react';
import { useTranslation } from 'react-i18next';
import Disclamer from '../Disclamer.js';

function Disclaimers() {
    const { t } = useTranslation();
  return (
<div>
   
<div className='container py-5'>
      <h1>Disclaimer</h1>
      {<Disclamer  />}

   </div>

</div>

  )
}

export default Disclaimers
