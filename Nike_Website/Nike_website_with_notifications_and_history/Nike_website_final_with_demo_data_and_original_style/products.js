const products = [
  {
    id: 1,
    name: "Nike Air Max 2023",
    price: 149.99,
    image: "images/nike1.jpg",
    description: "High-performance running shoes with great cushioning."
  },
  {
    id: 2,
    name: "Nike Revolution 6",
    price: 89.99,
    image: "images/nike2.jpg",
    description: "Comfortable daily trainer with responsive feel."
  },
  {
    id: 3,
    name: "Nike ZoomX Vaporfly",
    price: 199.99,
    image: "images/nike3.jpg",
    description: "Elite marathon shoe designed for speed and energy return."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");
  const searchInput = document.getElementById("product-search");

  const renderProducts = (products) => {
    if (products.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>No products available.</p>";
      return;
    }
    container.innerHTML = products.map(product => `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
      </div>
    `).join("");
  };

  const loadProducts = () => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    renderProducts(allProducts);

    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase();
      const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
      );
      renderProducts(filtered);
    });
  };

  loadProducts();
});

function addToCart(product) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please log in to add items to your cart.");
    return;
  }

  const cartKey = "cart_" + user.email;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const index = cart.findIndex(item => item.name === product.name);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert("Product added to cart!");
}
