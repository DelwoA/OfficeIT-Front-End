import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { X, Star } from "lucide-react";

const FeaturedProductsInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Featured Products Information</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-5 text-sm text-gray-600">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h2 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 ml-1" />
                Featured Products Logic
              </h2>
              <div className="space-y-4 text-amber-800">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <p>
                    You can toggle{" "}
                    <span className="font-semibold">
                      0 to 8 featured products
                    </span>{" "}
                    at any time.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <p>
                    The{" "}
                    <span className="font-semibold">
                      Featured Products section
                    </span>{" "}
                    on the homepage will only be visible when{" "}
                    <span className="font-semibold">4 or more products</span>{" "}
                    are featured.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <p>
                    If you have{" "}
                    <span className="font-semibold">
                      0, 1, 2, or 3 featured products
                    </span>
                    , the section will be automatically hidden from visitors.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <p>
                    <span className="font-semibold">Maximum limit:</span> You
                    cannot feature more than 8 products. Attempting to exceed
                    this limit will show an error message.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3">
                💡 Best Practices
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    Feature your{" "}
                    <span className="font-semibold">best-selling</span> or{" "}
                    <span className="font-semibold">newest products</span> to
                    maximize visibility.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    Keep featured products{" "}
                    <span className="font-semibold">in stock</span> to avoid
                    customer disappointment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    Update featured products{" "}
                    <span className="font-semibold">regularly</span> to keep the
                    homepage fresh.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    Ensure featured products have{" "}
                    <span className="font-semibold">high-quality images</span>{" "}
                    and complete descriptions.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-bold text-green-900 mb-3">
                ✅ Quick Actions
              </h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Click the <span className="font-semibold">star icon</span>{" "}
                    next to any product to toggle featured status.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Featured products are marked with a{" "}
                    <span className="font-semibold">golden star</span> in the
                    product table.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Check the{" "}
                    <span className="font-semibold">featured counter</span> in
                    the dashboard to see how many products are currently
                    featured.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FeaturedProductsInfoModal;
