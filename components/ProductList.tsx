"use client";

import { useState } from "react";

type Product = {
  _id: string;
  title: string;
  check: boolean;
};

type Props = {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
};

export default function ProductList({
  products,
  loading,
  error,
  onRefresh,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const handleUpdate = async (productId: string) => {
    if (!newTitle.trim()) return alert("New title cannot be empty");

    try {
      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          newProductName: newTitle,
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      setEditingId(null);
      setNewTitle("");
      onRefresh();
    } catch (err: any) {
      alert(err.message || "Error updating product");
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products?productId=${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      onRefresh();
    } catch (err: any) {
      alert(err.message || "Error deleting product");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">
        All Products
      </h2>

      {loading && <p className="text-green-600">Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-green-600">No products found.</p>
      )}

      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li
            key={product._id}
            className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex-1">
              {editingId === product._id ? (
                <input
                  type="text"
                  className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2
                             text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              ) : (
                <>
                  <p className="text-lg font-medium text-black-900">
                    {product.title}
                  </p>
                  <p className="text-sm text-green-600">
                    {/* Check:{" "} */}
                    {/* <span
                      className={
                        product.check ? "text-green-600" : "text-red-600"
                      }
                    >
                      {product.check ? "true" : "false"}
                    </span> */}
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {editingId === product._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="bg-green-500 hover:bg-green-600 text-white transition
                               px-4 py-1.5 rounded-lg text-sm font-medium shadow"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setNewTitle("");
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white transition
                               px-4 py-1.5 rounded-lg text-sm font-medium shadow"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(product._id);
                      setNewTitle(product.title);
                    }}
                    className="bg-yellow-500 hover:bg-green-600 text-white transition
                               px-4 py-1.5 rounded-lg text-sm font-medium shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white transition
                               px-4 py-1.5 rounded-lg text-sm font-medium shadow"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
