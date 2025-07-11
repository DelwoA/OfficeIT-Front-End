import React, { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import EditProductModal from "@/components/EditProductModal";
import CategoryManagementModal from "@/components/CategoryManagementModal";
import FeaturedProductsInfoModal from "@/components/FeaturedProductsInfoModal";
import { products, saveProducts, getProducts } from "@/data/products";
import { SignedIn } from "@clerk/clerk-react";

const AdminPage = () => {
  const [productList, setProductList] = useState(getProducts);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Add a separate categories state to manage all available categories
  const [availableCategories, setAvailableCategories] = useState(() => {
    // Initialize with categories from current products (including localStorage)
    const currentProducts = getProducts();
    const existingCategories = [
      ...new Set(currentProducts.map((product) => product.category)),
    ];
    return existingCategories;
  });

  const handleDeleteProduct = (id) => {
    const updatedList = productList.filter((product) => product.id !== id);
    setProductList(updatedList);
    saveProducts(updatedList);
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditCategories = () => {
    setIsCategoryModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
  };

  const handleAddNewProduct = (newProduct) => {
    setProductList((prev) => {
      const updatedList = [...prev, newProduct];
      saveProducts(updatedList);
      return updatedList;
    });

    // Also add the category to available categories if it's not already there
    if (!availableCategories.includes(newProduct.category)) {
      setAvailableCategories((prev) => [...prev, newProduct.category]);
    }

    // Show success message or toast here if needed
  };

  const handleEditProductSave = (updatedProduct) => {
    setProductList((prev) => {
      const updatedList = prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      saveProducts(updatedList);
      return updatedList;
    });

    // Also add the category to available categories if it's not already there
    if (!availableCategories.includes(updatedProduct.category)) {
      setAvailableCategories((prev) => [...prev, updatedProduct.category]);
    }

    // Show success message or toast here if needed
  };

  const handleUpdateCategories = (updatedCategories) => {
    // Update the available categories state with the new categories
    const categoryNames = updatedCategories.map((cat) => cat.name);
    setAvailableCategories(categoryNames);

    // If a category was renamed, update all products with that category
    // This is a placeholder - in a real app, you'd handle this more robustly
    const oldCategories = [...new Set(productList.map((p) => p.category))];
    const newCategoryNames = updatedCategories.map((c) => c.name);

    // For now, we'll just log the change
    // In a real implementation, you'd update products when categories are renamed
    console.log("Categories updated:", updatedCategories);
  };

  const handleToggleFeatured = (productId) => {
    setProductList((prev) => {
      const updatedList = prev.map((product) =>
        product.id === productId
          ? { ...product, featured: !product.featured }
          : product
      );
      // Save to localStorage whenever featured status changes
      saveProducts(updatedList);
      return updatedList;
    });
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
        <AdminHeader
          onAddProduct={handleAddProduct}
          onEditCategories={handleEditCategories}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:pt-8 pb-28">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
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
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                    <span className="text-yellow-600 font-semibold text-sm">
                      ★
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Featured</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {productList.filter((p) => p.featured).length}
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
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Product Management
                    </h2>
                    <FeaturedProductsInfoModal />
                  </div>
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
                  onEditProduct={handleEditProduct}
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onToggleFeatured={handleToggleFeatured}
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
          products={productList}
          availableCategories={availableCategories}
        />

        {/* Edit Product Modal */}
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          onEditProduct={handleEditProductSave}
          product={selectedProduct}
          availableCategories={availableCategories}
        />

        {/* Category Management Modal */}
        <CategoryManagementModal
          isOpen={isCategoryModalOpen}
          onClose={handleCategoryModalClose}
          products={productList}
          onUpdateCategories={handleUpdateCategories}
        />
      </div>
    </SignedIn>
  );
};

export default AdminPage;
