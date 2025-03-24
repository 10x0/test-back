import request from "supertest";
import app from "../src/index.js";
import mongoose from "mongoose";
import Book from "../src/models/Book.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Book.deleteMany(); // Clean up before running tests

  // Seed with sample books
  await Book.create([
    { title: "Book 1", authors: "Author A", isbn: "111", category: "Fiction", publishedDate: "2020-01-01", publisher: "Pub A", location: "Shelf 1", availableCopies: 2, reserved_by: [], keywords: ["novel"], thumbnail: null },
    { title: "Book 2", authors: "Author B", isbn: "222", category: "Science", publishedDate: "2019-05-10", publisher: "Pub B", location: "Shelf 2", availableCopies: 3, reserved_by: [], keywords: ["research"], thumbnail: null },
    { title: "Book 3", authors: "Author C", isbn: "333", category: "Fiction", publishedDate: "2018-08-15", publisher: "Pub C", location: "Shelf 3", availableCopies: 1, reserved_by: [], keywords: ["story"], thumbnail: null }
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Books API", () => {
  it("should fetch all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(3);
  });

  it("should fetch all unique categories", async () => {
    const res = await request(app).get("/api/books/categories");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining(["Fiction", "Science"]));
  });

  it("should fetch books by category", async () => {
    const res = await request(app).get("/api/books?category=Fiction");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2); // Since 2 books belong to 'Fiction'
    res.body.forEach(book => expect(book.category).toBe("Fiction"));
  });
});
