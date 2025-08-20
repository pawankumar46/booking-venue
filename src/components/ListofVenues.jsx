import React, { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const ListofVenues = () => {
  const params = useParams()
  const city = decodeURIComponent(params.city || '')
  
  // Filter states
  const [selectedLocality, setSelectedLocality] = useState('')
  const [selectedVenueType, setSelectedVenueType] = useState('')
  const [filters, setFilters] = useState({
    veg: false,
    nonVeg: false,
    outsideFood: false,
    outsideLiquor: false,
    rooftop: false
  })
  const [guestCount, setGuestCount] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const venueImages = useMemo(
    () => [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526228076630-7f2c2c2a34f6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1600&auto=format&fit=crop',
    ],
    []
  )

  // Sample data for localities and venue types
  const localities = [
    'Bandra West', 'Andheri West', 'Worli', 'Lower Parel', 'Powai', 'Juhu', 'Vashi', 'BKC'
  ]
  
  const venueTypes = [
    'Banquet Hall', 'Hotel', 'Resort', 'Garden', 'Farmhouse', 'Rooftop', 'Beachfront', 'Heritage'
  ]

  const list = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Premier Venue ${i + 1}`,
      capacity: 300 + i * 50,
      price: 50000 + i * 5000,
      image: venueImages[i % venueImages.length],
      rating: 4 + (i % 2),
      location: city,
      locality: localities[i % localities.length],
      venueType: venueTypes[i % venueTypes.length],
      features: {
        veg: Math.random() > 0.3,
        nonVeg: Math.random() > 0.2,
        outsideFood: Math.random() > 0.4,
        outsideLiquor: Math.random() > 0.5,
        rooftop: Math.random() > 0.6
      }
    }))
  }, [city, venueImages, localities, venueTypes])

  // Filter venues based on selected criteria
  const filteredVenues = useMemo(() => {
    return list.filter(venue => {
      // Locality filter
      if (selectedLocality && venue.locality !== selectedLocality) return false
      
      // Venue type filter
      if (selectedVenueType && venue.venueType !== selectedVenueType) return false
      
      // Guest count filter
      if (guestCount && venue.capacity < parseInt(guestCount)) return false
      
      // Feature filters
      if (filters.veg && !venue.features.veg) return false
      if (filters.nonVeg && !venue.features.nonVeg) return false
      if (filters.outsideFood && !venue.features.outsideFood) return false
      if (filters.outsideLiquor && !venue.features.outsideLiquor) return false
      if (filters.rooftop && !venue.features.rooftop) return false
      
      return true
    })
  }, [list, selectedLocality, selectedVenueType, filters, guestCount])

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
  }

  const handleApplyFilters = () => {
    // Filters are applied automatically through useMemo
    setShowFilters(false)
  }

  const clearFilters = () => {
    setSelectedLocality('')
    setSelectedVenueType('')
    setFilters({
      veg: false,
      nonVeg: false,
      outsideFood: false,
      outsideLiquor: false,
      rooftop: false
    })
    setGuestCount('')
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
          aria-label="City venues background"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero */}
      <section className="relative min-h-[35vh] w-full pt-16 pb-8">
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Venues in {city}</h1>
            <p className="text-white/90 mt-2">Discover handpicked places perfect for weddings, receptions, and events.</p>
          </div>
        </div>
      </section>

      {/* List container */}
      <section className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl ring-1 ring-black/5 p-6 md:p-8">
            
            {/* Filters Section */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Top venues in {city}</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredVenues.length} venues found • Explore options by capacity, price and location.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    {showFilters ? 'Hide' : 'Show'} Filters
                  </button>
                  {(selectedLocality || selectedVenueType || guestCount || Object.values(filters).some(Boolean)) && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {/* Locality Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Locality</label>
                      <select
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                        style={{ color: 'black' }}
                      >
                        <option value="" style={{ color: 'black' }}>All Localities</option>
                        {localities.map(locality => (
                          <option key={locality} value={locality} style={{ color: 'black' }}>{locality}</option>
                        ))}
                      </select>
                    </div>

                    {/* Venue Type Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
                      <select
                        value={selectedVenueType}
                        onChange={(e) => setSelectedVenueType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                        style={{ color: 'black' }}
                      >
                        <option value="" style={{ color: 'black' }}>All Types</option>
                        {venueTypes.map(type => (
                          <option key={type} value={type} style={{ color: 'black' }}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min. Guests</label>
                      <input
                        type="number"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="e.g., 100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                        style={{ color: 'black' }}
                      />
                    </div>

                    {/* Feature Filters */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { key: 'veg', label: 'Veg Food' },
                          { key: 'nonVeg', label: 'Non-Veg Food' },
                          { key: 'outsideFood', label: 'Outside Food Allowed' },
                          { key: 'outsideLiquor', label: 'Outside Liquor Allowed' },
                          { key: 'rooftop', label: 'Rooftop' }
                        ].map(({ key, label }) => (
                          <label key={key} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters[key]}
                              onChange={() => handleFilterChange(key)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleApplyFilters}
                      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Venues Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
              {filteredVenues.map((v) => (
                <div key={v.id} className="group rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition duration-200 hover:shadow-lg">
                  <div className="relative h-44 w-full bg-center bg-cover" style={{ backgroundImage: `url(${v.image})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/40 px-2 py-1 rounded-md">⭐ {v.rating.toFixed(1)}</div>
                  </div>
                  <div className="p-5">
                    <a  href='/venue/${encodeURIComponent(city)}/${v.id}'className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-700">{v.name}</a>
                    <p className="text-sm text-gray-600">{v.location} • {v.locality} • {v.venueType}</p>
                    <p className="text-sm text-gray-600">Up to {v.capacity} guests</p>
                    <p className="mt-2 text-gray-800 font-medium">Starting at ₹{v.price.toLocaleString('en-IN')}</p>
                    
                    {/* Features Display */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {v.features.veg && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Veg</span>}
                      {v.features.nonVeg && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Non-Veg</span>}
                      {v.features.outsideFood && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Outside Food</span>}
                      {v.features.outsideLiquor && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Outside Liquor</span>}
                      {v.features.rooftop && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Rooftop</span>}
                    </div>
                    
                    <div className="mt-4 flex gap-3">
                      <Link
                        to={`/venue/${encodeURIComponent(city)}/${v.id}`}
                        state={v}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 inline-flex items-center justify-center"
                      >
                        View
                      </Link>
                      <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200">Enquire</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredVenues.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No venues match your current filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ListofVenues


