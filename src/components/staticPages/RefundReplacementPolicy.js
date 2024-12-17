import React from 'react';
import { useTranslation } from 'react-i18next';

function RefundReplacementPolicy() {
    const { t } = useTranslation();
    return (
        <div>

            <div className='container py-5'>
                <h1>Refund and Replacement Policy</h1>

                <p>if you buy any product from the website for your use, if you find it in a broken state, then you will have to make a video of it (while opening) and send it to our email: support@satim.com, after which our assistant will check it. Will replace within 7 days</p>
                <p>At Satim, we strive to ensure customer satisfaction with our products and services. Please read our refund and replacement policy carefully before making a purchase.</p>

                <h2>Refund Policy</h2>

                <p><strong>1.	Services (Seva & Ritual Products):</strong></p>

                <ul>
                        <li>Refunds are not permitted for services or products purchased under the 'Special Temples for Seva' or 'Services Offered' sections</li>
                        <li>Once an order is confirmed, it cannot be cancelled or refunded.</li>
                        <li> After receiving your order, your product will be distributed (delivered) within 8-14days. A video of the process will be uploaded to our YouTube channel, and the link will be shared with you.</li>

                </ul>


                <p><strong>2.	Physical Products:</strong></p>

                <ul>
                    <li>Refunds are allowed only in the case of:
                        <ul>
                            <li>Incorrect product delivered</li>
                            <li>Damaged product upon delivery (must be reported within 48 hours).</li>
                        </ul>
                    </li>
                    <li>To initiate a refund request, customers must contact us at info@thesatims.com with evidence (photos/videos) of the issue.</li>
                    <li>Product will delivered within 8-14 days after confirm your order and payment received</li>

                </ul>

                <h2>Replacement Policy</h2>

                <p><strong>1. Eligibility for Replacement:</strong></p>

                <ul>

                  <li>	Replacements are only available for physical products that are:
                    <ul>
                        <li>Damaged during shipping.</li>
                        <li>Defective upon receipt.</li>
                    </ul>

                    <li>Replacement requests must be initiated within 7 days of receiving the product.</li>

                  </li>
            </ul>

               
            <p><strong>2.	Process for Replacement:</strong></p>

                <ul>
                    <li> Submit a replacement request via info@thesatims.com, including:
                        <ul>
                            <li>Order ID.</li>
                            <li>Photos or videos of the product showing the issue.</li>

                        </ul>
                    </li>
                    <li>Once the request is verified, we will process the replacement and ship the new product within 10 working days.</li>
                </ul>

                <h2>Exceptions</h2>

                <ul>
                    <li>Products and services once distributed, delivered, or completed cannot be refunded or replaced unless explicitly mentioned above.</li>
                    <li>Custom or personalized products are non-refundable and non-replaceable.</li>

                </ul>

                <h2>Important Notes</h2>
                <ul>
                    <li>
                        <strong>Seva Services Video Updates:</strong>
                    <ul><li>Once the product or service is completed, a video will be uploaded to our YouTube channel, and a link will be shared with you for transparency.</li></ul>
                    </li>


                    <li>
                        <strong>Custom and Personalized Orders:</strong>
                    <ul><li>Orders that are custom-made or specific to a ritual are non-refundable and non-replaceable.</li></ul>
                    </li>

                    <li>
                        <strong>Shipping Costs:</strong>
                    <ul><li>Refunds or replacements for eligible cases will include the cost of shipping. However, customers will bear the shipping cost for returns not caused by errors on our part.</li></ul>
                    </li>


                </ul>

                <p style={{width:"100%",border:"1px solid"}}></p>
                <h2>Exceptions and Special Cases</h2>

                <ul>
                    <ol>1.  Orders impacted by delays or errors from third-party partners will be evaluated on a case-by-case basis.</ol>

                    <ol>2.  For disputes or clarifications, please contact our support team promptly.</ol>
                </ul>

                <h2>Contact Us</h2>

                <p>For any questions or concerns regarding our Refund and Replacement Policy, feel free to reach out at:</p>

                <ul><li>Email: info@thesatims.com</li></ul>

                <p>If you use our store or product delivery service, you are not allowed a refund or replacement.</p>
<p>Refunds, if any, will be processed after deducting transaction fees charged by the Bank and/or Payment Gateway and/or any other charges incurred by the Platform during processing and/or providing the Service, as applicable</p>



            </div>

        </div>

    )
}

export default RefundReplacementPolicy
