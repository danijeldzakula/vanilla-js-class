const CART_STORAGE_KEY = "cart";

class ProductsItems {
  constructor(selector, products) {
    this.selector = selector;
    this.products = products;
    this.cart = LocalStorageHandler.get(CART_STORAGE_KEY) || [];
  }

  add(product) {
    const findProduct = this.getProductById(product._id);

    if (!findProduct) {
      this.cart.push({ ...product, qty: 1 });
      this.setCartActions();
      return false;
    }

    findProduct.qty = findProduct.qty + 1;
    this.setCartActions();
  }

  remove(id) {
    const product = this.getFilteredProductById(id);
    this.cart = product;
    this.setCartActions();
  }

  decrement(id, qty) {
    const findProduct = this.getProductById(id);
    findProduct.qty = qty;
    this.setCartActions();
  }

  increment(id, qty) {
    const findProduct = this.getProductById(id);
    findProduct.qty = qty;
    this.setCartActions();
  }

  setCartActions() {
    this.getCart();
    this.setStorage();
    this.getTotalCount();
    this.getTotalAmount();
  }

  setStorage() {
    LocalStorageHandler.set(CART_STORAGE_KEY, this.cart);
  }

  getCart() {
    return this.cart;
  }

  getTotalCount() {
    const totalCount = this.cart.reduce((acc, curr) => {
      return acc + curr.qty;
    }, 0);

    return totalCount;
  }

  getTotalAmount() {
    const totalAmount = this.cart.reduce((acc, curr) => {
      const itemValue = curr.price * curr.qty;
      return acc + itemValue;
    }, 0);

    return CurrencyFormat.get("en-US", "currency", "USD", totalAmount);
  }

  getProductById(id) {
    return this.cart.find((item) => item._id === id);
  }

  getFilteredProductById(id) {
    return this.cart.filter((item) => item._id !== id);
  }

  addEventListeners(action, element) {
    switch (action) {
      case "add":
        const buttonsAddToCart = this.selector.querySelectorAll(".add-to-cart");

        for (const button of buttonsAddToCart) {
          button.addEventListener("click", (event) => {
            const { productId } = event.target.dataset;
            const findProduct = this.products.find((p) => p._id === productId);

            this.add(findProduct);
            this.getCart();
          });
        }

        break;
      case "cart":
        const btnRemoveCart = element.querySelectorAll(".remove-from-cart");
        const btnDecrementCart = element.querySelectorAll(".btn-decrement");
        const btnIncrementCart = element.querySelectorAll(".btn-increment");

        for (const button of btnRemoveCart) {
          button.addEventListener("click", (event) => {
            const { productId } = event.target.dataset;
            this.remove(productId);
            this.getCart();
          });
        }

        for (const button of btnDecrementCart) {
          button.addEventListener("click", (event) => {
            const { productDecrement, productCount } = event.target.dataset;
            console.log(productDecrement, productCount);

            if (+productCount <= 1) {
              return false;
            }

            const qty = +productCount - 1;
            this.decrement(productDecrement, qty);
            this.getCart();
          });
        }

        for (const button of btnIncrementCart) {
          button.addEventListener("click", (event) => {
            const { productIncrement, productCount } = event.target.dataset;

            const qty = +productCount + 1;
            this.increment(productIncrement, qty);
            this.getCart();
          });
        }
        break;
      default:
        console.log("default");
    }
  }

  getLists() {
    let template = "";

    for (const product of this.products) {
      template += `
        <div class="card" id="card_${product._id}">
            <div class="card-header">
                <h4>${product.title}</h4>
                <p>Price: $${product.price}</p>
            </div>

            <div class="card-body">
                <p>${product.description}</p>
            </div>

            <div class="card-footer">
                <button class="add-to-cart btn-primary block w-full" data-product-id="${product._id}">Add to cart</button>
            </div>
        </div>
      `;
    }

    this.selector.innerHTML = template;
    this.addEventListeners("add", null);
  }

  getCart() {
    const cartList = document.getElementById("cart-list");

    const totalCount = document.getElementById("total-count");
    const count = this.getTotalCount();
    totalCount.innerHTML = count;

    const totalAmount = document.getElementById("total-amount");
    const amount = this.getTotalAmount();
    totalAmount.innerHTML = amount;

    let template = "";

    for (const product of this.cart) {
      template += `
        <div class="card-list" id="card_${product._id}">
            <div class="left">
                <h4>${product.title}</h4>
                <p>${product.description}</p>
            </div>
            <div class="right">
                <div class="counter">
                    <button class="btn-info btn-decrement" data-product-decrement="${product._id}" data-product-count="${product.qty}">-</button>
                    <span class="qty">${product.qty}</span>
                    <button class="btn-info btn-increment" data-product-increment="${product._id}" data-product-count="${product.qty}">+</button>
                </div>
                <p>Price: $${product.price}</p>
                <button class="remove-from-cart btn-danger" data-product-id="${product._id}" data-product-count="${product.qty}">Remove</button>
            </div>
        </div>
        `;
    }

    cartList.innerHTML = template;
    this.addEventListeners("cart", cartList);
  }
}
