// Income.jsx - Responsive income management
import { SquarePen, Trash, CirclePlus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { createIncome, getIncome } from "../api/incomeApi";
import {toast} from 'react-hot-toast'
function Income() {
  const [amount, setAmount] = useState("");
  const [incomeDate, setDate] = useState("");
  const [source, setSource] = useState("");
  const [incomes, setIncomes] = useState({ data: [], isLoading: false });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const incomeTypes = [
    "Salary",
    "Business",
    "Freelance",
    "Rental Income",
    "Interest",
    "Dividend",
    "Gift",
    "Others",
  ];

  const handleAdd = async () => {
    if (!amount || !incomeDate || !source){
            toast.error ("fill the all field");
return;
    } 
    const newIncome = {
      source,
      amount,
      incomeDate,
      userId: localStorage.getItem("isUserId")
    };
    try {
      await createIncome(newIncome);
      toast.success("income created successfuly");
      setTimeout(() => {
      setAmount("");
      setDate("");
      setSource("");
      setShowModal(false);
      getIncomeList();
      }, 1000);
      

    } catch (error) {
      toast.error(error);
      console.error("Error adding income", error);
    }
  };

  useEffect(() => {
    getIncomeList();
  }, [searchTerm]);

  async function getIncomeList() {
    try {
      const data = await getIncome(searchTerm);
      setIncomes({ data, isLoading: false });
    } catch (e) {
      setIncomes({ data: [], isLoading: false });
    }
  }

  // const filteredIncomes = incomes.data.filter(item =>
  //   item.source.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>

      {/* Modal - Responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Income</h2>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="Enter amount"
                className="border border-gray-300 p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                type="date"
                className="border border-gray-300 p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={incomeDate}
                onChange={(e) => setDate(e.target.value)}
              />
              <select
                className="border border-gray-300 p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Select Income Source</option>
                {incomeTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
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
          <h1 className="text-xl font-bold text-gray-800">Income List</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-row">
            <div className="relative flex-1 sm:w-60 lg:w-60">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                placeholder="Search income..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <CirclePlus size={18} />
              Add Income
            </button>
          </div>
        </div>
      </div>

      {/* Income Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {incomes.data.length === 0 && !incomes.isLoading && (
          <div className="col-span-full text-center text-gray-400 py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">No income records found</p>
            <p className="text-sm">Add your first income to get started</p>
          </div>
        )}

        {incomes.data.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] p-4 flex flex-col gap-3"
          >
            <div className="flex-1">
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-500">Amount</span>
                  <span className="text-lg font-bold text-green-600">
                    ₹ {item.amount.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-500">Source</span>
                  <span className="text-gray-800 font-semibold">{item.source}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-500">Date</span>
                  <span className="text-gray-700">
                    {new Date(item.incomeDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <button   className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm">
                <SquarePen size={14} />
                Edit
              </button>
              <button disabled className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm">
                <Trash size={14} />
                Delete
              </button>
            </div> */}
          </div>
        ))}
      </div>
      
    </>
  );
}

export default Income;