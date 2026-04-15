const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "../public/data/books.json";

// ===== FILE UPLOAD SETUP =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "../public/assets/images");
    } else {
      cb(null, "../public/assets/pdfs");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ===== LOGIN SYSTEM =====
const ADMIN = {
  username: "admin",
  password: "1234"
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// ===== GET BOOKS =====
app.get("/books", (req, res) => {
  const data = fs.readFileSync(FILE_PATH);
  res.json(JSON.parse(data));
});

// ===== ADD BOOK WITH FILE UPLOAD =====
app.post("/add-book", upload.fields([
  { name: "image" },
  { name: "pdf" }
]), (req, res) => {

  const { title_ur, title_en, author } = req.body;

  const image = req.files["image"][0].filename;
  const pdf = req.files["pdf"][0].filename;

  const data = fs.readFileSync(FILE_PATH);
  const books = JSON.parse(data);

  const newBook = {
    id: Date.now(),
    title_ur,
    title_en,
    author,
    image: "./assets/images/" + image,
    file: "./assets/pdfs/" + pdf
  };

  books.push(newBook);

  fs.writeFileSync(FILE_PATH, JSON.stringify(books, null, 2));

  res.json({ message: "Book uploaded successfully" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
