import React, { useState } from 'react';
import { food_list } from '../mockDatabase';
import FoodItem from './FoodItem';

const Menu = () => {
  const [category, setCategory] = useState('All');

  // Filtered food list based on category
  const filteredList =
    category === 'All'
      ? food_list
      : food_list.filter((item) => item.category === category);

  return (
    <div className="menu px-6 py-10" id="menu">
      <h1 className="text-3xl font-bold text-center mb-6">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
