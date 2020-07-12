
let products = [];
module.exports = {
  init() {
    products.push({
      title: "Товар 1",
      img: "https://i.ibb.co/zfWF2Sw/product1.jpg",
      description: "Краткое описание первого товара",
      descriptionFull: "Полное описание первого товара",
      price: 1000,
      slug : "bag"
    });
    products.push({
      title: "Товар 2",
      img: "https://i.ibb.co/C7jxQCW/product2.jpg",
      description: "Краткое описание второго товара",
      descriptionFull: "Полное описание второго товара",
      price: 1500,
      slug : "program"
    });
    products.push({
      title: "Товар 3",
      img: "https://i.ibb.co/Js1JZYs/product3.jpg",
      description: "Краткое описание третьего товара",
      descriptionFull: "Полное описание третьего товара",
      price: 2000,
      slug : "light"
    });
  },

  getProducts: function () {
    return products;
  },

  getProductByKey(key, array){
    if(key>= array.length) {
      throw new Error("No index in array");
    }
    for (let i = 0; i < array.length; i++) {
      if (i === key) {
        return array[i];
      }
    }
  }
};
