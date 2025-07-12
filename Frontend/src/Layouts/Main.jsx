import { useEffect, useState } from "react";
import {
  getAllExpenseValue,
  getExpenseChartData,
  getLastTxn,
} from "../api/expenseApi";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Scale,
  ArrowDownLeftFromCircle,
} from "lucide-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import toast from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend);

function Main() {
  const [showAll, setShowAll] = useState(false);
  const [chartData, setChartData] = useState({ categories: [], amounts: [] });
  const [expense, setExpenses] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBal: 0,
  });
  const [lastTxn, setLastTxn] = useState([]);

  useEffect(() => {
    getTotalValue();
    getLastTxnList();
    getExpensetData();
  }, []);

  async function getExpensetData() {
    try {
      let data = await getExpenseChartData();
      let filteredData = data.filter((item) => item.category !== null);
      let categories = filteredData.map((item) => item.category);
      let amounts = filteredData.map((item) => item.totalAmount);
      setChartData({ categories, amounts });
    } catch (e) {
      toast.error("Error fetching chart data");
      console.log("Chart Data Error:", e);
    }
  }

  async function getTotalValue() {
    try {
      let data = await getAllExpenseValue();
      setExpenses({
        totalIncome: data.totalIncome,
        totalExpense: data.totalExpense,
        totalBal: data.totalBal,
      });
    } catch (e) {
      toast.error("Error fetching total values");
      console.log("Total Value Error:", e);
    }
  }

  async function getLastTxnList() {
    try {
      let data = await getLastTxn();
      setLastTxn(data);
    } catch (e) {
      toast.error("Error fetching last transactions");
      console.log("Transaction Error:", e);
    }
  }

  // 🔹 Generate chart colors dynamically
  const generateColors = (count) => {
    const base = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(199, 199, 199, 0.6)",
    ];
    const borders = base.map((c) => c.replace("0.6", "1"));
    return {
      backgroundColor: base.slice(0, count),
      borderColor: borders.slice(0, count),
    };
  };

  const colors = generateColors(chartData.categories.length);

  const data = {
    labels: chartData.categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: chartData.amounts,
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="flex-1 p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          icon={<ArrowUpCircle className="text-green-600 w-6 h-6" />}
          title="Total Income"
          value={expense.totalIncome}
          bg="bg-green-100"
        />
        <SummaryCard
          icon={<ArrowDownCircle className="text-red-600 w-6 h-6" />}
          title="Total Expense"
          value={expense.totalExpense}
          bg="bg-red-100"
        />
        <SummaryCard
          icon={<Scale className="text-blue-600 w-6 h-6" />}
          title="Current Balance"
          value={expense.totalBal}
          bg="bg-blue-100"
        />
      </div>

      {/* Chart + Recent Txn */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow flex items-center justify-center order-2 xl:order-1 p-4 min-h-[300px]">
          <div className="text-center w-full">
            {chartData.categories.length === 0 ? (
              <>
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <p>Chart Coming Soon</p>
              </>
            ) : (
              <div className="w-full max-w-[300px] h-[300px] mx-auto">
                <Pie data={data} options={options} />
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow p-4 order-1 xl:order-2">
          <div className="flex items-center mb-4 gap-2 text-gray-700 font-semibold">
            <ArrowDownLeftFromCircle className="text-red-500 w-5 h-5" />
            <span>Recent Transactions</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {lastTxn.length > 0 ? (
              lastTxn.slice(0,5).map((item) => (
                <div
                  key={item._id}
                  className="hover:border-r-4 hover:border-sky-400 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-blue-50 rounded-lg px-4 py-3 hover:bg-blue-100 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-700 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-4">
                    <p className="text-gray-800 font-bold">
                      ₹ {item.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">
                No recent transactions.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Table Placeholder */}
     {/* All Transactions Table */}
<div className="bg-white p-6 rounded-xl shadow">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-700">
      All Transactions
    </h3>
    {lastTxn.length > 5 && (
      <button
        onClick={() => setShowAll((prev) => !prev)}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        {showAll ? "Show Less" : "View All"}
      </button>
    )}
  </div>

  {lastTxn.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-center">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
          {(showAll ? lastTxn : lastTxn.slice(0, 5)).map((item) => (
            <tr key={item._id}>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">
                {item.category ? item.category : "Uncategorized"}
              </td>
              <td className="px-4 py-2 text-right">
                ₹ {item.amount.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-center">
                {new Date(item.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center py-8 text-gray-500">No transactions found.</p>
  )}
</div>

    </div>
  );
}

// 🔸 Extracted reusable card component
function SummaryCard({ icon, title, value, bg }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:border-r-4 hover:border-sky-400">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${bg}`}>{icon}</div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold text-gray-800 break-words">
            ₹ {value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
