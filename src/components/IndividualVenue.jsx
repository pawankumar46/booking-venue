import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import Calendar from './Calendar'

const IndividualVenue = () => {
  const { city = '', venueId = '' } = useParams()
  const location = useLocation()
  const state = location.state || {}

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

  const fallbackVenue = useMemo(() => {
    const idNum = parseInt(venueId, 10) || 1
    const idx = (idNum - 1) % venueImages.length
    return {
      id: idNum,
      name: state.name || `Premier Venue ${idNum}`,
      rating: state.rating || 4.3,
      capacity: state.capacity || 300 + (idNum - 1) * 50,
      price: state.price || 450,
      location: state.location || decodeURIComponent(city),
      photos: venueImages,
      description: state.description || `Experience elegance and sophistication at ${state.name || `Premier Venue ${idNum}`}. Our venue offers a perfect blend of modern amenities and classic charm, making it an ideal choice for your special occasions. With spacious halls, beautiful décor, and exceptional service, we ensure your event becomes a memorable celebration.`,
      amenities: [
        'Air Conditioning',
        'Free WiFi',
        'Sound System',
        'LED Lighting',
        'Stage Setup',
        'Dance Floor',
        'Parking Space',
        'Security',
        'Catering Service',
        'Decoration Service',
        'Backup Power',
        'Clean Washrooms',
        'Green Rooms',
        'Valet Parking',
        'Bar Counter'
      ],
      seatingArrangements: state.seatingArrangements || [
        { type: 'Round Table Seating', capacity: 8, description: 'Perfect for intimate dining and conversations' },
        { type: 'Theater Style', capacity: 200, description: 'Ideal for presentations and ceremonies' },
        { type: 'Banquet Style', capacity: 150, description: 'Classic formal dining arrangement' },
        { type: 'Cocktail Standing', capacity: 300, description: 'Great for networking and mingling events' },
        { type: 'Classroom Style', capacity: 80, description: 'Best for training sessions and workshops' },
        { type: 'U-Shape Setup', capacity: 40, description: 'Perfect for meetings and discussions' }
      ].slice(0, Math.floor(Math.random() * 3) + 3), // Random 3-5 seating arrangements
      features: state.features || {
        parking: true,
        airConditioning: true,
        powerBackup: true,
        soundSystem: true,
        decoration: Math.random() > 0.3,
        catering: Math.random() > 0.2,
        photography: Math.random() > 0.4,
        security: true
      }
    }
  }, [city, state, venueId, venueImages])

  const venue = { ...fallbackVenue, ...state }

  const DatePicker = () => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    const label = selected
      ? selected.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'Select date'

    const handleSelect = (d) => {
      setSelected(d)
      setOpen(false)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (open && !event.target.closest('.date-picker')) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    return (
      <div className="relative date-picker">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`mt-1 w-full rounded-lg border px-4 py-3 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selected 
              ? 'border-blue-500 bg-blue-50 text-blue-900' 
              : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={selected ? 'font-medium' : 'text-gray-500'}>
              {label}
            </span>
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        {open && (
          <div className="absolute z-30 mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
            <Calendar value={selected || new Date()} onChange={handleSelect} minDate={new Date()} />
          </div>
        )}
      </div>
    )
  }

  const TimePicker = ({ label, value, onChange, placeholder }) => {
    const [open, setOpen] = useState(false)
    const [selectedTime, setSelectedTime] = useState(value || '')

    const timeSlots = [
      '06:00', '07:00', '08:00', 
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
      '21:00', '21:30', '22:00', '22:30', '23:00'
    ]

    const handleTimeSelect = (time) => {
      setSelectedTime(time)
      onChange(time)
      setOpen(false)
    }

    const formatTime = (time) => {
      if (!time) return ''
      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      return `${displayHour}:${minutes} ${ampm}`
    }

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (open && !event.target.closest('.time-picker')) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    return (
      <div className="relative time-picker">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`mt-1 w-full rounded-lg border px-4 py-3 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedTime 
              ? 'border-blue-500 bg-blue-50 text-blue-900' 
              : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={selectedTime ? 'font-medium' : 'text-gray-500'}>
              {selectedTime ? formatTime(selectedTime) : placeholder}
            </span>
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        {open && (
          <div className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-xl max-h-80 overflow-y-auto">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Select Time</h3>
              <div className="h-px bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  className={`px-4 py-3 text-sm rounded-lg font-medium transition-all duration-150 ${
                    selectedTime === time 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Gallery modal state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  // Time selection state
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const openGallery = (startIndex = 0) => {
    setGalleryIndex(startIndex)
    setIsGalleryOpen(true)
  }
  const closeGallery = () => setIsGalleryOpen(false)
  const nextImage = () => setGalleryIndex((i) => (i + 1) % venue.photos.length)
  const prevImage = () => setGalleryIndex((i) => (i - 1 + venue.photos.length) % venue.photos.length)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    // Validate time selection
    if (startTime && endTime) {
      const start = new Date(`2000-01-01T${startTime}`)
      const end = new Date(`2000-01-01T${endTime}`)
      if (end <= start) {
        alert('End time must be after start time')
        return
      }
    }
    
    const formData = new FormData(e.target)
    const data = {
      venueId: venue.id,
      venueName: venue.name,
      date: formData.get('date'),
      startTime: startTime,
      endTime: endTime,
      session: formData.get('session'),
      guests: formData.get('guests'),
      name: formData.get('name'),
      phone: formData.get('phone')
    }
    console.log('Booking enquiry:', data)
    // Here you would typically send this data to your backend
    alert('Booking enquiry submitted successfully!')
  }

  useEffect(() => {
    if (!isGalleryOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeGallery()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isGalleryOpen])

  return (
    <div className="bg-gray-50 min-h-screen shadow-lg">
      {/* Header */}
      <section className="w-full pt-10 pb-6 bg-white shadow-lg border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-sm text-gray-600 mb-2">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/venues/${encodeURIComponent(venue.location)}`} className="hover:text-gray-900">Venues in {venue.location}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{venue.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{venue.name}</h1>
          <p className="text-gray-700 mt-1">{venue.location} • ⭐ {Number(venue.rating).toFixed(1)} • Up to {venue.capacity} guests</p>
        </div>
      </section>
      
      {/* Content */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3">
                <div className="col-span-4 row-span-2 lg:col-span-3 lg:row-span-2 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => openGallery(0)} className="block w-full">
                    <div className="h-48 sm:h-72 md:h-[420px] bg-center bg-cover" style={{ backgroundImage: `url(${venue.photos[0]})` }} />
                  </button>
                </div>
                <div className="hidden lg:block rounded-xl overflow-hidden">
                  <button type="button" onClick={() => openGallery(1)} className="block w-full">
                    <div className="h-32 bg-center bg-cover" style={{ backgroundImage: `url(${venue.photos[1 % venue.photos.length]})` }} />
                  </button>
                </div>
                <div className="hidden lg:block rounded-xl overflow-hidden">
                  <button type="button" onClick={() => openGallery(2)} className="block w-full">
                    <div className="h-32 bg-center bg-cover" style={{ backgroundImage: `url(${venue.photos[2 % venue.photos.length]})` }} />
                  </button>
                </div>
                <div className="hidden lg:block rounded-xl overflow-hidden">
                  <button type="button" onClick={() => openGallery(3)} className="block w-full">
                    <div className="h-32 bg-center bg-cover" style={{ backgroundImage: `url(${venue.photos[3 % venue.photos.length]})` }} />
                  </button>
                </div>
                <div className="hidden lg:block rounded-xl overflow-hidden relative">
                  <button type="button" onClick={() => openGallery(0)} className="block w-full">
                    <div className="h-32 bg-center bg-cover" style={{ backgroundImage: `url(${venue.photos[4 % venue.photos.length]})` }} />
                    <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center text-sm font-semibold">View all photos</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <aside className="order-first lg:order-last">
              <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Starting at</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">₹{`450/Pax`.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-sm font-medium text-yellow-600">⭐ {Number(venue.rating).toFixed(1)}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>Capacity: up to {venue.capacity} guests</li>
                  <li>Location: {venue.location}</li>
                  <li>Food: Veg & Non-Veg available</li>
                  <li>Parking: Available</li>
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="rounded-md bg-blue-600 px-3 sm:px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Enquire</button>
                  <button className="rounded-md bg-gray-100 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200">Call</button>
                </div>
              </div>

              {/* Availability Form */}
              <div className="mt-4 sm:mt-6 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Check Availability</h2>
                <form className="mt-4 space-y-3 sm:space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Date</label>
                    <DatePicker />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Time</label>
                      <TimePicker 
                        value={startTime}
                        onChange={setStartTime}
                        placeholder="Select start time"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Time</label>
                      <TimePicker 
                        value={endTime}
                        onChange={setEndTime}
                        placeholder="Select end time"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="session" className="block text-sm font-medium text-gray-700">Session</label>
                    <select
                      id="session"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>Select session</option>
                      <option value="Morning">Morning / Lunch</option>
                      <option value="Evening">Evening / Dinner</option>
                      <option value="Full Day">Full Day</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700">No. of Guests</label>
                    <input
                      id="guests"
                      type="number"
                      min="1"
                      placeholder="e.g. 150"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full rounded-lg bg-red-600 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-white hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Check Availability</button>
                </form>
              </div>
            </aside>
          </div>

          {/* About the Venue */}
          <div className="mt-6 sm:mt-8">
            <div className="rounded-xl bg-white p-4 sm:p-6 ring-1 ring-black/5 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">About {venue.name}</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{venue.description}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-xl bg-white p-4 sm:p-5 ring-1 ring-black/5 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Veg & Non-Veg available</li>
                <li>3 banquet halls</li>
                <li>Up to {venue.capacity} guests</li>
                <li>Professional event management</li>
                <li>Premium location</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white p-4 sm:p-5 ring-1 ring-black/5 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Timings</h3>
              <p className="text-sm text-gray-700">Morning: 9:00 AM – 3:30 PM</p>
              <p className="text-sm text-gray-700">Evening: 5:00 PM – 11:00 PM</p>
              <p className="text-sm text-gray-700 mt-2">Full Day bookings available</p>
            </div>
            <div className="rounded-xl bg-white p-4 sm:p-5 ring-1 ring-black/5 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Menu</h3>
              <p className="text-sm text-gray-700">Veg: ₹800 per person</p>
              <p className="text-sm text-gray-700">Non-Veg: ₹999 per person</p>
              <p className="text-sm text-gray-500 mt-2">Customizable menu options</p>
            </div>
          </div>

          {/* Amenities & Features */}
          <div className="mt-6 sm:mt-8">
            <div className="rounded-xl bg-white p-4 sm:p-6 ring-1 ring-black/5 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seating Arrangements */}
          <div className="mt-6 sm:mt-8">
            <div className="rounded-xl bg-white p-4 sm:p-6 ring-1 ring-black/5 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Seating Arrangements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {venue.seatingArrangements.map((seating, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{seating.type}</h4>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {(['Round Table', 'Rectangular Table', 'Dining Style', 'Dining Table'].includes(seating.type))
                          ? `Up to ${seating.capacity} guests / table`
                          : `Up to ${seating.capacity}`}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">{seating.description || `Ideal ${seating.type}${seating.capacity ? ` • up to ${seating.capacity}${(['Round Table', 'Rectangular Table', 'Dining Style', 'Dining Table', 'Round Table Seating', 'Rectangular Table Seating'].includes(seating.type) ? ' per table' : ' guests')}` : ''}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-6 sm:mt-8">
            <div className="rounded-xl bg-white p-4 sm:p-6 ring-1 ring-black/5 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Additional Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className={`p-3 rounded-lg text-center ${venue.features.decoration ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${venue.features.decoration ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <span className={`text-sm sm:text-base ${venue.features.decoration ? 'text-green-600' : 'text-gray-400'}`}>🎨</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Decoration</p>
                  <p className={`text-xs ${venue.features.decoration ? 'text-green-600' : 'text-red-500'}`}>
                    {venue.features.decoration ? 'Available' : 'Not Available'}
                  </p>
                </div>

                <div className={`p-3 rounded-lg text-center ${venue.features.catering ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${venue.features.catering ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <span className={`text-sm sm:text-base ${venue.features.catering ? 'text-green-600' : 'text-gray-400'}`}>🍽️</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Catering</p>
                  <p className={`text-xs ${venue.features.catering ? 'text-green-600' : 'text-red-500'}`}>
                    {venue.features.catering ? 'Available' : 'External Only'}
                  </p>
                </div>

                <div className={`p-3 rounded-lg text-center ${venue.features.photography ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${venue.features.photography ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <span className={`text-sm sm:text-base ${venue.features.photography ? 'text-green-600' : 'text-gray-400'}`}>📸</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Photography</p>
                  <p className={`text-xs ${venue.features.photography ? 'text-green-600' : 'text-red-500'}`}>
                    {venue.features.photography ? 'In-house Available' : 'External Only'}
                  </p>
                </div>

                <div className="p-3 rounded-lg text-center bg-green-50 border border-green-200">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 rounded-full flex items-center justify-center bg-green-100">
                    <span className="text-sm sm:text-base text-green-600">🔒</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Security</p>
                  <p className="text-xs text-green-600">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/80" onClick={closeGallery} />
          <div className="relative h-full w-full flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button
                type="button"
                onClick={closeGallery}
                className="absolute -top-10 right-0 text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-md px-3 py-1 text-sm"
              >
                Close
              </button>
              <div className="relative rounded-lg overflow-hidden bg-black">
                <img src={venue.photos[galleryIndex]} alt="Venue" className="w-full max-h-[80vh] object-contain" />
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-gray-900 font-bold"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-gray-900 font-bold"
                  aria-label="Next"
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/90 bg-black/40 px-2 py-1 rounded-md">
                  {galleryIndex + 1} / {venue.photos.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndividualVenue


