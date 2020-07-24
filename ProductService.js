const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017';
module.exports = {

  getProductById: function (productId) {

    return new Promise((resolve, reject) => {
      MongoClient
        .connect(url, function (err, client) {
          if (err) {
            reject(err);
          }
          client
            .db('shop')
            .collection('product')
            .findOne({ _id: mongodb.ObjectID(productId)},
            (function (err, results) {
              if (err) {
                console.log(err.message());
                reject(err);
              }
              console.log('Получены данные');
              console.log(results);
              client.close();
              resolve(results);
            }));

        });
    });

  },

  getProductByKey: function (key) {
    return new Promise((resolve, reject) => {
      MongoClient
        .connect(url, function (err, client) {
          if (err) {
            reject(err);
          }
          client
            .db('shop')
            .collection('product')
            .findOne({ key: key },
              function (err, results) {
                if (err) {
                  reject(err);
                }
                console.log('Получены данные');
                console.log(results);
                client.close();
                resolve(results);
              });

        });
    });

  },

  getProducts: function () {
    function createItems () {
      return [
        {
          title: 'Товар 1',
          img: '\/public\/img\/product1\.jpg',
          description: 'Краткое описание первого товара',
          descriptionFull: 'Полное описание первого товара',
          key: 500,
          price: 1000,
          slug: 'bag'
        },
        {
          title: 'Товар 2',
          img: '/public\/img\/product2\.jpg',
          description: 'Краткое описание второго товара',
          descriptionFull: 'Полное описание второго товара',
          key: 750,
          price: 1500,
          slug: 'program'
        },
        {
          title: 'Товар 3',
          img: '/public\/img\/product3\.jpg',
          description: 'Краткое описание третьего товара',
          descriptionFull: 'Полное описание третьего товара',
          key: 1000,
          price: 2000,
          slug: 'light'
        }];
    }

    function createDB (collection) {
      /* collection.drop(function (err, result) {
         if (err) return console.log(err);
         console.log('Удалена БД');
       });*/
      let creating = createItems();
      collection.insertMany(creating, function (err, results) {
        if (err) return console.log(err);
        console.log('Создана БД');
        console.log(results);

      });
    }

    return new Promise((resolve, reject) => {
      MongoClient
        .connect(url, function (err, client) {
          if (err) {
            reject(err);
          }
          client
            .db('shop')
            .collection('product')
            .find()
            .sort({ key: 1 })
            .toArray(function (err, results) {
              if (err) {
                reject(err);
              }
              console.log('Получены данные');
              console.log(results);
              if (results.length === 0) {
                createDB(client.db('shop').collection('product'));
              }
              client.close();
              resolve(results);

            });
        });
    });
  }
};






