export default function Admin() {

  setTimeout(() => {
    const form = document.getElementById("form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title_ur = document.getElementById("title_ur").value;
      const title_en = document.getElementById("title_en").value;
      const author = document.getElementById("author").value;
      const imageFile = document.getElementById("image").files[0];
      const pdfFile = document.getElementById("pdf").files[0];

      if (!imageFile || !pdfFile) {
        alert("❗ Image aur PDF dono select karo");
        return;
      }

      const formData = new FormData();

      formData.append("title_ur", title_ur);
      formData.append("title_en", title_en);
      formData.append("author", author);
      formData.append("image", imageFile);
      formData.append("pdf", pdfFile);

      try {
        const res = await fetch("https://novels-ki-duniya.onrender.com", {
          method: "POST",
          body: formData
        });

        const data = await res.json();

        alert("✅ " + data.message);

        // 🔥 Preview (local preview using object URL)
        const preview = `
          <div class="book-card">
            <img src="${URL.createObjectURL(imageFile)}" />
            <div class="book-info">
              <div class="book-title-ur">${title_ur}</div>
              <div class="book-title-en">${title_en}</div>
              <div class="book-author">${author}</div>
            </div>
          </div>
        `;

        document.getElementById("preview").innerHTML += preview;

        form.reset();

      } catch (err) {
        alert("❌ Backend connect nahi ho raha");
        console.error(err);
      }
    });

  }, 0);

  return `
    <div class="container" style="padding:20px;">
      <h2>📤 Upload Book</h2>

      <form id="form">
        <input id="title_ur" placeholder="اردو نام" required><br><br>
        <input id="title_en" placeholder="English Title" required><br><br>
        <input id="author" placeholder="Author" required><br><br>

        <label>Book Image:</label><br>
        <input type="file" id="image" accept="image/*" required><br><br>

        <label>PDF File:</label><br>
        <input type="file" id="pdf" accept="application/pdf" required><br><br>

        <button type="submit">Upload</button>
      </form>

      <h3 style="margin-top:30px;">Preview:</h3>
      <div id="preview"></div>
    </div>
  `;
}
