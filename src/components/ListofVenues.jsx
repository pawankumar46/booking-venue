import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'

const ListofVenues = () => {
  const params = useParams()
  const city = decodeURIComponent(params.city || '')

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

  const list = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `Premier Venue ${i + 1}`,
      capacity: 300 + i * 50,
      price: 50000 + i * 5000,
      image: venueImages[i % venueImages.length],
      rating: 4 + (i % 2),
      location: city,
    }))
  }, [city, venueImages])

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
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top venues in {city}</h2>
              <p className="text-gray-600 text-sm mt-1">Explore options by capacity, price and location.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((v) => (
                <div key={v.id} className="group rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition duration-200 hover:shadow-lg">
                  <div className="relative h-44 w-full bg-center bg-cover" style={{ backgroundImage: `url(${v.image})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/40 px-2 py-1 rounded-md">⭐ {v.rating.toFixed(1)}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-700">{v.name}</h3>
                    <p className="text-sm text-gray-600">{v.location} • Up to {v.capacity} guests</p>
                    <p className="mt-2 text-gray-800 font-medium">Starting at ₹{v.price.toLocaleString('en-IN')}</p>
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default ListofVenues


