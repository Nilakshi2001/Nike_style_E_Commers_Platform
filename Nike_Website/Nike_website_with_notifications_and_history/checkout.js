document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shipping-form");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please log in to proceed with checkout.");
    window.location.href = "login.html";
    return;
  }

  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    window.location.href = "cart.html";
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const shippingInfo = Object.fromEntries(formData.entries());

    const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
      items: cart,
      total: totalCost,
      date: new Date().toISOString(),
      shipping: shippingInfo
    };

    const ordersKey = `orders_${user.email}`;
    const currentOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
    currentOrders.push(order);
    localStorage.setItem(ordersKey, JSON.stringify(currentOrders));

    localStorage.removeItem(cartKey);
    alert("Order placed successfully with shipping info!");
    window.location.href = "orders.html";
  });
});
