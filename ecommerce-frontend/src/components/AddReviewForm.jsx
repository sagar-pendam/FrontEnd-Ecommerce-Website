import React, { useState } from "react";
import { addReview } from "../api/reviewService";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Check if user is logged in
    if (!userId) {
      alert("Please log in to submit a review.");
      navigate("/login"); // redirect to login page
      return;
    }

    try {
      //  Prepare review data
      const reviewData = {
        productId,
        rating,
        comment,
      };

      //  Submit review
      const response = await addReview(reviewData, userId);
       toast.success("Review submitted successfully!");
      console.log(response);

      setComment("");
    } catch (error) {
      toast.error("Failed to submit review!");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-md w-full max-w-md bg-white"
    >
      <h3 className="text-lg font-semibold mb-3">Write a Review</h3>

      <label className="block mb-2">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="ml-2 border p-1 rounded"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
      </label>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
        className="border w-full p-2 rounded mb-3"
        rows={3}
        required
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
