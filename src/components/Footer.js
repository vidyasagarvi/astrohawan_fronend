import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer({ className }) {
    const { t } = useTranslation();
    return (
        <div>
            <div className={`site-footer bg-dark text-white-50 footer pt-5 mt-5 ${className}`}>
                <div className="container py-1">

                    <div className="row g-3">
                        <div className="col-lg-4">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">{t('site_name')}</h4>
                                <p className="mb-4">{t('footer_text')}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-5">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Links</h4>
                                <Link to="/" className="btn-link">{t('home_menu')} </Link>
                                <Link to="/services" className="btn-link">{t('services_offered')} </Link>
                                <Link to="/about-us" className="btn-link">{t('about_menu')} </Link>
                                <Link to="/contact-us" className="btn-link">{t('contact_menu')} </Link>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-5">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Corporate Info</h4>

                                <Link to="/terms-conditions" className="btn-link">{t('terms_condition_menu')} </Link>
                                <Link to="/privacy-policy" className="btn-link">{t('privacy_policy_menu')} </Link>
                                <Link to="/disclaimers" className="btn-link">{t('disclaimers_menu')} </Link>
                                <Link to="/refund-replacement-policy" className="btn-link">{t('refund_replacement_policy')} </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Shop Location</h4>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M8 0a6 6 0 0 0-6 6c0 3.866 3.582 6.779 5.246 7.992a.97.97 0 0 0 1.508 0C10.418 12.779 14 9.866 14 6a6 6 0 0 0-6-6zm0 1a5 5 0 0 1 5 5c0 3.448-3.067 6.01-4.753 7.202a.072.072 0 0 1-.094 0C6.067 12.01 3 9.448 3 6a5 5 0 0 1 5-5z" />
                                    <path d="M8 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg> Gali no 14 house no 361 DDA Flats Madangir new delhi 110062</p>
                            <p>&#x2709; info@astrohawan.com</p>
                            <p>&#x260E; +91 79463333868</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Footer
