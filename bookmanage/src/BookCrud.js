import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css'; // Assuming your CSS file is named App.css

function BookCrud() {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => await loadBooks())();
  }, []);

  async function loadBooks() {
    try {
      const result = await axios.get("http://localhost:8084/get");
      setBooks(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  }

  async function saveBook(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8084/add", {
        title: title,
        author: author,
        description: description,
        publishedDate: publishedDate
      });
      alert("Book saved successfully");
      setBookId("");
      setTitle("");
      setAuthor("");
      setDescription("");
      setPublishedDate("");
      loadBooks();
    } catch (error) {
      alert("Book save failed");
    }
  }

  async function updateBook(event) {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8084/details/${bookId}`, {
        id: bookId,
        title,
        author,
        description,
        publishedDate
      });
      alert("Book updated successfully");
      setBookId("");
      setTitle("");
      setAuthor("");
      setDescription("");
      setPublishedDate("");
      loadBooks();
    } catch (error) {
      alert("Book update failed");
    }
  }

  function editBook(book) {
    setBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setPublishedDate(book.publishedDate);
  }

  async function deleteBook(id) {
    try {
      await axios.delete(`http://localhost:8084/delete/${id}`);
      alert("Book deleted successfully");
      loadBooks();
    } catch (error) {
      alert("Book delete failed");
    }
  }

  return (
    <div className="App">
      <h1>Book Management</h1>
      <div className="container">
        <form>
          <input type="hidden" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Published Date</label>
            <input type="date" className="form-control" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
          </div>
          <button className="register" onClick={saveBook}>Register</button>
          <button className="update" onClick={updateBook}>Update</button>
        </form>
      </div>
      <table className="table" align="center">
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Published Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {books.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
              <td>{note.author}</td>
              <td>{note.description}</td>
              <td>{note.publishedDate}</td>
              <td>
                <button className="edit" onClick={() => editBook(note)}>Edit</button>
                <button className="delete" onClick={() => deleteBook(note.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookCrud;
