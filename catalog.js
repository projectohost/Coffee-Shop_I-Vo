const menu = {
  coffee: [
    {
      name: "Еспресо",
      price: 45,
      img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600",
    },
    {
      name: "Американо",
      price: 50,
      img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600",
    },
    {
      name: "Капучино",
      price: 65,
      img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600",
    },
    {
      name: "Лате",
      price: 70,
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    },
    {
      name: "Мокачино",
      price: 75,
      img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600",
    },
    {
      name: "Раф",
      price: 80,
      img: "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=600",
    },
    {
      name: "Флет Вайт",
      price: 75,
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600",
    },
    {
      name: "Карамельна кава",
      price: 85,
      img: " https://images.unsplash.com/photo-1779425082269-48ebb43db86a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    },
    {
      name: "Ванільне лате",
      price: 85,
      img: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=600",
    },
    {
      name: "Айс-лате",
      price: 80,
      img: "https://images.unsplash.com/photo-1462917882517-e150004895fa?w=600",
    },
  ],
  sweets: [
    {
      name: "Чізкейк",
      price: 95,
      img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600",
    },
    {
      name: "Пончик",
      price: 45,
      img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600",
    },
    {
      name: "Печиво",
      price: 35,
      img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
    },
    {
      name: "Капкейк",
      price: 55,
      img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600",
    },
    {
      name: "Брауні",
      price: 70,
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
    },
    {
      name: "Круасан",
      price: 50,
      img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
    },
    {
      name: "Панакота",
      price: 75,
      img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
    },
    {
      name: "Яблучний пиріг",
      price: 65,
      img: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600",
    },
    {
      name: "Полуничний тарт",
      price: 85,
      img: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=600",
    },
    {
      name: "Тірамісу",
      price: 90,
      img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600",
    },
    {
      name: "Крендель",
      price: 45,
      img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600",
    },
    {
      name: "Медовик",
      price: 80,
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    },
  ],
};

let cart = [];

function renderProducts(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
        <div class="product">
            <img src="${item.img}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>${item.price} грн</p>
            <button onclick="addToCart('${item.name}', ${item.price})">Додати</button>
        </div>
    `,
    )
    .join("");
}

function renderMenu() {
  renderProducts("coffeeProducts", menu.coffee);
  renderProducts("sweetsProducts", menu.sweets);
}

function addToCart(name, price) {
  let item = cart.find((product) => product.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
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

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  alert(
    `☕ Дякуємо, ${name}!\n\n` +
      `Ваше замовлення прийнято!\n` +
      `Сума: ${total} грн`,
  );

  cart = [];
  updateCart();
}

function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({
    behavior: "smooth",
  });
}

renderMenu();
updateCart();






const buttons = document.querySelectorAll(".nav-buttons button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
    });