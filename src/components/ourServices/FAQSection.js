// FAQSection.js

import React from 'react';

function FAQSection({ faqs }) {
    return (
        <div>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item mb-3">
                    <button
                        className="btn btn-link"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index}`}>
                        {faq.question}
                    </button>
                    <div id={`collapse${index}`} className="collapse">
                        <div className="card card-body">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FAQSection;
