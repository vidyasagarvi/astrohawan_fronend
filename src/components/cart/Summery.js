import { useEffect, useState } from "react";
import "./CartSummary.css"; // Import the CSS file
import Config from '../../config/Config';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import useSettings from '../../hooks/useSettings';
import "react-datepicker/dist/react-datepicker.css";
import delete_cart from '../../assets/delete-cart.png';


const CartSummary = ({ user, cartItems }) => {
  const [birthDate, setBirthDate] = useState(null);
  const [birthTime, setBirthTime] = useState(null);
  const language = 'en';
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: user?.name || "",
    gotra: user?.gotra || "",
    birthDate: null,
    birthTime: null,
    birthPlace: user?.birth_place || "",
    gender: "",
    mobile: `${user?.calling_code || ""} ${user?.mobile_no || ""}`,
    email: user?.email || "",
    address: user?.shipping_address || "",
    pincode: user?.pincode || "",
  });

  useEffect(() => {
    if (user?.birth_date && user.birth_date !== "0000-00-00") {
      setBirthDate(new Date(user.birth_date));
    } else {
      setBirthDate(null); // Set to null if the date is invalid
    }

    if (user?.birth_time && user.birth_time !== "00:00:00") {
      try {
        const [hours, minutes, seconds] = user.birth_time.split(":").map(Number);
        const now = new Date();
        now.setHours(hours, minutes, seconds, 0);
        setBirthTime(now);
      } catch (error) {
        console.error("Error parsing birth_time:", error);
        setBirthTime(null);
      }
    } else {
      setBirthTime(null); // Set to null if the time is invalid
    }
  }, [user]); // Runs when `user` updates


  const { settings, error } = useSettings(language);

  if (cartItems.length === 0) return null; // Hide if cart is empty

  // Step 1: Find the highest INR & USD from services
  const maxPrices = cartItems
    .filter(item => item.type === "service" && item.groupedPrices)
    .reduce((acc, item) => {
      return {
        INR: Math.max(acc.INR, item.groupedPrices.INR),
        USD: Math.max(acc.USD, item.groupedPrices.USD)
      };
    }, { INR: 0, USD: 0 });

  // Step 2: Sum all price_national and price_international for other types
  const sumPrices = cartItems
    .filter(item => item.type !== "service")
    .reduce((acc, item) => {
      const national = parseFloat(item.price_national || 0);
      const international = parseFloat(item.price_international || 0);
      return {
        INR: acc.INR + national,
        USD: acc.USD + international
      };
    }, { INR: 0, USD: 0 });

  // Step 3: Final Sum (Highest service price + Total other prices)
  const finalResult = {
    INR: maxPrices.INR + sumPrices.INR,
    USD: maxPrices.USD + sumPrices.USD
  };


  if (settings != "") {
    const gstShipping = settings[0].settings
      .filter((setting) => setting.v_variable === "GST")
      .reduce((acc, curr) => {
        acc[curr.v_variable] = curr.v_value;
        return acc;
      }, {});

    var GST = gstShipping.GST;
  }

  GST = +GST;
  const SHIPPING = 10;
  if (userData.calling_code === '91') {
    var TotalGST = (finalResult.INR * GST) / 100;
    var subTotal = finalResult.INR;
    var TotalPriceGST = finalResult.INR + TotalGST;
    var TotalPrice = SHIPPING + TotalPriceGST
  } else {
    var TotalGST = (finalResult.USD * GST) / 100;
    var subTotal = finalResult.USD;
    var TotalPriceGST = finalResult.USD + TotalGST;
    var TotalPrice = SHIPPING + TotalPriceGST
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => setFormData({ ...formData, birthDate: date });
  const handleTimeChange = (time) => setFormData({ ...formData, birthTime: time });

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.gotra) newErrors.gotra = "Gotra is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth Date is required";
    if (!formData.birthTime) newErrors.birthTime = "Birth Time is required";
    if (!formData.birthPlace) newErrors.birthPlace = "Birth Place is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.mobile) newErrors.mobile = "Mobile Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.pincode) newErrors.pincode = "Pin Code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {

      updateUserinfo(formData)
      console.log("Proceed to payment with:", formData);
      // Proceed with payment logic here
    }
  };

  const updateUserinfo = (formData) => {
    console.log("Proceed to upate data:", formData);
  };


  return (
    <div className="cart-summary-container">
      <div className="cart-content">

        {/* Left Section - User Details */}


        <div className="user-details card">
          <h2 className="section-title">Enter Your Details</h2>

          {/* Name & Gotra */}
          <div className="input-row">
            <div className="input-group">
              <input type="text" name="name" value={formData.name} placeholder="Name" className="input-field" readOnly />
            </div>
            <div className="input-group">
              <input type="text" name="gotra" value={formData.gotra} placeholder="Gotra" className="input-field" onChange={handleChange} />
              {errors.gotra && <p className="error">{errors.gotra}</p>}
            </div>
          </div>


          {/* Date of Birth & Time of Birth */}

          <div className="input-row">
            {/* Date of Birth Field with Error Below */}
            <div className="input-group">
              <DatePicker
                selected={formData.birthDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date of Birth"
                className="input-field"
              />
              {errors.birthDate && <p className="error">{errors.birthDate}</p>}
            </div>

            {/* Time of Birth Field with Error Below */}
            <div className="input-group">
              <DatePicker
                selected={formData.birthTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="h:mm aa"
                dateFormat="h:mm aa"
                placeholderText="Select Time of Birth"
                className="input-field"
              />
              {errors.birthTime && <p className="error">{errors.birthTime}</p>}
            </div>
          </div>

          {/* Place of Birth & Gender */}
          <div className="input-row">

            <div className="input-group">
              <input type="text" name="birthPlace" value={formData.birthPlace} placeholder="Place of Birth" className="input-field" onChange={handleChange} />
              {errors.birthPlace && <p className="error">{errors.birthPlace}</p>}
            </div>

            <div className="input-group">
              <div className="gender-container">
                <label>
                  <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
                </label>
              </div>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>

          </div>

          {/* Mobile, Email, Address */}
          <div className="input-row">
            <div className="input-group">
              <input type="text" name="mobile" value={formData.mobile} placeholder="Mobile Number" className="input-field full-width" readOnly />
            </div>

            <div className="input-group">

              <input type="text" name="pincode" value={formData.pincode} placeholder="Pin Code" className="input-field full-width" onChange={handleChange} />
              {errors.pincode && <p className="error">{errors.pincode}</p>}

            </div>
          </div>


          <input type="email" name="email" value={formData.email} placeholder="Email Address" className="input-field full-width" readOnly />

          <textarea name="address" value={formData.address} placeholder="Enter your address" className="input-field full-width textarea-field" onChange={handleChange}></textarea>
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        {/* Right Section - Price Summary */}
        <div className="price-summary card">
          <h2 className="section-title">Payment Details</h2>
          <div className="price-breakdown">

            <p>Subtotal: <span className="float-right"> {userData.calling_code == '91' ? (<span>₹</span>) : (<span>$</span>)}{subTotal}</span></p>
            <p>Discount: <span className="float-right text-red">{userData.calling_code == '91' ? (<span>₹</span>) : (<span>$</span>)}0</span></p>
            <p>GST: <span className="float-right text-red">{userData.calling_code == '91' ? (<span>₹</span>) : (<span>$</span>)}{TotalGST}</span></p>
            <p>Shipping Charge: <span className="float-right">{userData.calling_code == '91' ? (<span>₹</span>) : (<span>$</span>)}{SHIPPING}</span></p>
            <hr />
            <p className="total-price">Total: <span className="float-right">{userData.calling_code == '91' ? (<span>₹</span>) : (<span>$</span>)}{TotalPrice}</span></p>
          </div>
          <button onClick={handleSubmit} className="pay-now-btn">Pay Now</button>
        </div>
      </div>

      {/* Order Summary */}

      <div className="cart-items card">
        <h2 className="section-title">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={`${Config.apiUrl}${item.images[0]}`}
                alt={item.translations.name}
                className="item-image"
              />
              <div className="item-details">
                <p className="item-name">{item.translations.name}</p>
                {userData.calling_code == '91' ? (<p className="item-price">₹{item.groupedPrices?.INR || item.price_national}</p>) : (<p className="item-price">${item.groupedPrices?.USD || item.price_international}</p>)}

              </div>
              <button className="delete-btn" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: productId })}>
                <img src={delete_cart} alt="delete from cart" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default CartSummary;
