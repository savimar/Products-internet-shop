
let products = [];
module.exports = {
  init() {
    products.push({
      title: "Товар 1",
      img: "https://i.ibb.co/zfWF2Sw/product1.jpg",
      description: "Краткое описание первого товара",
      full: "Полное описание первого товара",
      price: 1000
    });
    products.push({
      title: "Товар 2",
      img: "https://i.ibb.co/C7jxQCW/product2.jpg",
      description: "Краткое описание второго товара",
      full: "Полное описание второго товара",
      price: 1500
    });
  },

  getProducts() {
    return products;
  }
};
