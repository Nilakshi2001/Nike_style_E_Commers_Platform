document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      const authLinks = document.getElementById("auth-links");
      if (user) {
        authLinks.innerHTML = `
          <a href="user-profile.html">${user.name}</a> |
          <a href="#" id="logoutBtn">Logout</a>
        `;
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("loggedInUser");
          window.location.href = "index.html";
        });
      }
    });

  fetch("footer.html")
    .then((res) => res.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
});
