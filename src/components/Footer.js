import React from 'react'

function Footer() {
  return (
    <div>
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
    <div className="container py-5">
    
        <div className="row g-5">
            <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                    <h4 className="text-light mb-3">Why People Like us!</h4>
                    <p className="mb-4">typesetting, remaining essentially unchanged. It was 
                        popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                    <a href="" className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="d-flex flex-column text-start footer-item">
                    <h4 className="text-light mb-3">Shop Info</h4>
                    <a className="btn-link" href="">About Us</a>
                    <a className="btn-link" href="">Contact Us</a>
                    <a className="btn-link" href="">Privacy Policy</a>
                    <a className="btn-link" href="">Terms & Condition</a>
                    <a className="btn-link" href="">Return Policy</a>
                    <a className="btn-link" href="">FAQs & Help</a>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="d-flex flex-column text-start footer-item">
                    <h4 className="text-light mb-3">Account</h4>
                    <a className="btn-link" href="">My Account</a>
                    <a className="btn-link" href="">Shop details</a>
                    <a className="btn-link" href="">Shopping Cart</a>
                    <a className="btn-link" href="">Order History</a>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                    <h4 className="text-light mb-3">Contact</h4>
                    <p>Address: 1429 Netus Rd, NY 48247</p>
                    <p>Email: Example@gmail.com</p>
                    <p>Phone: +0123 4567 8910</p>
                    <p>Payment Accepted</p>
                    <img src="img/payment.png" className="img-fluid" alt="" />
                </div>
            </div>
        </div>
    </div>
</div>

</div>

  )
}

export default Footer
