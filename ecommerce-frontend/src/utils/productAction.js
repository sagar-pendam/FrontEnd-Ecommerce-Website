import { addToCart } from "../api/cartApi";
import { addToFavorites } from "../api/favoriteApi";
import { toast } from "react-toastify";

export const handleAddToCart = async (product) => {
  const userId = localStorage.getItem("userId") || 1;
  const cartItem = {
    userId,
    productId: product.id,
    productName: product.productName || product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    productCode: product.productCode,
    quantity: 1,
  };

  try {
    await addToCart(cartItem);
    toast.success(`${product.productName || product.name} added to cart 🛒`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add item to cart.");
  }
};

export const handleAddToWishlist = async (product) => {
  const userId = localStorage.getItem("userId") || 1;
  const favorite = {
    userId,
    productId: product.id,
    productCode: product.productCode,
    productName: product.productName || product.name,
    productImage: product.imageUrl,
    productPrice: product.price,
    category: product.category,
  };

  try {
    await addToFavorites(favorite);
    toast.success("Added to wishlist ❤️");
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    toast.error("Failed to add to wishlist.");
  }
};
