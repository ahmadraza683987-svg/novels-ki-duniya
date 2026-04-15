export default async function BookDetail(id) {
  const res = await fetch("https://novels-ki-duniya.onrender.com/books");
  const books = await res.json();

  const book = books.find(b => b.id == id);

  if (!book) {
    return `<h2 style="text-align:center;">Book Not Found</h2>`;
  }

  return `
    <div class="container" style="padding:20px;">
      
      <h2 style="text-align:right;">${book.title_ur}</h2>
      <h3 style="color:#94a3b8;">${book.title_en}</h3>
      <p>Author: ${book.author}</p>

      <br>

      <a href="${book.file}" download style="background:#22c55e;padding:10px;border-radius:5px;display:inline-block;">
        ⬇ Download PDF
      </a>

      <br><br>

      <iframe 
        src="${book.file}" 
        width="100%" 
        height="500px"
        style="border:none;border-radius:10px;">
      </iframe>

    </div>
  `;
}
