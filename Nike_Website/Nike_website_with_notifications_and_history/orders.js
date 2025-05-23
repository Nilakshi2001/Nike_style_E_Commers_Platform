document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("order-history");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    container.innerHTML = "<p>Please log in to view your order history.</p>";
    return;
  }

  const orders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

  if (orders.length === 0) {
    container.innerHTML = "<p>You haven't placed any orders yet.</p>";
    return;
  }

  container.innerHTML = orders.map((order, i) => {
    const itemsHtml = order.items.map(item => `
      <li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>
    `).join("");
    const shipping = order.shipping || {};
    return `
      <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px;">
        <h3>Order #${i + 1} - ${new Date(order.date).toLocaleString()}</h3>
        <ul>${itemsHtml}</ul>
        <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
        <p><strong>Shipping To:</strong><br>
        ${shipping.name || "N/A"}<br>
        ${shipping.email || ""}<br>
        ${shipping.phone || ""}<br>
        ${shipping.address || ""}</p>
      </div>
    `;
  }).join("");
});
