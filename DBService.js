const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const lodash = require('lodash');
let url = 'mongodb://localhost:27017';
module.exports = {

  updateProduct: function (id, patch) {
    lodash.omit(patch, id);
    lodash.set(patch, 'key', Number.parseInt(patch['key']));
    return new Promise((resolve, reject) => {
      MongoClient
        .connect(url, function (err, client) {
          if (err) {
            reject(err);
          }
          client
            .db('shop')
            .collection('product')
            .findOneAndUpdate(
              { _id: mongodb.ObjectID(id) },
              {
                $set: patch
              },
              {
                new: true
              }, function (err, results) {
                if (err) {
                  console.log(err);
                  reject(err);
                }
                client.close();

              });

        });
      resolve(this.getProductById(id));

    });

  },

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
            .find({ _id: mongodb.ObjectID(productId) }).toArray(
            function (err, results) {
              if (err) {
                console.log(err.message());
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

  getProductByWhere: function (where) {
    let key = Object.getOwnPropertyNames(where)[0];
    if (key === 'key') {
      where = {
        key: Number.parseInt(where[key])
      };
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
            .find(where).toArray(
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

  }

  ,

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
          img: '\/public\/img\/product2\.jpg',
          description: 'Краткое описание второго товара',
          descriptionFull: 'Полное описание второго товара',
          key: 750,
          price: 1500,
          slug: 'program'
        },
        {
          title: 'Товар 3',
          img: '\/public\/img\/product3\.jpg',
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
  },
  createProduct: function (body) {
    lodash.set(body, 'key', Number.parseInt(body['key']));
    lodash.set(body, 'price', Number.parseInt(body['price']));
    return new Promise((resolve, reject) => {
      MongoClient
        .connect(url, function (err, client) {
          if (err) {
            reject(err);
          }
          client
            .db('shop')
            .collection('product')
            .insertOne(
              body, {},
              function (err, results) {
                if (err) {
                  console.log(err);
                  reject(err);
                }
                console.log('Добавлены данные');
                client.close();
                resolve(results);
              });
        });
    });
  },


  getUsers: function () {
    function createItems () {
      return [
        {
          name: 'Admin',
          role: 'admin',
          email: 'admin@mail.con',
          key: 300,
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
            .collection('user')
            .find()
            .sort({ key: 1 })
            .toArray(function (err, results) {
              if (err) {
                reject(err);
              }
              console.log('Получены данные');
              console.log(results);
              if (results.length === 0) {
                createDB(client.db('shop').collection('user'));
              }
              client.close();
              resolve(results);

            });
        });
    });
  },
  getUserByEmail: function (email) {
    return new Promise((resolve, reject) => {
      MongoClient
        .connect(url, function (err, client) {
          if (err) {
            reject(err);
          }
          client
            .db('shop')
            .collection('user')
            .findOne({ email: email },
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
};







