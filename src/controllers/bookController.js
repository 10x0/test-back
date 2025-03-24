import Book from "../models/Book.js";

// Fetch all books with optional category filtering
export const getBooks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category; // Filter by category
    }

    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = 15; // Limit results to 15 books per request
    const skip = (page - 1) * limit;

    const books = await Book.find(filter).limit(limit).skip(skip);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fetch all unique categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Book.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
