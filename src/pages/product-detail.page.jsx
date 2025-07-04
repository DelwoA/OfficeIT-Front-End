import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Check,
  AlertTriangle,
  Search,
  ArrowRight,
  Package,
} from "lucide-react";
import { products } from "@/data/products";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  // Product Not Found Page
  if (!product) {
    return (
      <div className="bg-gray-50 flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Icon Section */}
          <div className="text-center">
            <div className="mx-auto h-24 w-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Package className="h-12 w-12 text-purple-600" />
            </div>

            {/* Main Content */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sorry, we couldn't find the product you're looking for. It may
              have been removed or the link might be incorrect.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/products"
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity group"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse All Products
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/"
              className="w-full flex items-center justify-center px-6 py-3 text-purple-700 font-medium rounded-md hover:bg-purple-50 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              If you believe this is an error or need assistance finding a
              specific product, please contact our support team.
            </p>
            {/* TODO: Include the navigation to the contact page for support. This is the Product Not Found Page. */}
            <Link
              to="#"
              className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors"
            >
              Contact Support
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availabilityColor =
    product.availability === "In Stock"
      ? "text-green-600"
      : product.availability === "Out of Stock"
      ? "text-red-600"
      : "text-yellow-600";

  const availabilityIcon =
    product.availability === "In Stock" ? (
      <Check className="h-5 w-5" />
    ) : (
      <AlertTriangle className="h-5 w-5" />
    );

  // Product Detail Page
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:pt-12 lg:pb-28">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-700 hover:text-purple-900 mb-6 lg:mb-9 transition-colors group"
      >
        <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-0.5 transition-transform duration-300 ease-in-out" />
        <span className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out">
          Back to Products
        </span>
      </button>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="lg:flex">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-80 lg:h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {product.category.toLowerCase()}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.discount > 0 ? (
                  <div className="flex flex-col items-end">
                    <span className="line-through text-gray-500 text-lg sm:text-xl">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-purple-600">
                      ${product.discount.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center mb-6">
              <div className={`flex items-center ${availabilityColor} mr-2`}>
                {availabilityIcon}
              </div>
              <span className={`font-medium ${availabilityColor}`}>
                {product.availability}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg font-medium mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row">
                    <span className="font-medium text-gray-700 sm:mr-2 capitalize">
                      {key}:
                    </span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-16 mb-4">
              <Link
                to="#"
                className="w-full sm:w-auto text-center px-6 py-3 bg-transparent border border-purple-700 text-purple-700 rounded-md font-medium hover:bg-purple-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
