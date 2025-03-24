import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: String, required: true },
    isbn: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    publishedDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    availableCopies: { type: Number, required: true, min: 0 },
    reserved_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Book = mongoose.model("books", bookSchema);

export default Book;
