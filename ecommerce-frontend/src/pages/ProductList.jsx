import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../api/cartApi";
import { addToFavorites } from "../api/favoriteApi";
import { handleAddToCart,handleAddToWishlist } from "../utils/productAction";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);


  

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-10">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🛍️ Explore Our Products
        </motion.h1>
        <p className="text-gray-500 mt-2">
          Find the best deals on your favorite items
        </p>
      </div>

      {/* Product Container (Flexbox) */}
      <motion.div
        className="flex flex-wrap justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.productCode}
            className="bg-white shadow-md rounded-xl p-5 w-72 flex flex-col justify-between hover:shadow-xl transition-transform"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}

            whileHover={{ scale: 1.05 }}
          >
            {/* Clickable Product Area */}
            <Link to={`/product/${product.productCode}`}>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg"
                />
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
              <p className="text-gray-900 font-bold text-lg">
                ₹{product.price}
              </p>
            </Link>

            {/* Add to Cart Button */}
            <motion.button
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
              whileTap={{ scale: 0.95 }}
              onClick={() => { handleAddToCart(product) }}
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={()=>{handleAddToWishlist(product)}}
              className="border border-indigo-600 text-indigo-600 px-4 py-3 my-2 rounded-lg font-medium hover:bg-indigo-50 transition"
            >
              ❤️ Add to Wishlist
            </motion.button>

          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductList;
