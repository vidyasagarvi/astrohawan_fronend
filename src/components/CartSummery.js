import { useEffect, useState } from "react";
import axios from "axios";
import CartSummary from "./cart/Summery";
import Config from '../config/Config';
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch user details
  const fetchUserDetails = async (userData) => {
    try {
      const response = await axios.get(`${Config.apiUrl}api/users/details`, {
        headers: {
          Authorization: userData.token,
        },
      });
      setUser(response.data); // Set the fetched user details
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  // Load user details & cart from local storage when component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      fetchUserDetails(userData);
    }

    // Get cart items from local storage
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  return (
    <div>
      <div className="container-fluid page-header py-3">
        <h1 className="text-center text-white display-6">{t("hawans_menu")}</h1>
      </div>

      <div className="container py-4">
        {/* Show Cart Summary only if user details are available */}
        {user && <CartSummary user={user} cartItems={cartItems} />}
      </div>
    </div>
  );
};

export default CartPage;
