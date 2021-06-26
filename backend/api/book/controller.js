const Book = require('./model');
const fs = require('fs');

exports.fetchBook = async(req, res) => {
    try {
        let { bookId } = req.params;

        const book = await Book
            .findById(bookId)
            .select('-__v');

        if(!book) throw new Error(`No book found with Id ${bookId}`);

        res.status(200).json({
            message: 'Book fetched',
            book
        });
    } catch(err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.fetchAllBooks = async(req, res) => {
    try {
        const books = await Book
            .find()
            .select('-__v');
        
        res.status(200).json({
            message: 'All books fetched',
            count: books.length,
            books
        });

    } catch(err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.createBook = async(req, res) => {
    try {
        let {title, isbn, publish_year, edition} = req.body;
        if(req.files.length < 1) throw new Error('Book file required');

        const book = new Book({
            title,
            isbn, 
            publish_year,
            edition,
            filename: req.files[0].filename
        }); 


        const result = await book.save();

        res.status(201).json({
            message: 'Book record created',
            result
        });
    } catch(err) {
        if(req?.files?.length >= 1 && fs.existsSync(req.files[0].path)) {
            fs.unlinkSync(req.files[0].path);
        }

        res.status(500).json({
            error: err
        });
    }
}