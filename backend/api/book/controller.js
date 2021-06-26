const Book = require('./model');

exports.fetchBook = async(req, res) => {
    try {
        let { bookId } = req.params;

        const book = await Book.findById(bookId);

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

exports.createBook = async(req, res) => {
    const {title, isbn} = req.body;
    if(req.files.length < 1) throw new Error('Book file required');

    const book = new Book({
        title,
        isbn, 
        filename: req.files[0].filename
    }); 

    try {
        const result = await book.save();

        res.status(201).json({
            message: 'Book record created',
            result
        });
    } catch(err) {
        res.status(500).json({
            error: err
        });
    }
}