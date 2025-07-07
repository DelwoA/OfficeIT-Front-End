import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Package,
  Image,
  Tag,
  DollarSign,
  FileText,
  Settings,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    category: "",
    image: "",
    description: "",
    availability: "In Stock",
    specs: {},
  });

  const [specFields, setSpecFields] = useState([{ key: "", value: "" }]);

  const [errors, setErrors] = useState({});

  const categories = [
    "Computers",
    "Printers",
    "Networking",
    "Software",
    "Accessories",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecFields = [...specFields];
    newSpecFields[index][field] = value;
    setSpecFields(newSpecFields);

    // Update formData specs
    const newSpecs = {};
    newSpecFields.forEach((spec) => {
      if (spec.key && spec.value) {
        newSpecs[spec.key] = spec.value;
      }
    });
    setFormData((prev) => ({
      ...prev,
      specs: newSpecs,
    }));
  };

  const addSpecField = () => {
    setSpecFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeSpecField = (index) => {
    if (specFields.length > 1) {
      const newSpecFields = specFields.filter((_, i) => i !== index);
      setSpecFields(newSpecFields);

      // Update formData specs
      const newSpecs = {};
      newSpecFields.forEach((spec) => {
        if (spec.key && spec.value) {
          newSpecs[spec.key] = spec.value;
        }
      });
      setFormData((prev) => ({
        ...prev,
        specs: newSpecs,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    // Validate discount
    if (formData.discount && parseFloat(formData.discount) < 0) {
      newErrors.discount = "Discount cannot be negative";
    }
    if (
      formData.discount &&
      parseFloat(formData.discount) >= parseFloat(formData.price)
    ) {
      newErrors.discount = "Discount must be less than price";
    }

    // Validate at least one spec
    const hasValidSpecs = specFields.some(
      (spec) => spec.key.trim() && spec.value.trim()
    );
    if (!hasValidSpecs) {
      newErrors.specs = "At least one specification is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Generate a unique ID (in real app, this would be handled by backend)
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
      price: parseFloat(formData.price),
      discount: formData.discount ? parseFloat(formData.discount) : 0,
    };

    onAddProduct(newProduct);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      discount: "",
      category: "",
      image: "",
      description: "",
      availability: "In Stock",
      specs: {},
    });
    setSpecFields([{ key: "", value: "" }]);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Package className="w-6 h-6 text-purple-600" />
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Tag className="w-5 h-5 text-purple-600" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., ThinkPad X1 Carbon"
                  className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger
                    className={`mt-1 ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <DollarSign className="w-5 h-5 text-green-600" />
              Pricing & Availability
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price ($) *
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`mt-1 ${errors.price ? "border-red-500" : ""}`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="discount"
                  className="text-sm font-medium text-gray-700"
                >
                  Discount Price ($)
                </Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="0.00 (optional)"
                  className={`mt-1 ${errors.discount ? "border-red-500" : ""}`}
                />
                {errors.discount && (
                  <p className="text-red-500 text-xs">{errors.discount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="availability"
                  className="text-sm font-medium text-gray-700"
                >
                  Availability
                </Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, availability: value }))
                  }
                >
                  <SelectTrigger
                    className={`mt-1 ${
                      errors.availability ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                {errors.availability && (
                  <p className="text-red-500 text-xs">{errors.availability}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <FileText className="w-5 h-5 text-blue-600" />
              Product Details
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  <Image className="w-4 h-4 inline mr-1" />
                  Image URL *
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/product-image.jpg"
                  className={`mt-1 ${errors.image ? "border-red-500" : ""}`}
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter a detailed description of the product..."
                  className={`min-h-[100px] mt-1 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Settings className="w-5 h-5 text-orange-600" />
              Product Specifications
            </h3>

            <div className="space-y-3">
              {specFields.map((spec, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700">
                      Specification Name
                    </Label>
                    <Input
                      value={spec.key}
                      onChange={(e) =>
                        handleSpecChange(index, "key", e.target.value)
                      }
                      placeholder="e.g., Processor, Memory, Storage"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700">
                      Specification Value
                    </Label>
                    <Input
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecChange(index, "value", e.target.value)
                      }
                      placeholder="e.g., Intel Core i7, 16GB DDR4"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSpecField(index)}
                    disabled={specFields.length === 1}
                    className="h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {errors.specs && (
                <p className="text-red-500 text-xs">{errors.specs}</p>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={addSpecField}
                className="mt-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Specification
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Package className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
