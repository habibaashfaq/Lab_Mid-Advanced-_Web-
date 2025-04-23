const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
    const author = req.query.author;
    let books;
    if (author) {
        books = await Book.find({ author: { $regex: author, $options: 'i' } });
    } else {
        books = await Book.find();
    }
    res.json(books);
});

// Add new book
router.post('/', async (req, res) => {
    const { title, author, price } = req.body;
    const newBook = new Book({ title, author, price });
    await newBook.save();
    res.json({ message: 'Book added' });
});

module.exports = router;
