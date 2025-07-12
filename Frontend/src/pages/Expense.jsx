// Expense.jsx - Responsive expense management
import { SquarePen, Trash, CirclePlus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllCategory } from "../api/categoryApi";
import { createExpense, getExpense } from "../api/expenseApi";
import toast from "react-hot-toast";

function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [expense, setExpenses] = useState({ data: [] });
  const [categoriesList, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = async () => {
    if (!title || !amount || !date || !type){ 
                  toast.error ("fill the all field");
      return};
    const newExpense = {
      name: title,
      notes: title,
      amount,
      date,
      categoryId: type,
      userId: localStorage.getItem("isUserId"),
    };

    try {
      await createExpense(newExpense);
      toast.success("created expense successfuly");
      setTimeout(() => {
        setTitle("");
        setAmount("");
        setDate("");
        setType("");
        setShowModal(false);
        expenseList();
      }, 1000);
    } catch (error) {
      toast.error("Error adding expense", error);
      console.error("Error adding expense", error);
    }
  };

  useEffect(() => {
    expenseList();
    categoryList();
  }, []);

  async function categoryList() {
    try {
      const data = await getAllCategory();
      setCategories(data);
    } catch (e) {
      toast.error("Error  expense", e);
      setCategories([]);
    }
  }

  async function expenseList() {
    try {
      const data = await getExpense();
      setExpenses({ data });
    } catch (e) {
      setExpenses({ data: [] });
    }
  }

  const filteredExpenses = expense.data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Modal - Responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add New Expense
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border focus:outline-none border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                className="border focus:outline-none border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                type="date"
                className="border focus:outline-none border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <select
                className="border focus:outline-none border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Category</option>
                {categoriesList.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.category}
                  </option>
                ))}
              </select>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
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

      {/* Top Bar - Responsive */}
      <div className="bg-white shadow rounded-lg p-4 mt-2 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-800">Expense List</h1>

          <div className="flex flex-col sm:flex-row gap-3 lg:flex-row">
            <div className="relative flex-1 sm:w-60 lg:w-60">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                placeholder="Search expenses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <CirclePlus size={18} />
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* Expense Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {filteredExpenses.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">No expenses found</p>
            <p className="text-sm">Add your first expense to get started</p>
          </div>
        ) : (
          filteredExpenses.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] p-4 flex flex-col gap-3"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold text-gray-800">
                      ₹ {item.amount.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              {/* <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm">
                  <SquarePen size={14} />
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm">
                  <Trash size={14} />
                  Delete
                </button>
              </div> */}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Expense;
