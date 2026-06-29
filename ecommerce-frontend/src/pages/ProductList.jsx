import { useEffect, useState, useContext } from "react";
import { getAllProducts } from "../api/productApi";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { handleAddToCart, handleAddToWishlist } from "../utils/productAction";
import { AuthContext } from "../context/AuthContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loader state
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user?.token;

  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  // useEffect(() => {
  //   setLoading(true); // start loader
  //   getAllProducts()
  //     .then((data) => {
  //       const activeProducts = data.filter(p => p.active);
  //       if (searchQuery) {
  //         const filtered = activeProducts.filter(p =>
  //           p.name.toLowerCase().includes(searchQuery) ||
  //           p.description.toLowerCase().includes(searchQuery) ||
  //           (p.category && p.category.toLowerCase().includes(searchQuery))
  //         );
  //         setProducts(filtered);
  //       } else {
  //         setProducts(activeProducts);
  //       }
  //     })
  //     .catch(err => console.error("Error fetching products:", err))
  //     .finally(() => setLoading(false)); // stop loader
  // }, [searchQuery]);
useEffect(() => {
  setLoading(true); // start loader

  getAllProducts()
    .then((data) => {
      if (!data || !Array.isArray(data)) {
        console.error("Products data is invalid:", data);
        setProducts([]); // fallback to empty array
        return;
      }

      const activeProducts = data.filter(p => p.active);

      if (searchQuery) {
        const filtered = activeProducts.filter(p =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.description.toLowerCase().includes(searchQuery) ||
          (p.category && p.category.toLowerCase().includes(searchQuery))
        );
        setProducts(filtered);
      } else {
        setProducts(activeProducts);
      }
    })
    .catch(err => {
      console.error("Error fetching products:", err);
      setProducts([]); // fallback to empty array
    })
    .finally(() => setLoading(false)); // stop loader
}, [searchQuery]);

  const handleAuthAction = (action, product) => {
    if (isLoggedIn) {
      action(product);
    } else {
      navigate("/login");
    }
  };

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="bg-white shadow-md rounded-xl p-5 w-72 flex flex-col gap-2 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded mb-2"></div>
      <div className="h-10 bg-gray-200 rounded mb-2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🛍️ Explore Our Products
        </motion.h1>
        <p className="text-gray-500 mt-2">Find the best deals on your favorite items</p>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {loading ? (
          // Show 6 skeletons while loading
          Array.from({ length: 6 }).map((_, idx) => <ProductSkeleton key={idx} />)
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-xl mt-10">No products found 😔</p>
        ) : (
          products.map(product => (
            <motion.div
              key={product.productCode}
              className="bg-white shadow-md rounded-xl p-5 w-72 flex flex-col justify-between hover:shadow-xl transition-transform"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/product/${product.productCode}`}>
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                </div>

                <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-gray-900 font-bold text-lg">₹{product.price}</p>
              </Link>

              {/* Buy Now */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/checkout", { state: { type: "buyNow", products: [product] } });
                  } else {
                    navigate("/login");
                  }
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-green-700 transition mt-2"
              >
                ⚡ Buy Now
              </motion.button>

              {/* Add to Cart */}
              <motion.button
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAuthAction(handleAddToCart, product)}
              >
                Add to Cart
              </motion.button>

              {/* Add to Wishlist */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleAuthAction(handleAddToWishlist, product)}
                className="border border-indigo-600 text-indigo-600 px-4 py-3 my-2 rounded-lg font-medium hover:bg-indigo-50 transition"
              >
                ❤️ Add to Wishlist
              </motion.button>

             
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ProductList;
