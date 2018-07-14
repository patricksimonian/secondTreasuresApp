import axios from 'axios';

const booksInstance = axios.create({
  baseURL: '/api/books'
});

export default booksInstance;
