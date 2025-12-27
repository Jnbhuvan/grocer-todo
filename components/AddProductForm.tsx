"use client";

import { useState } from "react";

type Props = {
  onProductAdded: () => void;
};

export default function AddProductForm({ onProductAdded }: Props) {
  const [title, setTitle] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, check }),
      });

      if (!res.ok) throw new Error("Failed to create product");

      setTitle("");
      setCheck(false);
      onProductAdded();
    } catch (err: any) {
      alert(err.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">
        Add New Product
      </h2>

      <form onSubmit={handleCreate} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1 text-green-700">
            Title
          </label>
          <input
            type="text"
            className="w-full rounded-lg bg-white border border-gray-300 px-4 py-2
                       text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white
                     transition px-6 py-2 rounded-lg font-medium shadow
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
