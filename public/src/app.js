import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Home from "./pages/home.js";
import BookDetail from "./pages/bookDetail.js";
import Admin from "./pages/admin.js";
import Login from "./pages/login.js";

const app = document.getElementById("app");

async function render() {
  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");
  const admin = params.get("admin");

  let content = "";

  // 🔐 Admin Route with Login Protection
  if (admin) {
    if (localStorage.getItem("admin") === "true") {
      content = Admin();
    } else {
      content = Login();
    }
  }

  // 📖 Book Detail Page
  else if (id) {
    content = await BookDetail(id);
  }

  // 🏠 Home Page
  else {
    content = await Home();
  }

  app.innerHTML = `
    ${Navbar()}
    ${content}
    ${Footer()}
  `;
}

render();
