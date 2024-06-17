import React, { useContext } from "react";
import "./Cart.css";
import { Storecontext } from "../../Context/Storecontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
const Cart = () => {
  const {
    food_list,
    cartItems,
    url,
    addToCart,
    removefromcart,
    getTotalCartAmount,
  } = useContext(Storecontext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      {getTotalCartAmount() === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-imgs">
            <img src={assets.emptycart} alt="" />
          </div>
          <div className="cart-empty-text">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added anything to your cart yet. </p>
            <button className="button">
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Continue Shopping{" "}
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <>
                  <div key={index} className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p
                      onClick={() => removefromcart(item._id)}
                      id="cross-button"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </>
              );
            }
          })}
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <div className="cart-total-details">
                  <p>Total</p>$
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </div>
                <button onClick={() => navigate("/order")}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>if you have a promo code, Enter it here</p>
                  <div className="cart-promocode-input">
                    <input type="text" placeholder="promo code" />
                    <button>submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
