import React, { useMemo, useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'

const Resources = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const selectedResourceType = searchParams.get('resourceType') || ''
	const mode = (searchParams.get('mode') || 'rent').toLowerCase()
	const [query, setQuery] = useState('')
	const [priceMin, setPriceMin] = useState('')
	const [priceMax, setPriceMax] = useState('')

	const cities = useMemo(
		() => [
			'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat'
		],
		[]
	)

	const items = useMemo(() => {
		const photoByName = (name) => {
			const n = name.toLowerCase()
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
		const names = [
			"Ganesha idol / God idol setup",
			"Decorative background / stage backdrop",
			"Flower decorations (real/artificial)",
			"Balloon decorations / arches / pillars",
			"Mandap / canopy / shamiana",
			"Wedding arch / entry gate decoration",
			"Fairy lights / LED lights / chandeliers",
			"Carpet / red carpet walkway",
			"Photo booth props & frames",
			"Chairs (plastic, cushioned, banquet)",
			"Chair covers & ribbons",
			"Sofas for stage",
			"Dining tables / round tables",
			"Cocktail tables / high tables",
			"Tablecloths, runners, skirting",
			"DJ & sound system",
			"Speakers & microphones",
			"LED screens / projectors",
			"Dance floor setup",
			"Stage platforms / risers",
			"Cutlery (plates, spoons, glasses)",
			"Serving counters / buffet tables",
			"Chafing dishes (for hot food)",
			"Juice / mocktail counters",
			"Coffee machine / tea stall setup",
			"Shamiana / pandal",
			"Fans / coolers / heaters",
			"Portable AC",
			"Generators / backup power",
			"Carpet flooring / matting",
			"Bouncy castle / inflatable games (for birthdays)",
			"Magician / clown props",
			"Cake table setup",
			"Party props (hats, masks, etc.)",
			"Themed cutouts / cartoon characters"
		]
		return names.map((name, idx) => {
			const priceBrackets = ["₹500", "₹1,000", "₹1,500", "₹2,000", "₹2,500", "₹3,000"]
			const basePrice = priceBrackets[idx % priceBrackets.length]
			const price = mode === 'sell' ? `${basePrice}` : `${basePrice} / day`
			const address = `${cities[idx % cities.length]}, India`
			const description = `High-quality ${name.toLowerCase()} available for events and functions. Setup and delivery options available.`
			return { id: idx + 1, name, price, address, description, photo: photoByName(name) }
		})
	}, [cities, mode])

	const filtered = useMemo(() => {
		let list = items
		if (selectedResourceType) {
			list = list.filter((it) => it.name === selectedResourceType)
		}
		if (query.trim()) {
			const q = query.trim().toLowerCase()
			list = list.filter((it) => it.name.toLowerCase().includes(q))
		}
		// Price range only for sell mode
		if (mode === 'sell' && (priceMin || priceMax)) {
			const parsePrice = (p) => {
				const m = String(p || '').match(/\d[\d,]*/)
				if (!m) return 0
				return parseInt(m[0].replace(/,/g, ''), 10) || 0
			}
			const minV = priceMin ? parseInt(priceMin, 10) : undefined
			const maxV = priceMax ? parseInt(priceMax, 10) : undefined
			list = list.filter((it) => {
				const val = parsePrice(it.price)
				if (minV !== undefined && val < minV) return false
				if (maxV !== undefined && val > maxV) return false
				return true
			})
		}
		return list
	}, [items, selectedResourceType, query, mode, priceMin, priceMax])

	const handleResourceNavigate = (resource) => {
		navigate(`/resources/${resource.id}`, {
			state: { ...resource, mode }
		})
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 py-10">
				<div className="mb-8 text-center">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">Event Resources</h1>
					<p className="text-gray-600 mt-2">Decor, rentals, equipment and more for your events</p>
					<div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
						<span className={`px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${mode === 'sell' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-blue-50 text-blue-700 ring-blue-200'}`}>
							Mode: {mode === 'sell' ? 'Sell / Buy' : 'Rent'}
						</span>
						<div className="inline-flex rounded-lg bg-gray-100 p-1">
							<button
								type="button"
								onClick={() => {
									const params = new URLSearchParams()
									if (selectedResourceType) params.set('resourceType', selectedResourceType)
									params.set('mode', 'rent')
									navigate(`/resources?${params.toString()}`)
								}}
								className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
									mode !== 'sell' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
								}`}
							>
								Rent
							</button>
							<button
								type="button"
								onClick={() => {
									const params = new URLSearchParams()
									if (selectedResourceType) params.set('resourceType', selectedResourceType)
									params.set('mode', 'sell')
									navigate(`/resources?${params.toString()}`)
								}}
								className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
									mode === 'sell' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
								}`}
							>
								Sell / Buy
							</button>
						</div>
						{selectedResourceType && (
							<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-50 ring-1 ring-fuchsia-200 text-fuchsia-700">
								{selectedResourceType}
							</span>
						)}
					</div>
					<div className="mt-4 max-w-xl mx-auto">
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search resources (e.g., chairs, lights, DJ)"
							className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
						/>
					</div>
					{mode === 'sell' && (
						<div className="mt-3 max-w-xl mx-auto grid grid-cols-2 gap-3">
							<input
								value={priceMin}
								onChange={(e) => setPriceMin(e.target.value.replace(/[^\d]/g, ''))}
								placeholder="Min price (₹)"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
							/>
							<input
								value={priceMax}
								onChange={(e) => setPriceMax(e.target.value.replace(/[^\d]/g, ''))}
								placeholder="Max price (₹)"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
							/>
						</div>
					)}
					{selectedResourceType && (
						<div className="mt-3 inline-flex items-center gap-2 text-sm text-gray-700">
							<span className="px-2 py-0.5 rounded-full bg-fuchsia-50 ring-1 ring-fuchsia-200 text-fuchsia-700">Filtered by: {selectedResourceType}</span>
							<button onClick={() => navigate('/resources')} className="text-xs text-gray-600 underline">Clear</button>
						</div>
					)}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filtered.map((item) => (
						<div key={item.id} className={`relative bg-white rounded-xl shadow-sm ring-1 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all ring-gray-200`}>
							<span className={`absolute inset-x-0 top-0 h-1 bg-fuchsia-500`}></span>
							<div className="h-36 w-full overflow-hidden">
								<img
									src={item.photo}
									alt={item.name}
									className="h-full w-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="p-4">
								<div className="flex items-start justify-between gap-3">
									<h3 className="text-base md:text-lg font-semibold text-gray-900">{item.name}</h3>
									<span className="shrink-0 inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ring-1 ${mode === 'sell' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200'}">{item.price}</span>
								</div>
								<p className="mt-2 text-sm text-gray-700 line-clamp-3">{item.description}</p>
								<div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
									<FiMapPin className="text-gray-500" />
									<span>{item.address}</span>
								</div>

								<div className="mt-4 flex justify-end">
									<button 
										onClick={() => handleResourceNavigate(item)}
										className={`inline-flex items-center justify-center rounded-full text-white px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${mode === 'sell' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-fuchsia-600 hover:bg-fuchsia-700'}`}
									>
										{mode === 'sell' ? 'Buy / Details' : 'View Details'}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Resources