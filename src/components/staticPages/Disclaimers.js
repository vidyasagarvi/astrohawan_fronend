import React from 'react';
import { useTranslation } from 'react-i18next';

function Disclaimers() {
    const { t } = useTranslation();
  return (
<div>
   
<div className='container py-5'>
      <h1>Disclaimer</h1>
    <p>The contents of Satim are solely for informational purposes and to give the users access to an array of services for one's religious/spiritual journey.</p>
    <p>Predictions or other messages you receive shouldn't be used in place of advice, treatment, or programs advised by NavLink licensed professional, such as a lawyer, doctor, psychiatrist, or financial advisor.</p>
    <p>To avoid any discrepancy, we ask users to thoroughly read our policies.</p>
    <p>Terms & Condition Policy</p>
    <p>Privacy Policy</p>

   </div>

</div>

  )
}

export default Disclaimers
