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

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {label}
        </button>
        {open && (
          <div className="absolute z-20 mt-2 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
            <Calendar value={selected || new Date()} onChange={handleSelect} minDate={new Date()} />
          </div>
        )}
      </div>
    )
  }

  // Gallery modal state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openGallery = (startIndex = 0) => {
    setGalleryIndex(startIndex)
    setIsGalleryOpen(true)
  }
  const closeGallery = () => setIsGalleryOpen(false)
  const nextImage = () => setGalleryIndex((i) => (i + 1) % venue.photos.length)
  const prevImage = () => setGalleryIndex((i) => (i - 1 + venue.photos.length) % venue.photos.length)

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
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-4 grid-rows-2 gap-3">
                <div className="col-span-4 row-span-2 lg:col-span-3 lg:row-span-2 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => openGallery(0)} className="block w-full">
                    <div className="h-72 md:h-[420px] bg-center bg-cover" style={{ backgroundImage: `url(${venue.photos[0]})` }} />
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
            <aside>
              <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Starting at</div>
                    <div className="text-2xl font-bold text-gray-900">₹{`450/Pax`.toLocaleString('en-IN')}</div>
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
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Enquire</button>
                  <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200">Call</button>
                </div>
              </div>

              {/* Availability Form */}
              <div className="mt-6 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6">
                <h2 className="text-lg font-semibold text-gray-900">Check Availability</h2>
                <form className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Date</label>
                    <DatePicker />
                  </div>
                  <div>
                    <label htmlFor="session" className="block text-sm font-medium text-gray-700">Session</label>
                    <select
                      id="session"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">Check Availability</button>
                </form>
              </div>
            </aside>
          </div>

          {/* Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white p-5  ring-1 ring-black/5 shadow-lg" >
              <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Veg & Non-Veg available</li>
                <li>3 banquet halls</li>
                <li>Up to 500 guests</li>
                <li>45 rooms, valet parking</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white p-5  ring-1 ring-black/5 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Timings</h3>
              <p className="text-sm text-gray-700">Morning: 9:00 AM – 3:30 PM</p>
              <p className="text-sm text-gray-700">Evening: 5:00 PM – 11:00 PM</p>
            </div>
            <div className="rounded-xl bg-white p-5  ring-1 ring-black/5 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Menu</h3>
              <p className="text-sm text-gray-700">Veg: ₹800 per person</p>
              <p className="text-sm text-gray-700">Non-Veg: ₹999 per person</p>
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


