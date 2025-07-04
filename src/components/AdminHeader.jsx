import React from "react";
import { Link } from "react-router-dom";
import { LogOut, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminHeader = ({ onAddProduct }) => {
  const [isOpen, setIsOpen] = useState(false); // test

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-11">
      {/* Mobile Header */}
      <div className="flex flex-col space-y-4 sm:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link
            to="/admin-login"
            className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Link>
        </div>
        <button
          onClick={onAddProduct}
          className="w-full flex items-center justify-center px-4 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 font-medium"
        >
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>
      {/* TODO: Test */}
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
        <ChevronDown
          size={21}
          className={`mr-2 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>
      {/* Test close */}
      {/* Desktop Header */}
      <div className="hidden sm:flex justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <div className="flex items-center space-x-4">
          <button
            onClick={onAddProduct}
            className="flex items-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 font-medium"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
          <Link
            to="/admin-login"
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
