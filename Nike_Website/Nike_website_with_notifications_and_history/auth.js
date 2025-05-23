document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector(".register-form[action*='register']");
  const loginForm = document.querySelector(".register-form[action*='login']");

  // Registration
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = registerForm.username.value;
      const email = registerForm.email.value;
      const password = registerForm.password.value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.find(u => u.email === email)) {
        alert("Email is already registered!");
        return;
      }

      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }

  // Logout link handling
  const logoutLink = document.querySelector("a[href*='logout']");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "login.html";
    });
  }
});
