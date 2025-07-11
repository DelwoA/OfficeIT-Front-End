import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import { getFeaturedProducts } from "@/data/products";

const FeaturedProductsSection = () => {
  const featuredProducts = getFeaturedProducts();

  // Only show featured section if exactly 4 or 5 products are featured
  if (featuredProducts.length < 4) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-7">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-10 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="text-purple-700 font-medium hover:text-purple-900 inline-flex items-center transition-colors duration-200 self-start sm:self-auto"
          >
            View all products <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            featuredProducts.length >= 4
              ? "lg:grid-cols-4"
              : featuredProducts.length === 3
              ? "lg:grid-cols-3"
              : "lg:grid-cols-2"
          } gap-4 sm:gap-6`}
        >
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
