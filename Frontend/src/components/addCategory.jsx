import { useState } from "react";

function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!name) return;
    const newItem = {
      id: Date.now(),
      name,
      date: date || new Date().toISOString().split("T")[0],
    };
    setCategories([...categories, newItem]);
    setName("");
    setDate("");
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Add Category</h1>

      {/* Add Form */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          className="border p-2 rounded w-full sm:w-1/3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded w-full sm:w-1/4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Category Cards */}
      
    </>
  );
}

export default Category;
