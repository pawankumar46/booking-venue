import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  const cities = useMemo(
    () => [
      'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
      'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
      'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad',
      'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
      'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli–Dharwad', 'Bareilly', 'Mysore',
    ],
    []
  )
  const venueTypes = useMemo(
    () => [
      'Banquet Hall', 'Lawn', 'Resort', 'Hotel', 'Community Hall', 'Conference Hall', 'Farmhouse', 'Restaurant',
    ],
    []
  )
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (selectedCity) {
      const url = `/venues/${encodeURIComponent(selectedCity)}${selectedType ? `?type=${encodeURIComponent(selectedType)}` : ''}`
      navigate(url)
    }
  }
  return (
    <div className="relative">
      {/* Full-page background */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1920&auto=format&fit=crop')",
          }}
          aria-label="Famous venue background"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <section className="relative min-h-[55vh] w-full py-20">
        <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Where Every Occasion Becomes Special
          </h1>
          <p className="mt-4 text-xl md:text-2xl opacity-90">
            Discover 10,000+ banquet halls, wedding venues, and party lawns across India.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-white/90 hover:bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-3 -mt-12 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] items-end gap-4">
            <div>
              <label htmlFor="landing-city" className="block text-sm font-medium text-gray-700">Wedding City</label>
              <select
                id="landing-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="landing-type" className="block text-sm font-medium text-gray-700">Venue Type</label>
              <select
                id="landing-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select type</option>
                {venueTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="h-[44px] md:h-[42px] w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700"
            >
              Find venues →
            </button>
          </form>
        </div>
      </div>

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">Curated Venues</h3>
          <p className="mt-2 text-gray-600">
            Handpicked spaces from iconic locations like the Sydney Opera House and The Plaza.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">Seamless Booking</h3>
          <p className="mt-2 text-gray-600">
            Check availability, compare packages, and book in minutes.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">Trusted Reviews</h3>
          <p className="mt-2 text-gray-600">
            Verified ratings and reviews to help you choose with confidence.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Landing