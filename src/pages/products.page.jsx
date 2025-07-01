import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { products } from "@/data/products";

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const maxPrice = Math.max(...products.map((product) => product.price));

  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategory && product.category !== selectedCategory) return false;
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;
    // Filter by availability
    if (
      availabilityFilter.length > 0 &&
      !availabilityFilter.includes(product.availability)
    )
      return false;
    return true;
  });

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    const newUrl = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    window.history.replaceState({}, "", newUrl);
  }, [selectedCategory]);

  useEffect(() => {
    // Set max price range on component mount
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-7 md:px-12 pt-9 pb-32">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Our Products
        </h1>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Filter size={18} />
              <span className="font-medium">Filter Products</span>
            </button>
          </div>

          {/* Desktop Sidebar */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="hidden md:block sticky top-20">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                maxPrice={maxPrice}
                availabilityFilter={availabilityFilter}
                onAvailabilityChange={setAvailabilityFilter}
                isMobileOpen={false}
                onMobileClose={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>

          {/* Mobile Sidebar */}
          {isMobileFilterOpen && (
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setIsMobileFilterOpen(false);
              }}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
              availabilityFilter={availabilityFilter}
              onAvailabilityChange={setAvailabilityFilter}
              isMobileOpen={isMobileFilterOpen}
              onMobileClose={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Product Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Results count */}
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
                {selectedCategory && (
                  <span className="ml-1">in "{selectedCategory}"</span>
                )}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg sm:text-xl font-medium mb-3">
                    No products found
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, maxPrice]);
                      setAvailabilityFilter([]);
                    }}
                    className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
