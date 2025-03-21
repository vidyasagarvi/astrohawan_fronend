import React from 'react';
import { useTranslation } from 'react-i18next';

function PrivacyPpolicy() {
    const { t } = useTranslation();
    return (
        <div>

            <div className='container py-5'>
                <h1>Privacy Policy</h1>

                <p>At AstroHawan, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your data:</p>
                <ol>
                    <li><strong>Data Collection:</strong> We collect personal details (name, contact,adress, payment information) only for service fulfillment.
                    </li>
                    <li><strong>Use of Data:</strong> Your data is used solely for providing services, improving user experience, and legal compliance.
                    </li>
                    <li><strong>Data Sharing:</strong> We do not sell or share your personal information with third parties, except as required by law.
                    </li>
                    <li><strong>Security:</strong> We implement strict security measures to protect your data from unauthorized access.
                    </li>
                    <li><strong>User Rights:</strong> You can request access, modification, or deletion of your data by contacting our support team.
                    </li>

                </ol>



            </div>

        </div>

    )
}

export default PrivacyPpolicy
