import React, { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import { products } from "@/data/products";
import { SignedIn } from "@clerk/clerk-react";

const AdminPage = () => {
  const [productList, setProductList] = useState(products);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddNewProduct = (newProduct) => {
    setProductList((prev) => [...prev, newProduct]);
    // Show success message or toast here if needed
  };

  const handleSort = (field) => {
    let direction = "asc";

    // If clicking the same field, toggle direction
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }

    setSortField(field);
    setSortDirection(direction);

    // Sort the product list
    const sortedProducts = [...productList].sort((a, b) => {
      let aValue, bValue;

      switch (field) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case "price":
          // Use discount price if available, otherwise regular price
          aValue = a.discount > 0 ? a.discount : a.price;
          bValue = b.discount > 0 ? b.discount : b.price;
          break;
        case "availability":
          // In Stock = 1, Out of Stock = 0 for ascending (In Stock first)
          aValue = a.availability === "In Stock" ? 1 : 0;
          bValue = b.availability === "In Stock" ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (field === "price") {
        // Numerical comparison for price
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      } else if (field === "availability") {
        // For availability, desc means Out of Stock first
        return direction === "asc" ? bValue - aValue : aValue - bValue;
      } else {
        // String comparison for name and category
        if (direction === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      }
    });

    setProductList(sortedProducts);
  };

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader onAddProduct={handleAddProduct} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:pt-8 pb-28">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      P
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Products
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {productList.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      ✓
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">In Stock</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      productList.filter((p) => p.availability === "In Stock")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                    <span className="text-red-600 font-semibold text-sm">
                      ✗
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Out of Stock
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      productList.filter(
                        (p) => p.availability === "Out of Stock"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      %
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">On Sale</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {productList.filter((p) => p.discount > 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Product Management Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    Product Management
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage your product inventory and details
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:hidden">
                  <button
                    onClick={handleAddProduct}
                    className="w-full flex items-center justify-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 text-sm font-medium"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {productList.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m6 0h8"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No products
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding a new product.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={handleAddProduct}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              ) : (
                <ProductTable
                  products={productList}
                  onDeleteProduct={handleDeleteProduct}
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              )}
            </div>
          </div>
        </div>

        {/* Add Product Modal */}
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onAddProduct={handleAddNewProduct}
        />
      </div>
    </SignedIn>
  );
};

export default AdminPage;
