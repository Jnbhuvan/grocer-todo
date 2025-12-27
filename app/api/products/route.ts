import connect from "@/lib/db";
import Product from "@/lib/models/products";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";
const ObjectId = mongoose.Types.ObjectId;

export async function GET() {
  try {
    await connect();
    const products = await Product.find(); //returns all the users data
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in fetching users data from DB",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connect();
    const newProduct = new Product(body);
    await newProduct.save();

    return NextResponse.json(
      { message: `Successfully created a new User details ${newProduct}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in creating a new user data in DB",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { productId, newProductName } = body;

    if (!productId || !newProductName) {
      return NextResponse.json(
        { message: "productId or newProductName can't be empty" },
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
      { title: newProductName },
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "productId not found in the params" },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "productId is invalid" },
        { status: 400 }
      );
    }
    await connect();

    const deletedProduct = await Product.findByIdAndDelete(
      new Types.ObjectId(productId)
    );
    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product was not found in the database" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Product Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in deleting product data in DB",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
