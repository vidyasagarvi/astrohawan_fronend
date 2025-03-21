import React from 'react';
import { useTranslation } from 'react-i18next';

function TermsCondition() {
    const { t } = useTranslation();
    return (
        <div>

            <div className='container py-5'>
                <h1>Terms & Conditions :</h1>

                <p> Welcome to AstroHawan! By accessing our website or services, you agree to the following terms and conditions:</p>

                <ol>
                    <li><strong>Service Scope:</strong> AstroHawan provides astrology consultations, hawans, yantras, and related services. The results may vary for each individual.
                 </li>
                <li><strong>Eligibility:</strong> You must be at least 18 years old or have parental consent to use our services.
                </li>

                <li><strong>Payment:</strong> All bookings require advance payment. Any additional charges will be communicated before service completion.
                </li>
                <li><strong>Cancellations:</strong>Cancellations are allowed within 24 hours of booking. After this period, no refund will be issued.
                </li>

                <li><strong>User Conduct</strong>: Misuse of the platform, including fraudulent claims or abusive behavior, will result in service denial.
                </li>

                <li><strong>Modifications:</strong> We reserve the right to modify these terms at any time. Users will be notified of significant changes.
                </li>
                </ol>

            </div>

        </div>

    )
}

export default TermsCondition
