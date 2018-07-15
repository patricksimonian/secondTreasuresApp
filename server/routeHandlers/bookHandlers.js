Promise =  require('bluebird');
const beautifyIsbn = require('beautify-isbn');

module.exports = (db, cloudinary) => {
  const Book = db.books;
  const Author = db.authors;
  return  {
    allBook: (req, res) => {
       Book.all({
         include: [{model: Author, as: 'authors'}]
       })
       .then(books => {
         throw new Error('ygig');
         //map books to json
         const booksJSON = books.map(book => {
           return {...book.toJSON(), isbn_formatted: book.isbn_formatted()}});
         res.json({
           success: true,
           data: booksJSON,
           message: ['Books found']
         });
       })
       .catch(err => {
         //failed to load books
         //very unlikely but we should notify admins that something is wrong with website
         res.status(500).json({
           success: false,
           message: ['Unable to load Books']
         });
       });
    },
    findBook: (req, res) => {
      const isbn = beautifyIsbn.dehyphenate(req.params.isbn);
      Book.findOne({where: {isbn}})
      .then(book => {
        res.json({
          success: true,
          data: book.toJSON(),
          message: ['Book found']
        });
      })
      .catch(err => {
        //unable to find book
        res.status(400).json({
          success: false,
          message: ['Unable to find book with isbn: ' + isbn]
        });
      });
    },
    updateBook: (req, res) => {
      //updates book information and author information
      // Promise.all([Book.update(req.body)])
      res.send('book updated');
    },
    deleteBook: (req, res) => {
      Book.findOne({where: {isbn: req.params.isbn}})
      .then(book => book.destroy())
      .then((bookDeleted) => {
        res.json({
          success: true,
          isbn: req.params.isbn,
          deleted: true
        });
      })
      .catch((err) => {
        //book couldn't be destroyed but this is okay
        console.error(err);
        res.status(400).json({
          success: 'false',
          message: ['Could not delete Book, Book may not exist']
        });
      })
    },
    createBook: (req, res) => {
      //get data from request body
      const requestData = req.body;
      //upload book img to cloud hosting
      cloudinary.uploader.upload(requestData.book.img_url)
      .then(result => {
        let book = {...requestData.book};
        let author = {...requestData.author};
        //update book img url with the secure version from hosting
        book.img_url = result.secure_url;
        //attempt to create the book
        return Book.create(book)
        .then(newBook => {
          //find or create author for book
          return Author.findById(author.id)
          .then(authorFound => {
            if(authorFound) {
              return newBook.setAuthors(authorFound);
            } else {
              //if author wasn't found we reset id to null and create author
              author.id = null;
              return Author.create(author)
              .then(authorCreated => newBook.setAuthors(authorCreated));
            }
          });
        });
      })
      .then(() => {
        res.json({success: true, message: 'Book added'});
      })
      .catch(error => {
        let errRes = {
          success: false,
          message: ['Unable to create Book']
        }
        if(error.errors) {
          errRes.message = error.errors.map(validationError => validationError.message);
        }
        res.status(400).json(errRes);
      });
    }
  }
}
