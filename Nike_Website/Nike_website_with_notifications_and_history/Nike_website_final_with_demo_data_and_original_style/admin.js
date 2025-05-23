document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("admin-orders");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.email !== "admin@nike.com") {
    container.innerHTML = "<p>Access Denied. Admins only.</p>";
    return;
  }

  function getAllOrders() {
    let ordersData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("orders_")) {
        const email = key.replace("orders_", "");
        const orders = JSON.parse(localStorage.getItem(key));
        ordersData.push({ email, orders });
      }
    }
    return ordersData;
  }

  const allOrders = getAllOrders();

  if (allOrders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  container.innerHTML = allOrders.map(userOrders => {
    return `
      <div style="border: 2px solid #333; padding: 15px; margin-bottom: 20px;">
        <h3>User: ${userOrders.email}</h3>
        ${userOrders.orders.map((order, index) => {
          const itemsHtml = order.items.map(item => `
            <li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>
          `).join("");
          const shipping = order.shipping || {};
          return `
            <div style="border: 1px dashed #666; padding: 10px; margin-top: 10px;">
              <strong>Order #${index + 1} - ${new Date(order.date).toLocaleString()}</strong>
              <ul>${itemsHtml}</ul>
              <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
              <p><strong>Shipping:</strong><br>
                ${shipping.name || "N/A"}<br>
                ${shipping.email || ""}<br>
                ${shipping.phone || ""}<br>
                ${shipping.address || ""}
              </p>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }).join("");
});
