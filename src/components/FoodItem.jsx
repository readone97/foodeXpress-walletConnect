import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { food_list } from "../mockDatabase";


const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <img src={food_list.image} alt={name} className="w-full h-40 object-cover rounded-lg" />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-red-600 font-bold">${price}</p>
        {!cartItems[id] ? (
          <button
            onClick={() => addToCart(id)}
            className="mt-2 bg-customYellow text-white px-4 py-2 rounded-lg"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center mt-2 space-x-2">
            <button
              onClick={() => removeFromCart(id)}
              className="bg-red-600 text-white px-2 py-1 rounded-lg"
            >
                -
            </button>
            <span>{cartItems[id]}</span>
            <button
              onClick={() => addToCart(id)}
              className="bg-green-600 text-white px-2 py-1 rounded-lg"
            >
              ➕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;




