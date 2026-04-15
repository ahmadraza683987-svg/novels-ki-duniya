export default function Navbar() {
  return `
    <div class="navbar">
      <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
        
        <h1>📚 ناول کی دنیا</h1>

        <a href="?admin=true" style="
          background:#22c55e;
          padding:8px 12px;
          border-radius:6px;
          font-size:14px;
        ">
          Admin Panel
        </a>

      </div>
    </div>
  `;
}
