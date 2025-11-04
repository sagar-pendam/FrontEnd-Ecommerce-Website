import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { getUserFavorites, removeFromFavorites } from "../api/favoriteApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await getUserFavorites(userId);
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromFavorites(userId, productId);
      toast.info("Removed from wishlist 💔");
      loadFavorites();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-10 px-6 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Heart className="text-red-500" /> Your Wishlist
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-lg">Your wishlist is empty 💔</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <motion.div
              key={fav.productId}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/product/${fav.productCode}`}>
                <img
                  src={fav.productImage}
                  alt={fav.productName}
                  className="h-48 w-full object-cover rounded-lg mb-3"
                />
                <h2 className="font-semibold text-lg">{fav.productName}</h2>
                <p className="text-gray-600">₹{fav.productPrice}</p>
              </Link>

              <div className="flex justify-between mt-4">
                <Link to={`/product/${fav.productCode}`}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                  >
                    View Product
                  </motion.button>
                </Link>

                <motion.button
                  onClick={() => handleRemove(fav.productId)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-red-100"
                >
                  <Trash2 className="text-red-500" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FavoritePage;
