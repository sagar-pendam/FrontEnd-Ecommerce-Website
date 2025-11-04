import React from 'react'

const ProductCard = ({ product }) => (
    <div className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="font-semibold text-lg mt-3">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
      <p className="font-bold text-blue-600 mb-3">₹{product.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
  
  export default ProductCard;
  