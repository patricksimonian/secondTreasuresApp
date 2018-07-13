Promise = require('bluebird');

module.exports = (db, cloudinary) => {
  const Book = db.books;
  const Author = db.authors;
  return  {
    allBook: (req, res) => {
       Book.all({include: [{model: Author, as: 'authors'}]})
       .then(books => {
         //map books to json
         const booksJSON = books.map(book => {
           return {...book.toJSON()}});
         res.send(JSON.stringify(booksJSON));
       });
    },
    findBook: (req, res) => {
      Book.findOne({where: {isbn: req.params.isbn}})
      .then(book => {
        res.send(JSON.stringify(book.toJSON()))
      });
    },
    updateBook: (req, res) => {
      //updates book information and author information
      // Promise.all([Book.update(req.body)])
      res.send("book updated");
    },
    deleteBook: (req, res) => {
      Book.findOne({where: {isbn: req.params.isbn}})
      .then(book => book.destroy())
      .then((bookDeleted) => {
        res.send(JSON.stringify({
          isbn: req.params.isbn,
          deleted: true
        }));
      })
      .catch((err) => {
        //book couldn't be destroyed but this is okay
        res.sendStatus(400);
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
        res.send("ok");
      })
      .catch(error => {
        res.sendStatus(400);
      });
    }
  }
}
