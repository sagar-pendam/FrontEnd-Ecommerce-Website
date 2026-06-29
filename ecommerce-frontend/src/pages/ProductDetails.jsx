import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { handleAddToCart, handleAddToWishlist } from "../utils/productAction";
import ProductReviews from "../components/ProductReviews";
import AddReviewForm from "../components/AddReviewForm";
import { getReviewsByProduct } from "../api/reviewApi";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const ProductDetails = () => {
  const { id } = useParams();
  const productId = id;
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Check if user is logged in
  const isLoggedIn = !!user?.token;

  // Fetch product details
  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    getReviewsByProduct(productId)
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [productId]);

  // Helper to handle actions requiring login
  const handleAuthAction = (action) => {
    if (isLoggedIn) {
      action();
    } else {
      navigate("/login");
    }
  };

  if (!product) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen text-gray-500 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading product details...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-6 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg grid md:grid-cols-2 gap-10 p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Image */}
        <motion.div
          className="flex justify-center items-center bg-gray-100 rounded-xl p-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <img
            src={product.imageUrl || "https://via.placeholder.com/300"}
            alt={product.productName}
            className="rounded-lg object-contain h-80"
          />
        </motion.div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-4">
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.productName}
          </motion.h1>

          <motion.p
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.description || "No description available for this product."}
          </motion.p>

          <motion.p
            className="text-3xl font-semibold text-indigo-600"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            ₹{product.price}
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                handleAuthAction(() =>
                  navigate("/checkout", { state: { type: "buyNow", products: [product] } })
                )
              }
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-green-700 transition"
            >
              ⚡ Buy Now
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleAuthAction(() => handleAddToCart(product))}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-indigo-700 transition"
            >
              🛒 Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleAuthAction(() => handleAddToWishlist(product))}
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
            >
              ❤️ Add to Wishlist
            </motion.button>
          </div>

          {/* Review Components */}
          {isLoggedIn ? (
            <AddReviewForm productId={productId} reviews={reviews} setReviews={setReviews} />
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>
                Login
              </span>{" "}
              to write a review.
            </p>
          )}

          <ProductReviews reviews={reviews} setReviews={setReviews} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
