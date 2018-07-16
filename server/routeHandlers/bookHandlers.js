Promise =  require('bluebird');
const beautifyIsbn = require('beautify-isbn');

module.exports = (db, cloudinary) => {
  const Book = db.books;
  const Author = db.authors;
  return  {
    allBook: (req, res) => {
      //pagnation query params if passed in
      let page = req.query.page / 1
      const NUMROWS = 25;
      page = isNaN(page) || page < 1 ? 1 : Math.floor(page); //is page param passed in as a valid int ?
      const startRow = page === 1 ? 1 : page * NUMROWS;
      const endRow = startRow + NUMROWS;
      // using raw query for now as demonstration of sql
      // please note that although RAW values are being tossesd into the LIMIT
      // there is no possibility of inject due to the validations above
      const query = `
        SELECT b.isbn, b.title, b.genre, cast((b.price / 100) as decimal(11, 2)) AS price, b.price as price_cents,
        b.stock, b.img_url, a.name AS author_name, a.id AS author_id
        FROM Books b
        LEFT JOIN book_authors ba
        ON b.isbn = ba.book_isbn
        LEFT JOIN Authors a
        ON ba.author_id = a.id
        ORDER BY b.created_at DESC
        LIMIT ${startRow}, ${endRow};`

      db.sequelize.query(query, {bind: [startRow, endRow], type: db.sequelize.QueryTypes.SELECT})
       .then(books => {
         //format book data in a more predicatble manner, storing authors under
         //books
         const booksJSON = books.map(book => {
           return {
            ...book,
            authors: [{name: book.author_name, id: book.author_id}],
            isbn_formatted: beautifyIsbn.hyphenate(book.isbn)}
         });
         //send book data
         res.json({
           success: true,
           data: booksJSON,
           message: [books.length ? 'Books found' : 'No Books Found']
         });
       })
       .catch(err => {
         console.log(err);
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
    //create books for now only allows to store on author by their name,
    //this will remain this way until the front end allows for dynamic generation
    //of author inputs
    createBook: (req, res) => {
      //get data from request body
      const requestData = req.body;
      //upload book img to cloud hosting
      cloudinary.uploader.upload(requestData.book.img_url)
      .then(result => {
        let book = {...requestData.book};
        let author = requestData.book.author; // <SUBJECT TO CHANGE to be more dynamic
        //update book img url with the secure version from hosting
        book.img_url = result.secure_url;
        //format book price to cents
        book.price = book.price * 100;
        //attempt to create the book
        //ideally we should place this in a transaction**
        return Book.create(book)
        .then(newBook => {
          //find or create author for book
          //please note for now we are only handdling the case of a singular author
          //this would be a promise.All in the case we choose to add more authors
          return Author.findOne({where: {name: author}})
          .then(authorFound => {
            if(authorFound) {
              return newBook.setAuthors(authorFound);
            } else {
              //if author wasn't found we reset id to null and create author
              author.id = null;
              return Author.create({name: author})
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
