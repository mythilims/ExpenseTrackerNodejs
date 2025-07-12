import { SquarePen, Trash, CirclePlus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategory, createCategory } from "../api/categoryApi";

function Category() {
  const [categories, setCategories] = useState({ data: [], isLoading: false });
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCategoryList();
  }, []);

  async function getCategoryList() {
    setCategories((prev) => ({ ...prev, isLoading: true }));
    try {
      let data = await getCategory();
      setCategories({ data, isLoading: false });
    } catch (e) {
      console.error("Error fetching categories", e);
      setCategories({ data: [], isLoading: false });
    }
  }

  const handleAdd = async () => {
    if (!name.trim()) return;

    const newCate = {
      category: name,
      description: name,
    };
    await createCategory(newCate);
    setName("");
    setDate("");
    setShowModal(false);
    getCategoryList();
  };

  const closeModal = () => {
    setShowModal(false);
    setName("");
    setDate("");
  };

  // Filter categories based on search term
   let filteredCategories = categories.data
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Category Management</h1>
              <p className="text-gray-600 text-sm mt-1">Manage your categories efficiently</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Add Button */}
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <CirclePlus size={18} />
                <span className="hidden sm:inline">Add Category</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {categories.isLoading && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-2 text-gray-600">Loading categories...</span>
            </div>
          </div>
        )}

        {/* Category Cards */}
        {!categories.isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredCategories.length === 0 && !categories.isLoading && (
              <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <CirclePlus size={48} className="mx-auto mb-4 opacity-50" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">
                  {searchTerm ? 'No categories found' : 'No categories yet'}
                </p>
                <p className="text-gray-400 text-sm">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Add your first category to get started'
                  }
                </p>
              </div>
            )}

            {filteredCategories.length>0&&filteredCategories.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50 p-4 flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                    {item.category}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors flex items-center gap-1 text-sm">
                    <SquarePen size={14} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-md transition-colors flex items-center gap-1 text-sm">
                    <Trash size={14} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!categories.isLoading && filteredCategories.length > 0 && (
          <div className="text-center text-gray-500 text-sm">
            Showing {filteredCategories.length} of {categories.data.length} categories
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;