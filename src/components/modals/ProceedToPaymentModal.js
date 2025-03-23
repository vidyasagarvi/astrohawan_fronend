import React,{useState,useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import useSettings from '../../hooks/useSettings';
import OrderSuccessModal from '../modals/OrderSuccessModal.js';

const ProceedToPaymentModal = ({ show, handleClose, userDetails, cartItems }) => {
  const { t } = useTranslation();
  const language = 'en'; 
  const [showOrderSuccessModal, setOrderSuccessModal] = useState(false);

    const subTotalPrice = cartItems.reduce((acc, item) => {

      if(item.type=='store'){
          if(item.discount>0){
            const discount = item.price - (item.price * item.discount) / 100;
            return acc + (discount * item.quantity);
          }
        }
          return acc + (item.price * item.quantity);
        
       
    }, 0); 

    const { settings, error } = useSettings(language);

    if(settings!=""){
    const gstShipping = settings[0].settings
    .filter((setting) => setting.v_variable === "GST" || setting.v_variable === "Shipping")
    .reduce((acc, curr) => {
      acc[curr.v_variable] = curr.v_value;
      return acc;
    }, {});

    var GST = gstShipping.GST;
    var SHIPPING = gstShipping.Shipping;

    }

    SHIPPING = +SHIPPING;
    GST = +GST;

  const TotalGST = (subTotalPrice*GST)/100;
  const TotalPriceGST = subTotalPrice+TotalGST;
  const TotalPrice = SHIPPING+TotalPriceGST

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);



  const handlePayment = async () => {
    try {

      const response = await fetch(`${Config.apiUrl}payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: TotalPrice, // Amount in INR, change as needed
          //amount: 1,
          currency: 'INR',
        }),
      });
  
      const data = await response.json();

      if (!data.admin.id) {
        console.error('Payment failed:', data.message);
        return;
      }else{
          createOrder(data.admin,userDetails,cartItems,GST,SHIPPING,TotalPrice) 
      }
  
      const options = {
        key: 'rzp_live_NeyDxswRdM95cX', // Replace with your Razorpay Key ID
        amount: data.admin.amount,
        currency: data.admin.currency,
        name: 'Satim',
        description: 'satim payout products',
        image: 'http://www.thesatim.com/static/media/site_logo.132f8b7af655f73b8021.png', // Optional
        order_id: data.admin.id,// Order ID returned from the backend
       
        handler: async function (response) {

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          // Verify Payment on Backend
          const verification = await fetch(`${Config.apiUrl}payment/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            }),
          });
  
          const verificationResult = await verification.json();
          if (verificationResult.status) {
            updatePaymentStatus(verificationResult,razorpay_order_id,razorpay_payment_id,razorpay_signature);
            OrderSuccessModel();
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.mobile,
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error in payment:', error);
    }
  };

  async function createOrder(paymentData, userDetails, cartItems, GST, SHIPPING, TotalPrice) {
    
    try {
      const response = await fetch(`${Config.apiUrl}payment/create-order`, { // Fix: Added backticks here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_data: paymentData,
          user_data: userDetails,
          cart_data: cartItems,
          GST: GST,
          SHIPPING: SHIPPING,
          //TotalPrice: 1,
          TotalPrice: TotalPrice,
        }),
      });
  
      const data = await response.json();
      return data; // Return the data if needed
    } catch (error) {
      console.error('Error in payment:', error);
      throw error; // Rethrow the error if needed for debugging
    }
  }
  

  async function updatePaymentStatus(verificationResult,razorpay_order_id,razorpay_payment_id,razorpay_signature){
    try {

      console.log('verificationResult',verificationResult)
      const response = await fetch(`${Config.apiUrl}payment/send-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verificationResult: verificationResult, 
          razorpay_order_id :razorpay_order_id,
          razorpay_payment_id:razorpay_payment_id,
          razorpay_signature:razorpay_signature
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error in payment:', error);
    }

  }


  const OrderSuccessModel = async () => {

    const serviceText = cartItems.map(item => item.type)[0];

    if(serviceText=='service'){
      localStorage.removeItem("service_cart");
    }
    if(serviceText=='mandir'){
      localStorage.removeItem("mandir_cart");
    }

    if(serviceText=='store'){
      localStorage.removeItem("cartItems");
    }

    if(serviceText=='mahakumbh'){
      localStorage.removeItem("mahakumbh_cart");
    }
      setOrderSuccessModal(true);
      handleClose();
  }





  return (
    <div className='common-drawer-payment'>
      <div className="drawer-content-payment">
        <Modal show={show} onHide={handleClose} size="lg">


        <div className='card-header' style={{zIndex:"1"}}>
            <div className='card-item'>{t('cart_summary')}</div>
            <div className='close-btn'>
              <button className="close-btn-btn" onClick={handleClose}>
              X
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((items, index) => {
                  if(items.type=='store'){
                    if(items.discount>0){
                      var price = (items.price - (items.price * items.discount) / 100).toFixed(2);
                    }else{
                      var price = items.price;
                    }
                             
                  }else{
                    var price = items.price;
                  }
                  let imageSrc = '';
                  try {
                    imageSrc = JSON.parse(items.images)[0];
                  } catch (e) {
                    imageSrc = items.images;
                  }

                  return (
                    <tr key={index}>
                      <th scope="row">
                        <div className="d-flex align-items-center" style={{width:'83px', height:'81px',border:'1px solid',borderRadius:'9px'}}> 
                          {imageSrc && (
                            <img
                              src={`${Config.apiUrl}${imageSrc}`}
                              alt={items.title}
                              className="cart-item-image"
                              style={{ width: '79px', height: '75px', borderRadius:'9px', padding:'1px 0px 0px 2px' }}
                            />
                          )}
                        </div>
                      </th>
                      <td><p className="mt-0" style={{width:"250px"}}>{items.title}</p></td>
                      <td>
                        <p className="mb-0 mt-4" style={{width:"70px"}}>{t('price')}: {price}</p>
                      </td>
                      <td><p className="mb-0 mt-4">{items.quantity}</p></td>
                      <td><p className="mb-0 mt-4" style={{width:"90px"}}>{t('price')}: {price * items.quantity}.00</p></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row g-4 justify-content-end">
            <div className="col-12 col-lg-6">
            <Modal.Body>
              <h2 className="display-7 mb-4">{t('shipping_address_title')}</h2>
              <div className="row g-5">
                <div className="col-md-12">
                  <div className="form-item mb-3">
                    <label className="form-label">{t('name_title')}</label>
                    <Form.Group controlId="formName">
                      <Form.Control type="text" value={userDetails?.name || ''} readOnly />
                    </Form.Group>
                  </div>
                  <div className="form-item mb-3">
                    <label className="form-label">{t('email_title')}</label>
                    <Form.Group controlId="formEmail">
                      <Form.Control type="email" value={userDetails?.email || ''} readOnly />
                    </Form.Group>
                  </div>
                  <div className="form-item mb-3">
                    <label className="form-label">{t('mobile_no_title')}</label>
                    <Form.Group controlId="formMobile">
                      <Form.Control type="text" value={userDetails?.mobile || ''} readOnly />
                    </Form.Group>
                  </div>
                  <div className="form-item mb-3">
                    <label className="form-label">{t('shipping_address_title')}</label>
                    <Form.Group controlId="formAddress">
                      <Form.Control as="textarea" rows={3} value={userDetails?.shipping_address || ''} readOnly />
                    </Form.Group>
                  </div>
                  <div className="form-item mb-3">
                    <label className="form-label">{t('pincode_lable')}</label>
                    <Form.Group controlId="formPincode">
                      <Form.Control type="text" value={userDetails?.pincode || ''} readOnly />
                    </Form.Group>
                  </div>
                </div>
              </div>
              </Modal.Body>
            </div>

            <div className="col-12 col-lg-6">
              <div className="rounded p-4">
                <h2 className="display-7 mb-4">{t('payment_summary')}</h2>
                <div className="d-flex justify-content-between mb-4">
                  <p className="mb-0">Subtotal:</p>
                  <p className="mb-0" style={{width:"72px"}}>{t('price')} {subTotalPrice.toFixed(2)}</p>
                </div>
          
                <div className="d-flex justify-content-between mb-4">
                  <p className="mb-0">GST:</p>
                  <p className="mb-0" style={{width:"72px"}}>{t('price')} {GST.toFixed(2)}%</p>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <p className="mb-0">Shipping:</p>
                  <p className="mb-0" style={{width:"72px"}}>{t('price')} {SHIPPING.toFixed(2)}</p>
                </div>

                <div className="d-flex justify-content-between py-3 border-top border-bottom">
                  <p className="mb-0">Total:</p>
                  <p className="mb-0" style={{width:"72px"}}>{t('price')} {TotalPrice.toFixed(2)}</p>
                </div>
                <button onClick={handlePayment} className="payment_button btn border border-secondary rounded-pill px-5 text-primary" type="button">
                {t('proceed_to_payment')}
                </button>
              </div>
            </div>
          </div>

          <div className="total-price">
             <span onClick={handlePayment} style={{cursor:"pointer"}}>
                {t('proceed_to_payment')}
                </span>
          </div>
   
        </Modal>
      </div>

    <OrderSuccessModal
          show={showOrderSuccessModal}
          handleClose={() => setOrderSuccessModal(false)}
      />

    </div>
  );
};

export default ProceedToPaymentModal;
