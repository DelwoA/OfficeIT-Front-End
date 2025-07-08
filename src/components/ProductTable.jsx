import React, { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import DeleteConfirmation from "@/components/DeleteConfirmation";

const ProductTable = ({
  products,
  onDeleteProduct,
  onEditProduct,
  onSort,
  sortField,
  sortDirection,
}) => {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const handleRowClick = (productId) => {
    if (expandedProductId === productId) {
      // Collapse if already expanded
      setExpandedProductId(null);
    } else {
      // Expand this row (and collapse any other)
      setExpandedProductId(productId);
    }
  };

  const SortableHeader = ({ field, children, className = "" }) => {
    const isActive = sortField === field;
    const isDesc = isActive && sortDirection === "desc";

    return (
      <th
        scope="col"
        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none ${className}`}
        onClick={() => onSort(field)}
      >
        <div className="flex items-center justify-between group">
          <span>{children}</span>
          <ChevronDown
            size={14}
            className={`transform transition-transform duration-300 ease-in-out ${
              isActive
                ? isDesc
                  ? "rotate-180 text-purple-600"
                  : "rotate-0 text-purple-600"
                : "rotate-0 text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </div>
      </th>
    );
  };

  const ExpandedProductDetails = ({ product }) => (
    <tr className="bg-gray-50">
      <td colSpan="5" className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image and Basic Info */}
            <div className="space-y-4">
              <div className="aspect-square w-full max-w-md mx-auto lg:mx-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Product Details and Specifications */}
            <div className="space-y-6">
              {/* Price and Availability */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Pricing & Availability
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <div className="text-right">
                      {product.discount > 0 ? (
                        <div className="space-y-1">
                          <span className="line-through text-gray-500 text-sm">
                            ${product.price.toFixed(2)}
                          </span>
                          <div className="text-purple-600 font-bold text-lg">
                            ${product.discount.toFixed(2)}
                          </div>
                          <div className="text-xs text-green-600">
                            Save $
                            {(product.price - product.discount).toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-900 font-bold text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900 font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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

              {/* Technical Specifications */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Technical Specifications
                </h4>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start">
                      <span className="text-gray-600 capitalize flex-shrink-0 mr-4">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-gray-900 text-right flex-1">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product ID */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="text-gray-900 font-mono text-sm">
                    {product.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <SortableHeader field="name">Product</SortableHeader>
              <SortableHeader field="category">Category</SortableHeader>
              <SortableHeader field="price">Price</SortableHeader>
              <SortableHeader field="availability">Availability</SortableHeader>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <tr
                  className={`cursor-pointer transition-all duration-200 ease-in-out hover:bg-blue-50 hover:shadow-sm ${
                    expandedProductId === product.id
                      ? "bg-blue-100 shadow-md"
                      : ""
                  }`}
                  onClick={() => handleRowClick(product.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            {expandedProductId === product.id ? (
                              <ChevronUp
                                size={16}
                                className="text-gray-400 transition-transform duration-200"
                              />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-gray-400 transition-transform duration-200"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.discount > 0 ? (
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500 text-xs">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-purple-600 font-medium">
                            ${product.discount.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.availability === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : product.availability === "Out of Stock"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProduct(product);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4 p-1 hover:bg-blue-100 rounded transition-colors z-10 relative"
                    >
                      <Edit size={18} />
                    </button>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block"
                    >
                      <DeleteConfirmation
                        onConfirm={() => onDeleteProduct(product.id)}
                        itemName={product.name}
                      />
                    </div>
                  </td>
                </tr>
                {expandedProductId === product.id && (
                  <ExpandedProductDetails product={product} />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 ease-in-out ${
              expandedProductId === product.id
                ? "ring-2 ring-blue-200 shadow-md"
                : "hover:shadow-md hover:border-gray-300"
            }`}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => handleRowClick(product.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-md object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate flex items-center">
                        {product.name}
                        <div className="ml-2 flex-shrink-0">
                          {expandedProductId === product.id ? (
                            <ChevronUp
                              size={16}
                              className="text-gray-400 transition-transform duration-200"
                            />
                          ) : (
                            <ChevronDown
                              size={16}
                              className="text-gray-400 transition-transform duration-200"
                            />
                          )}
                        </div>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProduct(product);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <div onClick={(e) => e.stopPropagation()}>
                        <DeleteConfirmation
                          onConfirm={() => onDeleteProduct(product.id)}
                          itemName={product.name}
                        >
                          <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </DeleteConfirmation>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">
                      {product.discount > 0 ? (
                        <div className="flex items-center space-x-2">
                          <span className="line-through text-gray-500 text-xs">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-purple-600 font-medium">
                            ${product.discount.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
            </div>

            {/* Mobile Expanded Content */}
            {expandedProductId === product.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50 transition-all duration-300 ease-in-out">
                <div className="space-y-6">
                  {/* Product Image and Basic Info */}
                  <div className="text-center">
                    <div className="aspect-square w-48 mx-auto mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Mobile Product Details */}
                  <div className="space-y-4">
                    {/* Price and Availability */}
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Pricing & Availability
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <div className="text-right">
                            {product.discount > 0 ? (
                              <div>
                                <div className="line-through text-gray-500">
                                  ${product.price.toFixed(2)}
                                </div>
                                <div className="text-purple-600 font-bold">
                                  ${product.discount.toFixed(2)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-900 font-bold">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="text-gray-900">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Specifications
                      </h4>
                      <div className="space-y-1 text-xs">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-gray-900 text-right ml-2">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductTable;
