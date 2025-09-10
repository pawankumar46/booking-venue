import React, { useState, useMemo, useRef } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { FiMapPin, FiClock, FiStar, FiHeart, FiShare2, FiPhone, FiMail, FiPackage, FiTruck, FiSettings } from 'react-icons/fi'

const IndividualResources = () => {
  const { resourceId } = useParams()
  const location = useLocation()
  const resource = location.state || {}
  const mode = (resource.mode || 'rent').toLowerCase()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('about')
  const [isSaved, setIsSaved] = useState(false)

  // Resource data from Resources.jsx or fallback
  const resourceData = useMemo(() => ({
    id: resource.id || resourceId || '1',
    name: resource.name || 'Premium Event Equipment',
    location: resource.address || 'Mumbai, Delhi',
    experience: '5+ years experience',
    rating: 4.7,
    reviewCount: 89,
    isFeatured: true,
    price: resource.price || '₹1,500 / day',
    responseTime: 'Within 4 hours',
    advanceBooking: '7 days',
    cancellation: 'Free up to 3 days',
    contact: '+91 98765 43210',
    email: 'contact@premiumequipment.com',
    description: `With 5+ years of experience in event equipment rental, we specialize in providing high-quality ${resource.name?.toLowerCase() || 'event equipment'} for all types of events. Our team is committed to delivering exceptional service and ensuring your event is a success.`,
    services: [resource.name] || ['Equipment Rental', 'Setup & Installation', 'Delivery Service'],
    portfolio: [
      resource.photo || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511110011919-7fea1f0e2c69?q=80&w=1200&auto=format&fit=crop'
    ],
    packages: [
      { name: 'Basic Rental', price: '₹1,500', features: ['1 day rental', 'Basic setup', 'Pickup service'] },
      { name: 'Standard Package', price: '₹2,500', features: ['2 days rental', 'Full setup & installation', 'Delivery & pickup'] },
      { name: 'Premium Package', price: '₹4,000', features: ['3 days rental', 'Complete setup with support', 'Free delivery & pickup', 'On-site assistance'] }
    ],
    reviews: [
      { name: 'Rajesh Kumar', rating: 5, comment: 'Excellent equipment quality and timely delivery. Highly recommended!' },
      { name: 'Priya Sharma', rating: 4, comment: 'Great service and professional team. Equipment was in perfect condition.' },
      { name: 'Amit Singh', rating: 5, comment: 'Reliable service with good pricing. Will definitely use again.' }
    ]
  }), [resourceId, resource])

  // Sell-mode state and helpers
  const [quantity, setQuantity] = useState(1)
  const isIdol = (resourceData.name || '').toLowerCase().includes('idol')
  const isDiya = (resourceData.name || '').toLowerCase().includes('diya') || (resourceData.name || '').toLowerCase().includes('dia')
  const [material, setMaterial] = useState(isIdol ? 'metal' : '')
  const [sizeInches, setSizeInches] = useState(isDiya ? '4' : '')
  const isBalloon = (resourceData.name || '').toLowerCase().includes('balloon')
  const [idolVariant, setIdolVariant] = useState(isIdol ? 'Shiva' : '')
  const [balloonVariant, setBalloonVariant] = useState(isBalloon ? 'Balloons' : '')

  const incrementQty = () => setQuantity((q) => Math.min(99, q + 1))
  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1))

  const addToCart = () => {
    try {
      const cartRaw = localStorage.getItem('cart')
      const cart = cartRaw ? JSON.parse(cartRaw) : []
      const item = {
        id: resourceData.id,
        name: resourceData.name,
        photo: resourceData.portfolio?.[0],
        price: resourceData.price,
        mode,
        quantity,
        options: {
          material: isIdol ? material : undefined,
          sizeInches: isDiya ? sizeInches : undefined,
          idolVariant: isIdol ? idolVariant : undefined,
          balloonVariant: isBalloon ? balloonVariant : undefined,
        },
      }
      cart.push(item)
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {}
  }

  // Resource type configuration
  const resourceConfig = useMemo(() => {
    const configs = {
      'Ganesha idol / God idol setup': {
        icon: FiPackage,
        color: 'purple',
        equipment: ['Traditional idols', 'Decorative stands', 'Lighting setup', 'Installation tools']
      },
      'Decorative background / stage backdrop': {
        icon: FiSettings,
        color: 'blue',
        equipment: ['Custom backdrops', 'Hanging systems', 'Lighting effects', 'Installation hardware']
      },
      'Flower decorations (real/artificial)': {
        icon: FiPackage,
        color: 'pink',
        equipment: ['Fresh flowers', 'Artificial arrangements', 'Vases & containers', 'Floral tools']
      },
      'Balloon decorations / arches / pillars': {
        icon: FiPackage,
        color: 'red',
        equipment: ['Balloons & helium', 'Arch frames', 'Pillar stands', 'Decorative ribbons']
      },
      'Mandap / canopy / shamiana': {
        icon: FiSettings,
        color: 'green',
        equipment: ['Canopy structures', 'Fabric materials', 'Support poles', 'Installation equipment']
      },
      'Wedding arch / entry gate decoration': {
        icon: FiSettings,
        color: 'yellow',
        equipment: ['Arch frames', 'Decorative elements', 'Lighting', 'Installation tools']
      },
      'Fairy lights / LED lights / chandeliers': {
        icon: FiSettings,
        color: 'indigo',
        equipment: ['LED light strings', 'Chandeliers', 'Power supplies', 'Installation hardware']
      },
      'Carpet / red carpet walkway': {
        icon: FiPackage,
        color: 'brown',
        equipment: ['Red carpets', 'Runner materials', 'Carpet tape', 'Cleaning supplies']
      },
      'Photo booth props & frames': {
        icon: FiPackage,
        color: 'cyan',
        equipment: ['Photo frames', 'Props collection', 'Backdrop stands', 'Lighting setup']
      },
      'Chairs (plastic, cushioned, banquet)': {
        icon: FiPackage,
        color: 'gray',
        equipment: ['Various chair types', 'Cushions', 'Chair covers', 'Transport equipment']
      },
      'Chair covers & ribbons': {
        icon: FiPackage,
        color: 'rose',
        equipment: ['Chair covers', 'Decorative ribbons', 'Tie-backs', 'Color options']
      },
      'Sofas for stage': {
        icon: FiPackage,
        color: 'amber',
        equipment: ['Stage sofas', 'Cushions', 'Decorative throws', 'Transport equipment']
      },
      'Dining tables / round tables': {
        icon: FiPackage,
        color: 'emerald',
        equipment: ['Various table sizes', 'Table linens', 'Centerpieces', 'Setup tools']
      },
      'Cocktail tables / high tables': {
        icon: FiPackage,
        color: 'teal',
        equipment: ['Cocktail tables', 'High tables', 'Table covers', 'Bar accessories']
      },
      'Tablecloths, runners, skirting': {
        icon: FiPackage,
        color: 'violet',
        equipment: ['Table linens', 'Runners', 'Table skirting', 'Color varieties']
      },
      'DJ & sound system': {
        icon: FiSettings,
        color: 'orange',
        equipment: ['Sound systems', 'DJ equipment', 'Speakers', 'Microphones']
      },
      'Speakers & microphones': {
        icon: FiSettings,
        color: 'lime',
        equipment: ['Professional speakers', 'Wireless microphones', 'Audio mixers', 'Cables']
      },
      'LED screens / projectors': {
        icon: FiSettings,
        color: 'sky',
        equipment: ['LED screens', 'Projectors', 'Mounting systems', 'Video equipment']
      },
      'Dance floor setup': {
        icon: FiSettings,
        color: 'fuchsia',
        equipment: ['Dance floor tiles', 'Lighting effects', 'Sound system', 'Installation tools']
      },
      'Stage platforms / risers': {
        icon: FiSettings,
        color: 'slate',
        equipment: ['Stage platforms', 'Riser blocks', 'Safety rails', 'Assembly tools']
      },
      'Cutlery (plates, spoons, glasses)': {
        icon: FiPackage,
        color: 'zinc',
        equipment: ['Dinnerware sets', 'Glassware', 'Cutlery', 'Serving utensils']
      },
      'Serving counters / buffet tables': {
        icon: FiPackage,
        color: 'stone',
        equipment: ['Buffet tables', 'Serving counters', 'Table covers', 'Display equipment']
      },
      'Chafing dishes (for hot food)': {
        icon: FiPackage,
        color: 'neutral',
        equipment: ['Chafing dishes', 'Fuel burners', 'Serving spoons', 'Temperature control']
      },
      'Juice / mocktail counters': {
        icon: FiPackage,
        color: 'lime',
        equipment: ['Juice dispensers', 'Mocktail equipment', 'Glassware', 'Garnish supplies']
      },
      'Coffee machine / tea stall setup': {
        icon: FiPackage,
        color: 'amber',
        equipment: ['Coffee machines', 'Tea service', 'Cups & saucers', 'Beverage supplies']
      },
      'Shamiana / pandal': {
        icon: FiSettings,
        color: 'green',
        equipment: ['Shamiana structures', 'Fabric materials', 'Support poles', 'Installation equipment']
      },
      'Fans / coolers / heaters': {
        icon: FiSettings,
        color: 'blue',
        equipment: ['Industrial fans', 'Coolers', 'Heaters', 'Climate control']
      },
      'Portable AC': {
        icon: FiSettings,
        color: 'cyan',
        equipment: ['Portable AC units', 'Extension cords', 'Installation tools', 'Maintenance supplies']
      },
      'Generators / backup power': {
        icon: FiSettings,
        color: 'yellow',
        equipment: ['Generator units', 'Fuel supplies', 'Power cables', 'Safety equipment']
      },
      'Carpet flooring / matting': {
        icon: FiPackage,
        color: 'brown',
        equipment: ['Carpet rolls', 'Floor matting', 'Adhesive tape', 'Installation tools']
      },
      'Bouncy castle / inflatable games': {
        icon: FiPackage,
        color: 'pink',
        equipment: ['Inflatable games', 'Air blowers', 'Safety equipment', 'Setup tools']
      },
      'Magician / clown props': {
        icon: FiPackage,
        color: 'purple',
        equipment: ['Magic props', 'Costumes', 'Performance equipment', 'Entertainment supplies']
      },
      'Cake table setup': {
        icon: FiPackage,
        color: 'rose',
        equipment: ['Cake stands', 'Display tables', 'Decorative elements', 'Serving utensils']
      },
      'Party props (hats, masks, etc.)': {
        icon: FiPackage,
        color: 'indigo',
        equipment: ['Party hats', 'Masks', 'Costume accessories', 'Decorative items']
      },
      'Themed cutouts / cartoon characters': {
        icon: FiPackage,
        color: 'orange',
        equipment: ['Themed cutouts', 'Character displays', 'Stand materials', 'Decorative elements']
      }
    }
    return configs[resource.name] || configs['Ganesha idol / God idol setup']
  }, [resource.name])

  const IconComponent = resourceConfig.icon
  const colorClasses = {
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700', badge: 'bg-purple-100 text-purple-700' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', badge: 'bg-blue-100 text-blue-700' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', button: 'bg-pink-600 hover:bg-pink-700', badge: 'bg-pink-100 text-pink-700' },
    red: { bg: 'bg-red-50', text: 'text-red-600', button: 'bg-red-600 hover:bg-red-700', badge: 'bg-red-100 text-red-700' },
    green: { bg: 'bg-green-50', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700', badge: 'bg-green-100 text-green-700' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', button: 'bg-yellow-600 hover:bg-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', button: 'bg-indigo-600 hover:bg-indigo-700', badge: 'bg-indigo-100 text-indigo-700' },
    brown: { bg: 'bg-amber-50', text: 'text-amber-600', button: 'bg-amber-600 hover:bg-amber-700', badge: 'bg-amber-100 text-amber-700' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', button: 'bg-cyan-600 hover:bg-cyan-700', badge: 'bg-cyan-100 text-cyan-700' },
    gray: { bg: 'bg-gray-50', text: 'text-gray-600', button: 'bg-gray-600 hover:bg-gray-700', badge: 'bg-gray-100 text-gray-700' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', button: 'bg-rose-600 hover:bg-rose-700', badge: 'bg-rose-100 text-rose-700' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', button: 'bg-amber-600 hover:bg-amber-700', badge: 'bg-amber-100 text-amber-700' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', button: 'bg-emerald-600 hover:bg-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', button: 'bg-teal-600 hover:bg-teal-700', badge: 'bg-teal-100 text-teal-700' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', button: 'bg-violet-600 hover:bg-violet-700', badge: 'bg-violet-100 text-violet-700' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', button: 'bg-orange-600 hover:bg-orange-700', badge: 'bg-orange-100 text-orange-700' },
    lime: { bg: 'bg-lime-50', text: 'text-lime-600', button: 'bg-lime-600 hover:bg-lime-700', badge: 'bg-lime-100 text-lime-700' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-600', button: 'bg-sky-600 hover:bg-sky-700', badge: 'bg-sky-100 text-sky-700' },
    fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', button: 'bg-fuchsia-600 hover:bg-fuchsia-700', badge: 'bg-fuchsia-100 text-fuchsia-700' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', button: 'bg-slate-600 hover:bg-slate-700', badge: 'bg-slate-100 text-slate-700' },
    zinc: { bg: 'bg-zinc-50', text: 'text-zinc-600', button: 'bg-zinc-600 hover:bg-zinc-700', badge: 'bg-zinc-100 text-zinc-700' },
    stone: { bg: 'bg-stone-50', text: 'text-stone-600', button: 'bg-stone-600 hover:bg-stone-700', badge: 'bg-stone-100 text-stone-700' },
    neutral: { bg: 'bg-neutral-50', text: 'text-neutral-600', button: 'bg-neutral-600 hover:bg-neutral-700', badge: 'bg-neutral-100 text-neutral-700' }
  }

  const currentColor = colorClasses[resourceConfig.color] || colorClasses.purple

  // Build the same catalog as Resources.jsx to power recommendations
  const recommendCities = useMemo(
    () => [
      'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat'
    ],
    []
  )

  const photoByName = (name) => {
    const n = (name || '').toLowerCase()
    if (n.includes('ganesha') || n.includes('god idol')) return 'https://images.unsplash.com/photo-1567591391293-f9a99c77e128?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('background') || n.includes('backdrop')) return 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('flower')) return 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('balloon')) return 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('mandap') || n.includes('shamiana')) return 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('wedding arch')) return 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('fairy lights') || n.includes('chandeliers') || n.includes('led lights')) return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('carpet')) return 'https://images.unsplash.com/photo-1614080035039-af24354a6478?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('photo booth')) return 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('chair')) return 'https://images.unsplash.com/photo-1571428229830-4f2e5b3f0c74?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('sofa')) return 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a02?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('dining tables') || n.includes('round tables')) return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('cocktail tables')) return 'https://images.unsplash.com/photo-1541542684-4a88a05b76d3?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('tablecloths') || n.includes('runners')) return 'https://images.unsplash.com/photo-1513617336893-3f3df36d3b06?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('dj') || n.includes('sound system')) return 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('speakers') || n.includes('microphones')) return 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('led screens') || n.includes('projectors')) return 'https://images.unsplash.com/photo-1514302240736-b1fee5985889?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('dance floor')) return 'https://images.unsplash.com/photo-1511110011919-7fea1f0e2c69?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('stage platforms') || n.includes('risers')) return 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('cutlery')) return 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('serving counters') || n.includes('buffet')) return 'https://images.unsplash.com/photo-1604908176997-fbf48fd15698?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('chafing dishes')) return 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('juice') || n.includes('mocktail')) return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('coffee machine') || n.includes('tea stall')) return 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('fans') || n.includes('coolers') || n.includes('heaters')) return 'https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('portable ac')) return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('generators') || n.includes('backup power')) return 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('bouncy castle') || n.includes('inflatable')) return 'https://images.unsplash.com/photo-1528763380143-65b3acfd0df6?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('magician') || n.includes('clown')) return 'https://images.unsplash.com/photo-1505744762024-59cf4f3b6b3b?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('cake table')) return 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('party props')) return 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop'
    if (n.includes('themed cutouts') || n.includes('cartoon')) return 'https://images.unsplash.com/photo-1542452255191-c85a98f2c5b9?q=80&w=1200&auto=format&fit=crop'
    return 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1200&auto=format&fit=crop'
  }

  const recommendNames = useMemo(
    () => [
      'Ganesha idol / God idol setup',
      'Decorative background / stage backdrop',
      'Flower decorations (real/artificial)',
      'Balloon decorations / arches / pillars',
      'Mandap / canopy / shamiana',
      'Wedding arch / entry gate decoration',
      'Fairy lights / LED lights / chandeliers',
      'Carpet / red carpet walkway',
      'Photo booth props & frames',
      'Chairs (plastic, cushioned, banquet)',
      'Chair covers & ribbons',
      'Sofas for stage',
      'Dining tables / round tables',
      'Cocktail tables / high tables',
      'Tablecloths, runners, skirting',
      'DJ & sound system',
      'Speakers & microphones',
      'LED screens / projectors',
      'Dance floor setup',
      'Stage platforms / risers',
      'Cutlery (plates, spoons, glasses)',
      'Serving counters / buffet tables',
      'Chafing dishes (for hot food)',
      'Juice / mocktail counters',
      'Coffee machine / tea stall setup',
      'Shamiana / pandal',
      'Fans / coolers / heaters',
      'Portable AC',
      'Generators / backup power',
      'Carpet flooring / matting',
      'Bouncy castle / inflatable games (for birthdays)',
      'Magician / clown props',
      'Cake table setup',
      'Party props (hats, masks, etc.)',
      'Themed cutouts / cartoon characters',
    ],
    []
  )

  const recommendedItems = useMemo(() => {
    const priceBrackets = ['₹500', '₹1,000', '₹1,500', '₹2,000', '₹2,500', '₹3,000']
    return recommendNames.map((name, idx) => {
      const basePrice = priceBrackets[idx % priceBrackets.length]
      const price = mode === 'sell' ? `${basePrice}` : `${basePrice} / day`
      const address = `${recommendCities[idx % recommendCities.length]}, India`
      return { id: idx + 1, name, price, address, photo: photoByName(name) }
    })
  }, [recommendNames, recommendCities, mode])

  const carouselRef = useRef(null)
  const scrollByAmount = (delta) => {
    const node = carouselRef.current
    if (!node) return
    node.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/resources" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              ← Back to Resources
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              >
                <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-600">
                <FiShare2 className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500">Share</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resource Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{resourceData.name}</h1>
                    {resourceData.isFeatured && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentColor.badge}`}>
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>{resourceData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{resourceData.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-900 font-medium">{resourceData.rating}</span>
                    <span className="text-gray-500">({resourceData.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${currentColor.bg}`}>
                  <IconComponent className={`w-8 h-8 ${currentColor.text}`} />
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {resourceData.portfolio.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['about', 'packages', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About {resourceData.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{resourceData.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Services Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {resourceData.services.map((serviceItem, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {serviceItem}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Equipment & Features</h4>
                      <div className="space-y-2">
                        {resourceConfig.equipment.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${currentColor.bg}`}></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div className="space-y-4">
                    {resourceData.packages.map((pkg, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                          <span className="text-xl font-bold text-gray-900">{pkg.price}</span>
                        </div>
                        <ul className="space-y-1">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                              <div className={`w-1.5 h-1.5 rounded-full ${currentColor.bg}`}></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {resourceData.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="space-y-6">
            {/* Conditional Right Panel */}
            {mode === 'sell' ? (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Buy Options</h3>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="inline-flex items-center rounded-lg border border-gray-300 overflow-hidden">
                    <button onClick={decrementQty} className="px-3 py-2 text-gray-700 hover:bg-gray-50">-</button>
                    <span className="px-4 py-2 min-w-[3rem] text-center text-gray-900">{quantity}</span>
                    <button onClick={incrementQty} className="px-3 py-2 text-gray-700 hover:bg-gray-50">+</button>
                  </div>
                </div>

                {/* Material for idols */}
                {isIdol && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="metal">Metal</option>
                      <option value="aluminium">Aluminium</option>
                      <option value="brass">Brass</option>
                    </select>
                  </div>
                )}

                {/* Idol variant (e.g., Shiva/Vishnu) */}
                {isIdol && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Idol Variant</label>
                    <select
                      value={idolVariant}
                      onChange={(e) => setIdolVariant(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="Shiva">Shiva</option>
                      <option value="Vishnu">Vishnu</option>
                      <option value="Ganesha">Ganesha</option>
                      <option value="Lakshmi">Lakshmi</option>
                    </select>
                  </div>
                )}

                {/* Size for diyas */}
                {isDiya && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size (inches)</label>
                    <select
                      value={sizeInches}
                      onChange={(e) => setSizeInches(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="3">3"</option>
                      <option value="4">4"</option>
                      <option value="6">6"</option>
                      <option value="8">8"</option>
                    </select>
                  </div>
                )}

                {/* Balloons variant (Balloons/Arches/Pillars) */}
                {isBalloon && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Decoration Type</label>
                    <select
                      value={balloonVariant}
                      onChange={(e) => setBalloonVariant(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="Balloons">Balloons</option>
                      <option value="Arches">Arches</option>
                      <option value="Pillars">Pillars</option>
                    </select>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => { addToCart(); navigate('/cart') }}
                    className={`${currentColor.button} flex-1 text-white py-3 px-4 rounded-lg font-medium transition-colors`}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate('/resources?mode=sell')}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Add more items
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <button className={`w-full ${currentColor.button} text-white py-3 px-4 rounded-lg font-medium transition-colors`}>
                    Book Now
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Call Now
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            )}

            {/* Quick Info / Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{mode === 'sell' ? 'Pricing' : 'Quick Info'}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-900">{resourceData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-semibold text-gray-900">{resourceData.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Advance Booking:</span>
                  <span className="font-semibold text-gray-900">{resourceData.advanceBooking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancellation:</span>
                  <span className="font-semibold text-gray-900">{resourceData.cancellation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mode === 'sell' && (
        <div className="max-w-7xl mx-auto px-4 pb-10">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-gray-900">Recommended for you</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollByAmount(-320)} className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">‹</button>
              <button onClick={() => scrollByAmount(320)} className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">›</button>
            </div>
          </div>
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
            {recommendedItems.map((item) => (
              <div key={item.id} className="min-w-[260px] max-w-[260px] snap-start bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
                <div className="h-36 w-full overflow-hidden">
                  <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                    <span className="shrink-0 inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 ring-1 ring-emerald-200">{item.price}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                    <FiMapPin className="w-3.5 h-3.5" />
                    <span>{item.address}</span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => navigate(`/resources/${item.id}`, { state: { ...item, mode: 'sell' } })}
                      className="inline-flex items-center justify-center rounded-full text-white px-3 py-1.5 text-xs font-semibold transition-colors bg-emerald-600 hover:bg-emerald-700"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default IndividualResources
