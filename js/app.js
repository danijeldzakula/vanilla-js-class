const productsData = [
  {
    _id: "1",
    title: "Kiwi",
    description: "Lorem ipsum a solve dolors",
    price: 1.99,
  },
  {
    _id: "2",
    title: "Orange",
    description: "Sit amet dolor amet",
    price: 39.99,
  },
  {
    _id: "3",
    title: "Cherry",
    description: "Starivaus mes a bolidas",
    price: 1.59,
  },
  {
    _id: "4",
    title: "Banana",
    description: "When an unknown printer took",
    price: 15.39,
  },
  {
    _id: "5",
    title: "Mango",
    description: "Latest trends in fashion for women.",
    price: 15.39,
  },
  {
    _id: "6",
    title: "Maracuja",
    description: "In Brazil, the term maracujá applies to passion",
    price: 15.39,
  },
  {
    _id: "7",
    title: "Coconut",
    description: "Cocos nucifera is a large palm, growing up to 30 metres",
    price: 15.39,
  },
  {
    _id: "8",
    title: "Cucumber",
    description: "Cucumber Open is the world's leading tool for BDD",
    price: 15.39,
  },
];

const productsDataSecond = [
  {
    _id: "9",
    title: "Peper",
    description: "Lorem ipsum a solve dolors",
    price: 2.99,
  },
];

const cartList = document.getElementById("cart-list");
const totalCount = document.getElementById("total-count");
const totalAmount = document.getElementById("total-amount");
const productsList = document.getElementById("products-list");

const productItems = new ProductsItems(productsList, productsData);
productItems.getLists();
productItems.getCart();
