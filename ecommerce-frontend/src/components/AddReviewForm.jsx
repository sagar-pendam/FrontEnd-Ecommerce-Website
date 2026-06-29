import React, { useState, useEffect } from "react";
import { addReview, updateReview, getUserReviewForProduct } from "../api/reviewApi";
import { toast } from "react-hot-toast";

const AddReviewForm = ({ productId, reviews, setReviews }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState(null);

  useEffect(() => {
    if (!userId) return;
    getUserReviewForProduct(productId, userId).then((data) => {
      if (data) {
        setRating(data.rating);
        setComment(data.comment);
        setReviewId(data.id);
      }
    });
  }, [productId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) return toast.error("Please select a rating");
    if (comment.trim() === "") return toast.error("Please write a comment");

    const reviewData = { userId, productCode: productId, rating, comment };

    try {
      let savedReview;
      if (reviewId) {
        savedReview = await updateReview(reviewId, reviewData);
        setReviews(reviews.map(r => r.id === reviewId ? savedReview : r));
        toast.success("Review updated!");
      } else {
        savedReview = await addReview(reviewData);
        setReviews([savedReview, ...reviews]);
        setReviewId(savedReview.id);
        toast.success("Review added!");
      }

      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  if (!token) return <p>Please login to write a review.</p>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <div className="flex space-x-2 mb-2">
        {[1,2,3,4,5].map(star => (
          <span
            key={star}
            className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
            onClick={() => setRating(star)}
          >★</span>
        ))}
      </div>
      <textarea
        className="border p-2 w-full rounded mb-2"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="bg-indigo-600 text-white py-2 px-4 rounded">
        {reviewId ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
};

export default AddReviewForm;
