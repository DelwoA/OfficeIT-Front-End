import { Edit, Trash2, ChevronDown } from "lucide-react";
import DeleteConfirmation from "@/components/DeleteConfirmation";

const ProductTable = ({
  products,
  onDeleteProduct,
  onSort,
  sortField,
  sortDirection,
}) => {
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
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
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
                  <button className="text-blue-600 hover:text-blue-900 mr-4 p-1 hover:bg-blue-50 rounded">
                    <Edit size={18} />
                  </button>
                  <DeleteConfirmation
                    onConfirm={() => onDeleteProduct(product.id)}
                    itemName={product.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
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
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex space-x-2 ml-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                      <Edit size={16} />
                    </button>
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
        ))}
      </div>
    </>
  );
};

export default ProductTable;
