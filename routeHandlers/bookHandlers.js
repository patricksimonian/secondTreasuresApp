module.exports = (db, cloudinary) => {
  return  {
    create: (req, res) => {
      //get models
      const Book = db.books;
      const Author = db.authors;
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
        .then((newBook) => {
          //find or create author for book
          return Author.findById(author.id)
          .then((authorFound) => {
            if(authorFound) {
              return newBook.setAuthors(authorFound);
            } else {
              //if author wasn't found we reset id to null and create author
              author.id = null;
              return Author.create(author)
              .then((authorCreated) => {
                return newBook.setAuthors(authorCreated);
              });
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
