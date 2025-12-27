import connect from "@/lib/db";
import Product from "@/lib/models/products";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";
const ObjectId = mongoose.Types.ObjectId;

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { productId, newCheckValue } = body;

    if (!productId || !newCheckValue) {
      return NextResponse.json(
        { message: "productId or newCheckValue can't be empty" },
        { status: 400 }
      );
    }
    await connect();

    if (!Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "productId is invalid or not found" },
        { status: 400 }
      );
    }

    const updatedUser = await Product.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { check: newCheckValue },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { message: "Product not found in the db" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Product Updated via patch function successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in updating user data in DB",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
