export default async function Home() {
  const res = await fetch("https://novels-ki-duniya.onrender.com/books");
  const books = await res.json();

  // 🔁 Render function
  function renderBooks(filteredBooks) {
    let booksHTML = "";

    filteredBooks.forEach(book => {
      booksHTML += `
        <a href="?id=${book.id}">
          <div class="book-card">
            <img src="${book.image}" alt="${book.title_en}">
            <div class="book-info">
              <div class="book-title-ur">${book.title_ur}</div>
              <div class="book-title-en">${book.title_en}</div>
              <div class="book-author">${book.author}</div>
            </div>
          </div>
        </a>
      `;
    });

    return booksHTML;
  }

  // 🧾 Main HTML
  let html = `
    <div class="hero">
      <h2>📖 اردو ناول مفت پڑھیں</h2>
      <p>Read Urdu Novels Online</p>

      <input 
        type="text" 
        id="searchInput" 
        placeholder="🔍 تلاش کریں..." 
        style="margin-top:15px;padding:10px;width:90%;border-radius:8px;border:none;">
    </div>

    <div class="books" id="booksContainer">
      ${renderBooks(books)}
    </div>
  `;

  // ⏳ Wait for DOM then attach search
  setTimeout(() => {
    const input = document.getElementById("searchInput");

    input.addEventListener("input", () => {
      const value = input.value.toLowerCase();

      const filtered = books.filter(book =>
        book.title_en.toLowerCase().includes(value) ||
        book.title_ur.includes(value) ||
        book.author.toLowerCase().includes(value)
      );

      document.getElementById("booksContainer").innerHTML = renderBooks(filtered);
    });
  }, 0);

  return html;
}
