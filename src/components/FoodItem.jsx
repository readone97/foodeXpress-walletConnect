import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-customYellow transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 h-12">{description}</p>
        <p className="text-customYellow font-bold text-lg">
          ${price.toFixed(2)}
        </p>

        {!cartItems[id] ? (
          <button
            onClick={() => addToCart(id)}
            className="w-full mt-2 bg-customYellow text-white px-4 py-2 rounded-lg
                     hover:bg-yellow-500 transform hover:scale-105 
                     transition-all duration-300 font-semibold
                     focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center mt-2 space-x-3">
            <button
              onClick={() => removeFromCart(id)}
              className="bg-red-500 hover:bg-red-600 text-white w-10 h-10
                       rounded-lg transform hover:scale-105 transition-all duration-300
                       focus:ring-2 focus:ring-red-300 focus:outline-none"
            >
              -
            </button>
            <span className="font-bold text-lg w-8 text-center">
              {cartItems[id]}
            </span>
            <button
              onClick={() => addToCart(id)}
              className="bg-green-500 hover:bg-green-600 text-white w-10 h-10
                       rounded-lg transform hover:scale-105 transition-all duration-300
                       focus:ring-2 focus:ring-green-300 focus:outline-none"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
