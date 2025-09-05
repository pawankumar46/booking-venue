import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false); // Add this state for venue dropdown
  const navigations = [
    { name: 'Home', to: '/' },
    { name: 'Contact', to: '/contact' },
    {name : "Login", to:"/login"}

  ];
  const cities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad',
    'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
    'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli–Dharwad', 'Bareilly', 'Mysore',
  ];

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
              {navigations.map((item) => (
                item.name === 'Locations' ? (
                  <div key={item.name} className="relative group">
                    <button className="px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600 inline-flex items-center gap-1">
                      Locations
                      <span className="text-gray-500">▾</span>
                    </button>
                    <div className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 hidden group-hover:block">
                      <div className="py-1 max-h-72 overflow-auto scroll-smooth divide-y divide-gray-200">
                        {cities.map((city) => (
                          <Link
                            key={city}
                            to={`/venues/${encodeURIComponent(city)}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {city}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                )
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
              {navigations.map((item) => (
                item.name === 'Locations' ? (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => setIsVenueOpen(!isVenueOpen)}
                      className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                    >
                      Locations
                      <span className="text-gray-500">
                        {isVenueOpen ? '▾' : '▸'}
                      </span>
                    </button>
                    {isVenueOpen && (
                      <div className="pl-4 space-y-1 max-h-48 overflow-auto">
                        {cities.map((city) => (
                          <Link
                            key={city}
                            to={`/venues/${encodeURIComponent(city)}`}
                            className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => {
                              setIsOpen(false);
                              setIsVenueOpen(false);
                            }}
                          >
                            {city}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default NavBar