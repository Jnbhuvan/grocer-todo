"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductList from "@/components/ProductList";

type Product = {
  _id: string;
  title: string;
  check: boolean;
};

export default function HomePage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-white to-green-100 text-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-brown">
              Groceries List
            </h1>
            <p className="text-green-600">Manage your Groceries List</p>
          </div>

          {/* Add Product Button */}
          <div className="flex justify-end">
            <button
              onClick={() => router.push("/add-product")}
              className="bg-green-600 hover:bg-green-700 text-white transition px-6 py-2 rounded-lg font-medium shadow-md"
            >
              + Add Product
            </button>
          </div>

          <ProductList
            products={products}
            loading={loading}
            error={error}
            onRefresh={fetchProducts}
          />
        </div>
      </main>
    </div>
  );
}
