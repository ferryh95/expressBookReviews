const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    const exist = users.filter((user) => user.username === username);
    if (exist.length === 0) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  res.send("user" + username + "pass" + password);
  //return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //res.send(JSON.stringify(books,null,4));
  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 600);
  });
  bookPromise.then((successMessage) => {
    res.send(JSON.stringify(books, null, 4));
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books[isbn]);
    }, 600);
  });
  bookPromise.then((successMessage) => {
    res.send(JSON.stringify(books[isbn], null, 4));
  });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = author.params.title;
  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let f_book = books.filter((fb) => fb.author === author);
      resolve(f_book);
    }, 600);
  });
  bookPromise.then((successMaessage) => {
    res.send(JSON.stringify(f_books, null, 4));
  });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = title.params.title;
  let bookPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let f_book = books.filter((fb) => fb.title === title);
      resolve(f_book);
    }, 600);
  });
  bookPromise.then((successMessage) => {
    res.send(JSON.stringify(f_books, null, 4));
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;
