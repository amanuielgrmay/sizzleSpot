import React, { useContext } from "react";
import "./FoodDisplay.css";
import { Storecontext } from "../../Context/Storecontext";
import Fooditem from "../fooditem/Fooditem.jsx";

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(Storecontext);

  if (loading) {
    return (
      <div className="food-display-loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
        <div className="server-status-text">
          Server will be active within 30 seconds
        </div>
      </div>
    );
  } else {
    return (
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <Fooditem
                  key={index}
                  id={item._id}
                  price={item.price}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
};

export default FoodDisplay;
