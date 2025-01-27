import React, { useState } from 'react';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;

          try {
            const response = await fetch(geocodeApiUrl);
            const data = await response.json();
            if (data.results.length) {
              const userAddress = data.results[0].formatted_address;
              setAddress(userAddress);
              alert(`Location detected: ${userAddress}`);
              // `userAddress` to the admin.
            } else {
              alert('Unable to fetch address.');
            }
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          alert(
            'Geolocation access denied. Please enter your location manually.'
          );
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = () => {
    if (location || address) {
      const userLocation = location || address;
      alert(`Sending location to admin: ${userLocation}`);
      //  an API call to send `userLocation` to the admin. will get back to that
    } else {
      alert('Please enter your location or allow geolocation.');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center px-4 md:px-6">
      {/* Background Image and Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{
          backgroundImage: "url('/imageBg.jpg')",
          filter: 'brightness(0.4)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col mt-16 md:mt-9 justify-center w-full max-w-[991px] z-10">
        <p className="text-base md:text-lg text-white mb-4 md:mb-8 mx-auto max-w-[488px]">
          Satisfy Your Cravings in Minutes With
        </p>
        <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 md:mb-5 mx-auto max-w-[991px] px-4">
          Delicious Food from Restaurants Nearby
        </h1>
        <p className="text-base md:text-lg text-white mb-6 md:mb-8 mx-auto max-w-[691px] px-4">
          Enjoy a seamless food delivery experience with our user-friendly
          platform, connecting you to the best local restaurants and fast
          delivery services.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2 sm:gap-0 w-full max-w-md mx-auto px-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="w-full sm:w-72 px-4 h-10 md:h-12 rounded sm:rounded-r-none outline-none"
          />
          <button
            onClick={handleGetLocation}
            className="w-full sm:w-auto bg-customYellow text-white px-6 h-10 md:h-12 rounded sm:rounded-l-none hover:bg-customYellow/90 transition-colors duration-300 whitespace-nowrap"
          >
            Get My Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
