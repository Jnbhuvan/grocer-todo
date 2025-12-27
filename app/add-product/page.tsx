"use client";

import { useRouter } from "next/navigation";
import AddProductForm from "@/components/AddProductForm";

export default function AddProductPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-200 via-white to-green-100 text-gray-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full space-y-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-green-600 hover:underline"
        >
          ← Back
        </button>

        {/* Centered white card form */}
        <AddProductForm
          onProductAdded={() => {
            router.push("/");
            router.refresh();
          }}
        />
      </div>
    </main>
  );
}
