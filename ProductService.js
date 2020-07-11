
let products = [];
module.exports = {
  init() {
    products.push({
      title: "Товар 1",
      img: "https://i.ibb.co/zfWF2Sw/product1.jpg",
      description: "Краткое описание первого товара",
      descriptionFull: "Полное описание первого товара",
      price: 1000
    });
    products.push({
      title: "Товар 2",
      img: "https://i.ibb.co/C7jxQCW/product2.jpg",
      description: "Краткое описание второго товара",
      descriptionFull: "Полное описание второго товара",
      price: 1500
    });
    products.push({
      title: "Товар 3",
      img: "https://i.ibb.co/Js1JZYs/product3.jpg",
      description: "Краткое описание третьего товара",
      descriptionFull: "Полное описание третьего товара",
      price: 2000
    });
  },

  getProducts() {
    return products;
  }
};
