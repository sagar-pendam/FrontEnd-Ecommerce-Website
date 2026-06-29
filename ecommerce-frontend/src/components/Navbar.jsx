import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Home, Boxes, BringToFront, Heart, Menu, X, Search } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const token = user?.token;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
const handleLogout = () => {
  logout();        // clears user and localStorage
  navigate("/");   // redirect to home page
};
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const commonLinks = (
    <>
      <Link to="/" className="flex items-center gap-1 hover:text-blue-600 font-medium transition-colors duration-200">
        <Home size={18} /> Home
      </Link>
      <Link to="/products" className="flex items-center gap-1 hover:text-blue-600 font-medium transition-colors duration-200">
        <Boxes size={18} /> Products
      </Link>
    </>
  );

  const loggedInLinks = (
    <>
      <Link to="/cart" className="flex items-center gap-1 hover:text-blue-600 font-medium transition-colors duration-200">
        <ShoppingCart size={18} /> Cart
      </Link>
      <Link to="/wishlist" className="flex items-center gap-1 hover:text-blue-600 font-medium transition-colors duration-200">
        <Heart size={18} /> Wishlist
      </Link>
      <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600 font-medium transition-colors duration-200">
        <User size={18} /> Profile
      </Link>
      <Link to="/orders" className="flex items-center gap-1 hover:text-blue-600 font-medium transition-colors duration-200">
        <BringToFront size={18} /> My Orders
      </Link>
      <button onClick={handleLogout} className="text-red-600 font-medium hover:underline transition-colors duration-200">Logout</button>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/login" className="hover:text-blue-600 font-medium transition-colors duration-200">Login</Link>
      <Link to="/register" className="hover:text-blue-600 font-medium transition-colors duration-200">Register</Link>
    </>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
          ShopEase
        </Link>

        {/* Desktop Links + Search */}
        <div className="hidden md:flex items-center space-x-6">
          {commonLinks}
          {token ? loggedInLinks : guestLinks}

          {/* Enhanced Desktop Search */}
          <div className="relative ml-4">
            <form onSubmit={handleSearch} className="relative">
              <div className={`
                relative flex items-center transition-all duration-300
                ${searchFocused ? 'w-80' : 'w-64'}
                bg-gray-50 rounded-xl overflow-hidden border-2
                ${searchFocused ? 'border-blue-500 bg-white shadow-lg' : 'border-gray-200 hover:border-gray-300'}
              `}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full px-4 py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  className={`
                    flex items-center justify-center px-4 h-full transition-all duration-300 py-4
                    ${searchQuery ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                    hover:bg-blue-700 hover:text-white
                  `}
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          {commonLinks}
          {token ? loggedInLinks : guestLinks}

          {/* Enhanced Mobile Search */}
          <div className="mt-2">
            <form onSubmit={handleSearch}>
              <div className="relative flex items-center bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-lg transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  className={`
                    flex items-center justify-center px-4 h-full transition-all duration-300 py-4
                    ${searchQuery ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                    hover:bg-blue-700 hover:text-white
                  `}
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;