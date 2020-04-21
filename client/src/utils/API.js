import axios from "axios";
const apiKey = "AIzaSyDD9y6uRf3k33PDLd6SLeEIoOfwLBURrlk";

  // Send request to google books to find searched book
  export default {
    getBooksByTitle: function(title) {
        return new Promise((resolve, reject) => {
        axios
            .get("https://www.googleapis.com/books/v1/volumes?q=$" + title + "&key=" + apiKey)
            .then(res => {
            const bookResults = res.data.items;
            const results = bookResults.map(book => {
                const { imageLinks = null } = book.volumeInfo

                const thumbnail = imageLinks ? imageLinks.thumbnail : null
                return {
                    id: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    image: thumbnail,
                    link: book.volumeInfo.previewLink
                };
            });
            resolve(results);
            })
            .catch(err => reject(err));
        });
    },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
