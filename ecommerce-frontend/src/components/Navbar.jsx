import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Home, Boxes, BringToFront, Heart } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // const { token, logout } = useContext(AuthContext); // use 'token' instead of 'user'
  const { user, logout } = useContext(AuthContext);
  const token = user?.token;
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
          >
            <Home size={18} className="mr-1" />
            Home
          </Link>

          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
          >
            <Boxes size={18} className="mr-1" />
            Products
          </Link>

          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
          >
            <ShoppingCart size={18} className="mr-1" />
            Cart
          </Link>

          {token && (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
              >
                <User size={18} className="mr-1" />
                Profile
              </Link>

              <Link
                to="/orders"
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
              >
                <BringToFront size={18} className="mr-1" />
                My Orders
              </Link>
              <Link to="/wishlist" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
  <Heart /> Wishlist
</Link>

            </>
          )}
        </div>

        {/* Auth Buttons (Right Side) */}
        <div className="flex items-center space-x-4">
          {token ? (
            <button
              onClick={logout}
              className="text-red-600 font-medium hover:underline"
            >
              Logout
            </button>

          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
