document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.email !== "admin@nike.com") {
    alert("Access denied. Admins only.");
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("product-form");
  const list = document.getElementById("product-list");
  const imageInput = document.getElementById("imageInput");
  const preview = document.getElementById("preview");

  let editingIndex = -1;
  let currentImage = "";

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      currentImage = reader.result;
      preview.src = currentImage;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });

  const loadProducts = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    list.innerHTML = products.map((p, index) => `
      <div style="border: 1px solid #ccc; padding: 10px; margin-bottom:10px;">
        <img src="${p.image}" alt="${p.name}" style="width:100px;"><br>
        <strong>${p.name}</strong><br>
        $${p.price}<br>
        Category: ${p.category}<br>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `).join("");
  };

  window.deleteProduct = (index) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
  };

  window.editProduct = (index) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const p = products[index];
    form.name.value = p.name;
    form.price.value = p.price;
    form.category.value = p.category;
    currentImage = p.image;
    preview.src = p.image;
    preview.style.display = "block";
    editingIndex = index;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!currentImage) {
      alert("Please select an image.");
      return;
    }

    const product = {
      name: form.name.value,
      price: parseFloat(form.price.value),
      image: currentImage,
      category: form.category.value
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (editingIndex >= 0) {
      products[editingIndex] = product;
      editingIndex = -1;
    } else {
      products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    form.reset();
    imageInput.value = "";
    preview.style.display = "none";
    currentImage = "";
    loadProducts();
  });

  loadProducts();
});
