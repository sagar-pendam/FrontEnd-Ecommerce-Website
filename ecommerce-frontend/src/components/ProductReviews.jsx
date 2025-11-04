import React, { useEffect, useState } from "react";
import { getReviewsByProductId } from "../api/reviewService";
const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProductId(productId);
        setReviews(data);
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="border p-3 rounded bg-gray-50">
              <p className="font-medium">{r.userName || "Anonymous"}</p>
              <p>{r.comment}</p>
              <p className="text-yellow-500">⭐ {r.rating}/5</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductReviews;
