import { Link } from "react-router-dom";
import {
  Monitor,
  Printer,
  Server,
  Package,
  Coffee,
  ChevronRight,
} from "lucide-react";

const ProductCategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-7">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Product Categories</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products designed to meet all your office
            and IT needs
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <Link
            to="/products?category=computers"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Monitor size={24} className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Computers
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Laptops, desktops and workstations
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=printers"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Printer size={24} className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Printers
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Laser, inkjet and 3D printers
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=networking"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Server size={24} className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Networking
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Routers, switches and access points
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=software"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Package size={24} className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Software
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Office suites and productivity tools
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=accessories"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 col-span-2 sm:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Coffee size={24} className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Accessories
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Keyboards, mice and peripherals
              </p>
            </div>
          </Link>
        </div>
        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/products"
            className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors duration-200"
          >
            View all products <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategoriesSection;
