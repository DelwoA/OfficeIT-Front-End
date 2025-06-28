import { Link } from "react-router-dom";

const FeaturedProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="group h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        <div className="h-40 sm:h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm sm:text-lg font-medium text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1 flex-1 mr-2">
              {product.name}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap">
              {product.category}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                product.availability === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : product.availability === "Out of Stock"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {product.availability}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProductCard;
