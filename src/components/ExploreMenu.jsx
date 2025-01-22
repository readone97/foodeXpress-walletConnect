import React from 'react';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5" id="explore-menu">
      <h1 className="text-gray-800 font-medium text-2xl">Explore our menu</h1>
      <p className="max-w-3xl text-gray-600 text-base">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and
        elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="flex justify-between items-center gap-8 text-center mt-5 overflow-x-scroll scrollbar-hide">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
            className="flex flex-col items-center"
          >
            <img
              className={`w-20 min-w-[80px] cursor-pointer rounded-full transition duration-200 ${
                category === item.menu_name ? 'border-4 border-tomato p-0.5' : ''
              }`}
              src={item.menu_image}
              alt=""
            />
            <p className="mt-2 text-gray-500 text-base cursor-pointer">{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className="my-2 h-0.5 bg-gray-200 border-none" />
    </div>
  );
};

export default ExploreMenu;
