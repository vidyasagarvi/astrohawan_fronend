import React from 'react';
import { useTranslation } from 'react-i18next';

function RefundReplacementPolicy() {
    const { t } = useTranslation();
    return (
        <div>

            <div className='container py-5'>
                <h1>Refund and Replacement Policy</h1>

                
                <h2>1. Refund Policy</h2>

                <ul>
                        <li>Refunds are applicable only if the service is canceled within 24 hours of booking</li>
                        <li>No refunds will be issued for completed services, digital downloads, or customized yantras.
                        </li>
                        <li> In case of service non-fulfillment due to unforeseen circumstances, a refund or rescheduling option will be provided.</li>

                </ul>


                <h2>2. Replacement Policy</h2>
               
                <ul>
                    <li>Defective or damaged product will be replaced if reported within 7 days of delivery.</li>
                    <li>Customers must provide proof (images or videos) of the defect for replacement approval.
                    </li>
                    <li>Replacements will be processed within 10 business days of approval.</li>

                </ul>

              

                <p>For any concerns, reach out to our support team at +91 7664960766</p>

                <ul><li>Email: enquiry@astrohawan.com</li></ul>

                <p>By using our services, you acknowledge that you have read, understood, and agree to these policies.
                </p>



            </div>

        </div>

    )
}

export default RefundReplacementPolicy
