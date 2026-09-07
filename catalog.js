let cart = [];

function addToCart(name, price) {
    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    const cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒
                <p>Кошик порожній</p>
            </div>
        `;

        totalElement.textContent = "0";
        cartCount.textContent = "0 товарів";
        return;
    }

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">
                        ${item.price} грн × ${item.quantity}
                    </div>
                </div>

                <div class="quantity">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <strong>${item.price * item.quantity} грн</strong>

                <button class="remove" onclick="removeItem(${index})">
                    Видалити
                </button>
            </div>
        `;
    });

    totalElement.textContent = total;
    cartCount.textContent = `${count} товарів`;
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function makeOrder() {
    if (cart.length === 0) {
        alert("🛒 Кошик порожній!");
        return;
    }

    const name = prompt("Введіть ваше ім'я:");

    if (!name) return;

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(
        `☕ Дякуємо, ${name}!\n\n` +
        `Ваше замовлення прийнято!\n` +
        `Сума: ${total} грн`
    );

    cart = [];
    updateCart();
}

function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

updateCart();