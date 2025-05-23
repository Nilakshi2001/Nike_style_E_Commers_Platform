document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cart-container");
  const totalDisplay = document.getElementById("cart-total");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const cartKey = user ? `cart_${user.email}` : "cart";
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  function renderCart() {
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.innerHTML = "";
      return;
    }

    let total = 0;
    container.innerHTML = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${cart.map((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            return `
              <tr style="text-align:center;">
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input" style="width: 60px;"></td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                  <button class="update-btn" data-index="${index}">Update</button>
                  <button class="remove-btn" data-index="${index}">Remove</button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
    totalDisplay.innerHTML = `
      <h3>Total: $${total.toFixed(2)}</h3>
      <button id="checkout-btn">Proceed to Checkout</button>
    `;

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });
    });

    document.querySelectorAll(".update-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const input = document.querySelector(`input.qty-input[data-index="${index}"]`);
        const newQty = parseInt(input.value);
        if (newQty > 0) {
          cart[index].quantity = newQty;
          saveCart();
          renderCart();
        }
      });
    });

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (!user) {
          alert("Please log in to place an order.");
          return;
        }
        const ordersKey = `orders_${user.email}`;
        const currentOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

        const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = {
          items: cart,
          total: totalCost,
          date: new Date().toISOString()
        };

        currentOrders.push(order);
        localStorage.setItem(ordersKey, JSON.stringify(currentOrders));
        localStorage.removeItem(cartKey);
        window.location.href = "checkout.html";
      });
    }
  }

  renderCart();
});
