import React, { useContext } from "react";
import "./FoodDisplay.css";
import { Storecontext } from "../../Context/Storecontext";
import Fooditem from "../fooditem/fooditem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(Storecontext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category)
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
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
