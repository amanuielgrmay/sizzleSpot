import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const Storecontext = createContext();

const StorecontextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://sizzlespot-2.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  // Update local storage when cart data changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removefromcart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = food_list.find((product) => product._id === item);
      if (cartItems[item] > 0 && itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    try {
      const response = await axios.get(url + "/api/food/list");
      setFood_list(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartData = async (token) => {
    const response = axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token")); // Load cart data from local storage
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removefromcart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loading,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
