export default function Login() {

  setTimeout(() => {
    document.getElementById("loginBtn").addEventListener("click", async () => {

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin", "true");
        window.location.href = "?admin=true";
      } else {
        alert("❌ Wrong credentials");
      }

    });
  }, 0);

  return `
    <div class="container" style="padding:20px;">
      <h2>🔐 Admin Login</h2>

      <input id="username" placeholder="Username"><br><br>
      <input id="password" type="password" placeholder="Password"><br><br>

      <button id="loginBtn">Login</button>
    </div>
  `;
}
