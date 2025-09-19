import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useCity } from '../contexts/CityContext';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false); // Add this state for venue dropdown
  const [showCityModal, setShowCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const { selectedCity, updateCity } = useCity();
  const navigations = [
    { name: 'Home', to: '/' },
    { name: 'Contact', to: '/contact' },
    { name: 'Login', to: '/login' }
  ];
  const allCities = [
    'Mumbai', 'Delhi', 'Bengaluru','Mangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad',
    'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
    'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli–Dharwad', 'Bareilly', 'Mysore',
  ];

  const popularCities = [
    { name: 'Mumbai', icon: '🏛️' },
    { name: 'Delhi-NCR', icon: '🏛️' },
    { name: 'Bengaluru', icon: '🏛️' },
    { name: 'Hyderabad', icon: '🕌' },
    { name: 'Ahmedabad', icon: '🕌' },
    { name: 'Chandigarh', icon: '✋' },
    { name: 'Chennai', icon: '🛕' },
    { name: 'Pune', icon: '🏰' },
    { name: 'Kolkata', icon: '🏛️' },
    { name: 'Kochi', icon: '🚤' }
  ];

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCitySelect = (city) => {
    updateCity(city);
    setShowCityModal(false);
    setCitySearch('');
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode the coordinates to get city name
          updateCity('Location Detected');
          setShowCityModal(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to detect your location. Please select manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <h1 className="text-2xl md:text-3xl font-extrabold ml-4 tracking-wide">
                    <span className="text-black">BookMy</span>
                    <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent ml-1">
                      Venue
                    </span>
                  </h1>
                </Link>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8 ml-8">
              {/* City Selection Button */}
              <button
                onClick={() => setShowCityModal(true)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 inline-flex items-center gap-2"
              >
                <MapPinIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{selectedCity}</span>
                <span className="text-gray-500">▾</span>
              </button>

              {navigations.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {/* Mobile City Selection Button */}
              <button
                onClick={() => setShowCityModal(true)}
                className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              >
                <MapPinIcon className="h-4 w-4" />
                {selectedCity}
              </button>

              {navigations.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* City Selection Modal */}
      {showCityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCityModal(false)} />
          <div className="relative w-full max-w-2xl mx-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-white">
              <div className="p-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for your city"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="w-full pl-10 pr-4 text-black py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Detect Location Button */}
                <button
                  onClick={handleLocationDetect}
                  className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 font-medium">Detect my location</span>
                </button>

                {/* Popular Cities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Cities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {popularCities.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => handleCitySelect(city.name)}
                        className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <span className="text-2xl mb-1">{city.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{city.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* All Cities List */}
                {citySearch && (
                  <div className="max-h-64 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">All Cities</h3>
                    <div className="space-y-1">
                      {filteredCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <span className="text-gray-700">{city}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* View All Cities Link */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setCitySearch('')}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    View All Cities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar