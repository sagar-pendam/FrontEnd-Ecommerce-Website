import React from "react";
import { deleteReview } from "../api/reviewApi";
import { toast } from "react-hot-toast";

const ProductReviews = ({ reviews, setReviews }) => {
  const userId = localStorage.getItem("userId");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete your review?")) return;
    try {
      await deleteReview(id);
      setReviews(reviews.filter(r => r.id !== id));
      toast.success("Review deleted!");
    } catch {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-2">Customer Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map(r => (
        <div key={r.id} className="border-b py-2 flex justify-between">
          <div>
            <p>★ {r.rating} / 5</p>
            <p>{r.comment}</p>
            <p className="text-xs text-gray-400">User ID: {r.userId}</p>
          </div>
          {Number(userId) === Number(r.userId) && (
            <button onClick={() => handleDelete(r.id)} className="text-red-500">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
