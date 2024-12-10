import connectToDatabase from "../../middle/db";
import Product from "../../models/products";

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    // Get all products
    case "GET":
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    // Add a new product
    case "POST":
      try {
        const { title,slug,des,img,category,size,color,availableQty, price} = req.body;

        if (!title || !price || !des) {
          return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newProduct = new Product({title,slug,des,img,category,size,color,availableQty, price });
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // Update an existing product
    case "PUT":
      try {
        const { _id, ...updateData } = req.body;

        if (!_id) {
          return res.status(400).json({ success: false, message: "Product ID is required." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
          new: true,
          runValidators: true,
        });

        if (!updatedProduct) {
          return res.status(404).json({ success: false, message: "Product not found." });
        }

        res.status(200).json({ success: true, data: updatedProduct });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
