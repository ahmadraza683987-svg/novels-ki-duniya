export default function Login() {
  setTimeout(() => {
    const btn = document.getElementById("loginBtn");

    if (btn) {
      btn.addEventListener("click", async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
          // 🔥 Backend API call (Render)
          const res = await fetch("https://novels-ki-duniya.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
          });

          const data = await res.json();

          if (data.success) {
            localStorage.setItem("admin", "true");
            window.location.href = "?admin=true";
          } else {
            // 🔁 fallback (local login)
            if (username === "admin" && password === "1234") {
              localStorage.setItem("admin", "true");
              window.location.href = "?admin=true";
            } else {
              alert("❌ Wrong credentials");
            }
          }

        } catch (err) {
          // ❗ agar backend down ho
          if (username === "admin" && password === "1234") {
            localStorage.setItem("admin", "true");
            window.location.href = "?admin=true";
          } else {
            alert("Server error ❌");
          }
        }
      });
    }
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
