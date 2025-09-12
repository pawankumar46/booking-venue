import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiPlus, FiMinus, FiShoppingCart, FiX, FiCheck, FiEye } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
const Menu = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [modalPackageType, setModalPackageType] = useState(null)
  const [cartPackages, setCartPackages] = useState([])

  const categories = [
    'Welcome Drinks',
    'Salad',
    'Payasam',
    'Starters',
    'Curry/Gravy',
    'Flavoured Rice',
    'Breads/Roti',
    'Sambar',
    'Rasam',
    'Desserts',
    'Beverages',

  ]

  const packageData = {
    classic: {
      name: 'Classic Package',
      price: 450,
      items: [
        { id: 1, name: 'Watermelon Juice', price: 20, description: 'Fresh watermelon juice with mint' },
        { id: 5, name: 'Green Salad', price: 30, description: 'Mixed greens with dressing' },
        { id: 10, name: 'Sabakki', price: 30, description: 'Sabakki Kheer' },
        { id: 14, name: 'Paneer Kebab', price: 30, description: 'Mixed greens with dressing' },
        { id: 19, name: 'Veg Kholapuri', price: 90, description: '' }
      ],
      additionalItems: [
        { id: 2, name: 'Jaljeera', price: 20, description: 'Spiced cumin water with lemon' },
        { id: 3, name: 'Mango Lassi', price: 30, description: 'Sweet yogurt drink with mango' },
        { id: 6, name: 'Caesar Salad', price: 30, description: 'Romaine lettuce with caesar dressing' },
        { id: 7, name: 'Fruit Salad', price: 40, description: 'Seasonal fruits with honey' },
        { id: 11, name: 'Shavige', price: 30, description: 'Shavige Kheer' },
        { id: 12, name: 'Gasagase', price: 40, description: 'Gasagase Kheer' },
        { id: 15, name: 'Gobi Manchurian', price: 30, description: 'Romaine lettuce with caesar dressing' },
        { id: 16, name: 'Babycorn Manchurian', price: 40, description: 'Seasonal fruits with honey' },
        { id: 20, name: 'Paneer Butter Masala', price: 100, description: 'Cottage cheese in rich tomato gravy' },
        { id: 21, name: 'Dal Makhani', price: 100, description: 'Creamy black lentils' }
      ]
    },
    gold: {
      name: 'Gold Package',
      price: 500,
      items: [
        { id: 3, name: 'Mango Lassi', price: 30, description: 'Sweet yogurt drink with mango' },
        { id: 6, name: 'Caesar Salad', price: 30, description: 'Romaine lettuce with caesar dressing' },
        { id: 11, name: 'Shavige', price: 30, description: 'Shavige Kheer' },
        { id: 15, name: 'Gobi Manchurian', price: 30, description: 'Romaine lettuce with caesar dressing' },
        { id: 20, name: 'Paneer Butter Masala', price: 100, description: 'Cottage cheese in rich tomato gravy' }
      ],
      additionalItems: [
        { id: 1, name: 'Watermelon Juice', price: 20, description: 'Fresh watermelon juice with mint' },
        { id: 2, name: 'Jaljeera', price: 20, description: 'Spiced cumin water with lemon' },
        { id: 4, name: 'Fresh Lime Soda', price: 40, description: 'Refreshing lime soda with mint' },
        { id: 5, name: 'Green Salad', price: 30, description: 'Mixed greens with dressing' },
        { id: 7, name: 'Fruit Salad', price: 40, description: 'Seasonal fruits with honey' },
        { id: 8, name: 'Corn Kosambari', price: 30, description: 'Sweet Corn Salad' },
        { id: 10, name: 'Sabakki', price: 30, description: 'Sabakki Kheer' },
        { id: 12, name: 'Gasagase', price: 40, description: 'Gasagase Kheer' },
        { id: 14, name: 'Paneer Kebab', price: 30, description: 'Mixed greens with dressing' },
        { id: 16, name: 'Babycorn Manchurian', price: 40, description: 'Seasonal fruits with honey' },
        { id: 17, name: 'Paneer 65', price: 30, description: 'Sweet Corn Salad' },
        { id: 19, name: 'Veg Kholapuri', price: 90, description: '' },
        { id: 21, name: 'Dal Makhani', price: 100, description: 'Creamy black lentils' },
        { id: 22, name: 'Aalu Channa Masala', price: 100, description: '' }
      ]
    }
  }

  const menuData = {
    'Welcome Drinks': [
      { id: 1, name: 'Watermelon Juice', price: 20, description: 'Fresh watermelon juice with mint' },
      { id: 2, name: 'Jaljeera', price: 20, description: 'Spiced cumin water with lemon' },
      { id: 3, name: 'Mango Lassi', price: 30, description: 'Sweet yogurt drink with mango' },
      { id: 4, name: 'Fresh Lime Soda', price: 40, description: 'Refreshing lime soda with mint' },
      { id: 5, name: 'Vanilla Milkshake', price: 50, description: 'Refreshing lime soda with mint' }
    ],
    'Salad': [
      { id: 5, name: 'Green Salad', price: 30, description: 'Mixed greens with dressing' },
      { id: 6, name: 'Caesar Salad', price:30, description: 'Romaine lettuce with caesar dressing' },
      { id: 7, name: 'Fruit Salad', price: 40, description: 'Seasonal fruits with honey' },
      { id: 8, name: 'Corn Kosambari', price: 30, description: 'Sweet Corn Salad' },
      { id: 9, name: 'Pomegranate Kosambari', price: 30, description: 'Pomegranate Salad with vegies' }
    ],
    'Payasam': [
      { id: 10, name: 'Sabakki', price: 30, description: 'Sabakki Kheer' },
      { id: 11, name: 'Shavige', price:30, description: 'Shavige Kheer' },
      { id: 12, name: 'Gasagase', price: 40, description: 'Gasagase Kheer' },
      { id: 13, name: 'Akki Kadlebele', price: 30, description: 'Akki Kadlebele Kheer' },
     ],
    'Starters': [
      { id: 14, name: 'Paneer Kebab', price: 30, description: 'Mixed greens with dressing' },
      { id: 15, name: 'Gobi Manchurian', price:30, description: 'Romaine lettuce with caesar dressing' },
      { id: 16, name: 'Babycorn Manchurian', price: 40, description: 'Seasonal fruits with honey' },
      { id: 17, name: 'Paneer 65', price: 30, description: 'Sweet Corn Salad' },
      { id: 18, name: 'Babycorn Pepper Dry', price: 30, description: 'Sweet Corn Salad' },
     ],
    'Curry/Gravy': [
      { id: 19, name: 'Veg Kholapuri', price: 90, description: '' },
      { id: 20, name: 'Paneer Butter Masala', price: 100, description: 'Cottage cheese in rich tomato gravy' },
      { id: 21, name: 'Dal Makhani', price: 100, description: 'Creamy black lentils' },
      { id: 22, name: 'Aalu Channa Masala', price: 100, description: '' }
    ],
    'Flavoured Rice': [
      { id: 23, name: 'Veg Dum Biryani', price: 100, description: 'Aromatic rice with spiced Vegetables' },
      { id: 24, name: 'Ghee Rice', price: 100, description: '' },
      { id: 25, name: 'Vegetable Pulao', price: 100, description: 'Rice cooked with vegetables' },
      { id: 26, name: 'Bisibelebath', price: 100, description: '' }
    ],
    'Breads/Roti': [
      { id: 27, name: 'Naan', price: 60, description: 'Soft leavened bread' },
      { id: 28, name: 'Roti', price: 40, description: 'Whole wheat flatbread' },
      { id: 29, name: 'Poori', price: 20, description: '' },
      { id: 30, name: 'Akki Rotti', price: 20, description: '' },
      { id: 31, name: 'Ragi Rotti', price: 20, description: '' },
    ],
     'Sambar': [
      { id: 32, name: 'Nuggekaiyi Sambar', price: 60, description: '' },
      { id: 33, name: 'Andra Pappu', price: 60, description: '' },
      { id: 34, name: 'Soppina Huli', price: 60, description: '' },
    ],
     'Rasam': [
      { id: 32, name: 'Tomato Rasam', price: 60, description: '' },
      { id: 33, name: 'Mysore Rasam', price: 60, description: '' },
      { id: 34, name: 'Carrot Rasam', price: 60, description: '' },
    ],
    'Desserts': [
      { id: 32, name: 'Gulab Jamun', price: 80, description: 'Milk dumplings in sugar syrup' },
      { id: 33, name: 'Ras Malai', price: 100, description: 'Cottage cheese in sweetened milk' },
      { id: 34, name: 'Ice Cream', price: 60, description: 'Vanilla, chocolate, strawberry' },
    ],
    'Beverages': [
      { id: 36, name: 'Masala Chai', price: 50, description: 'Spiced tea with milk' },
      { id: 37, name: 'Coffee', price: 60, description: 'Freshly brewed coffee' },
      { id: 38, name: 'Cold Coffee', price: 80, description: 'Iced coffee with cream' },
      { id: 39, name: 'Fresh Juice', price: 100, description: 'Seasonal fresh fruit juice' }
    ]
  }

  const addToCart = (item) => {
    const existingItem = selectedItems.find(selectedItem => selectedItem.id === item.id)
    if (existingItem) {
      setSelectedItems(selectedItems.map(selectedItem =>
        selectedItem.id === item.id
          ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
          : selectedItem
      ))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    const existingItem = selectedItems.find(selectedItem => selectedItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      setSelectedItems(selectedItems.map(selectedItem =>
        selectedItem.id === itemId
          ? { ...selectedItem, quantity: selectedItem.quantity - 1 }
          : selectedItem
      ))
    } else {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== itemId))
    }
  }

  const removeItemCompletely = (itemId) => {
    setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== itemId))
  }

  const getTotalPrice = () => {
    const itemsTotal = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const packagesTotal = cartPackages.reduce((total, pkg) => total + (pkg.price * pkg.quantity), 0)
    return itemsTotal + packagesTotal
  }

  const navigateCategory = (direction) => {
    if (direction === 'left' && selectedCategory > 0) {
      setSelectedCategory(selectedCategory - 1)
    } else if (direction === 'right' && selectedCategory < categories.length - 1) {
      setSelectedCategory(selectedCategory + 1)
    }
  }

  const selectPackage = (packageType) => {
    setSelectedPackage(packageType)
    // Clear individual items when package is selected
    setSelectedItems([])
  }

  const addPackageToCart = (packageType) => {
    const existingPackage = cartPackages.find(pkg => pkg.type === packageType)
    if (existingPackage) {
      setCartPackages(cartPackages.map(pkg =>
        pkg.type === packageType
          ? { ...pkg, quantity: pkg.quantity + 1 }
          : pkg
      ))
    } else {
      setCartPackages([...cartPackages, { 
        type: packageType, 
        name: packageData[packageType].name,
        price: packageData[packageType].price,
        quantity: 1 
      }])
    }
  }

  const removePackageFromCart = (packageType) => {
    const existingPackage = cartPackages.find(pkg => pkg.type === packageType)
    if (existingPackage && existingPackage.quantity > 1) {
      setCartPackages(cartPackages.map(pkg =>
        pkg.type === packageType
          ? { ...pkg, quantity: pkg.quantity - 1 }
          : pkg
      ))
    } else {
      setCartPackages(cartPackages.filter(pkg => pkg.type !== packageType))
    }
  }

  const removePackageCompletely = (packageType) => {
    setCartPackages(cartPackages.filter(pkg => pkg.type !== packageType))
  }

  const openPackageModal = (packageType) => {
    setModalPackageType(packageType)
    setShowPackageModal(true)
  }

  const closePackageModal = () => {
    setShowPackageModal(false)
    setModalPackageType(null)
  }

  const addPackageItemToCart = (item) => {
    const existingItem = selectedItems.find(selectedItem => selectedItem.id === item.id)
    if (existingItem) {
      setSelectedItems(selectedItems.map(selectedItem =>
        selectedItem.id === item.id
          ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
          : selectedItem
      ))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const handleBookNow = () => {
    navigate("/pay", {
      state: {
        amount: getTotalPrice(),
        merchantName: "Booking Website",
        description: `Menu booking for ${selectedItems.length + cartPackages.length} items`,
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        customerPhone: "9999999999",
        selectedItems: selectedItems,
        cartPackages: cartPackages,
        totalPrice: getTotalPrice()
      },
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2">
      <style jsx>{`
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
        .package-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
        }
        .package-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }
        .menu-item-card {
          transition: all 0.2s ease-in-out;
        }
        .menu-item-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Our Menu
          </h1>
          <p className="text-gray-600">Select your favorite dishes from our delicious menu</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Package Selection - Top Row */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900">Choose a Package</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Classic Package */}
            <div className={`package-card border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
              selectedPackage === 'classic' 
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300'
            }`} onClick={() => selectPackage('classic')}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Classic Package</h3>
                  <p className="text-sm text-gray-600">Perfect for casual dining</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-blue-600">₹450</span>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Included Items:
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  {packageData.classic.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-gray-600 bg-white rounded p-1">
                      <FiCheck className="w-2 h-2 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openPackageModal('classic')
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-300"
                >
                  <FiEye className="w-4 h-4" />
                  View More
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addPackageToCart('classic')
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add Package
                </button>
                {selectedPackage === 'classic' && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium px-3 py-2 bg-green-100 rounded-lg">
                    <FiCheck className="w-4 h-4" />
                    Selected
                  </div>
                )}
              </div>
            </div>

            {/* Gold Package */}
            <div className={`package-card border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
              selectedPackage === 'gold' 
                ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md' 
                : 'border-gray-200 hover:border-yellow-300'
            }`} onClick={() => selectPackage('gold')}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Gold Package</h3>
                  <p className="text-sm text-gray-600">Premium dining experience</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-yellow-600">₹500</span>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Included Items:
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  {packageData.gold.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-gray-600 bg-white rounded p-1">
                      <FiCheck className="w-2 h-2 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openPackageModal('gold')
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-300"
                >
                  <FiEye className="w-4 h-4" />
                  View More
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addPackageToCart('gold')
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add Package
                </button>
                {selectedPackage === 'gold' && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium px-3 py-2 bg-green-100 rounded-lg">
                    <FiCheck className="w-4 h-4" />
                    Selected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Menu Items and Cart Side by Side */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Customize Your Menu</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Section - Selected Items (Cart) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-base font-bold text-gray-900">Your Cart</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              
              {selectedItems.length === 0 && cartPackages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-1">Add items from the menu or choose a package</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {/* Packages */}
                  {cartPackages.map((pkg) => (
                    <div key={pkg.type} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">{pkg.name}</h4>
                        <p className="text-xs text-gray-600">₹{pkg.price} per person</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-white border border-gray-300 rounded p-1 shadow-sm">
                          <button
                            onClick={() => removePackageFromCart(pkg.type)}
                            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Decrease quantity"
                            disabled={pkg.quantity <= 1}
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-gray-900 min-w-[24px] text-center text-xs">
                            {pkg.quantity}
                          </span>
                          <button
                            onClick={() => addPackageToCart(pkg.type)}
                            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Increase quantity"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removePackageCompletely(pkg.type)}
                          className="p-1 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                          title="Remove package completely"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Individual Items */}
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-white border border-gray-300 rounded p-1 shadow-sm">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-gray-900 min-w-[24px] text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Increase quantity"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItemCompletely(item.id)}
                          className="p-1 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                          title="Remove item completely"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total:</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{getTotalPrice()}/Pax
                        </span>
                      </div>
                    </div>
                    <button onClick={handleBookNow} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-bold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Menu Categories and Items */}
          <div className="lg:col-span-2">
            {/* Category Navigation */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-100">
              <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">Menu Categories</h3>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigateCategory('left')}
                  disabled={selectedCategory === 0}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex space-x-2 overflow-x-auto category-scroll px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(index)}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 text-sm ${
                        selectedCategory === index
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => navigateCategory('right')}
                  disabled={selectedCategory === categories.length - 1}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">
                  {categories[selectedCategory]}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {menuData[categories[selectedCategory]]?.map((item) => {
                  const cartItem = selectedItems.find(selectedItem => selectedItem.id === item.id)
                  const quantity = cartItem ? cartItem.quantity : 0
                  
                  return (
                    <div key={item.id} className={`menu-item-card border rounded-lg p-3 ${
                      quantity > 0 ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                          <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                          {quantity > 0 && (
                            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              <FiShoppingCart className="w-2 h-2" />
                              {quantity} {quantity === 1 ? 'item' : 'items'}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                            <p className="text-xs text-gray-500">each</p>
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Modal */}
      {showPackageModal && modalPackageType && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {packageData[modalPackageType].name} - Additional Items
                </h2>
              </div>
              <button
                onClick={closePackageModal}
                className="p-3 rounded-full hover:bg-gray-200 transition-colors bg-white shadow-md"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-4">
                {packageData[modalPackageType].additionalItems.map((item) => {
                  const cartItem = selectedItems.find(selectedItem => selectedItem.id === item.id)
                  const quantity = cartItem ? cartItem.quantity : 0
                  
                  return (
                    <div key={item.id} className={`menu-item-card border rounded-xl p-5 transition-all duration-200 ${
                      quantity > 0 ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2">{item.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                          {quantity > 0 && (
                            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                              <FiShoppingCart className="w-3 h-3" />
                              {quantity} {quantity === 1 ? 'item' : 'items'} in cart
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 ml-6">
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                            <p className="text-xs text-gray-500">per item</p>
                          </div>
                          <button
                            onClick={() => addPackageItemToCart(item)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <FiPlus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Footer - Fixed at bottom */}
            <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0 rounded-b-2xl">
              <div className="flex gap-4">
                <button
                  onClick={closePackageModal}
                  className="flex-1 bg-gray-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    addPackageToCart(modalPackageType)
                    closePackageModal()
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Add Complete Package to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
