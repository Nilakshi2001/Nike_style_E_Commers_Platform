document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;

    if (email === "admin@nike.com" && password === "admin123") {
      localStorage.setItem("loggedInUser", JSON.stringify({ email: "admin@nike.com" }));
      alert("Admin login successful!");
      window.location.href = "admin.html";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials.");
    }
  });
});
