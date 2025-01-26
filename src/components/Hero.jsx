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
    <div className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center">
      {/* Background Image and Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/imageBg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)', // Darkens the image
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col mt-9 justify-center w-[991px] h-[280px] z-10">
        <p className="text-lg  m-auto text-white h-[36px] w-[488px] mb-8">
          Satisfy Your Cravings in Minutes With
        </p>
        <h1 className="text-5xl m-auto text-white h-[72px] w-[991px] font-bold mb-5">
          Delicious Food from Restaurants Nearby
        </h1>
        <p className="text-lg m-auto text-white h-[54px] w-[691px] mb-8">
          Enjoy a seamless food delivery experience with our user-friendly
          platform, connecting you to the best local restaurants and fast
          delivery services.
        </p>
        <div className="flex flex-row m-auto items-center gap-0">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="px-4 py-2 rounded-l outline-none w-72"
          />
          <button
            onClick={handleGetLocation}
            className="bg-customYellow text-white px-6 py-2 rounded-r hover:bg-customYellow"
          >
            Get My Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
