const fs = require('fs');
const DBService = require('./DBService.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonBodyParser = bodyParser('json');
app.use(jsonBodyParser);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require("jsonwebtoken");
const SECRET = "t5ry5r546lmklbvhohjip@r";



var path = require('path');
app.use('/public/img', express.static(path.join(__dirname, '/public/img')));
app.use('/public/css', express.static(path.join(__dirname, '/public/css')));
/*app.use('/public/img/favicon.ico', express.static(path.join(__dirname, '/public/img/favicon.ico')));*/

app.listen(8000, function () {
  console.log('Сервер начал прослушивание запросов ');
});

app.get('/', function (request, response) {
  serveSPA(request, response, 'public/spa.html', 'text/html');
});
app.get('/panel', function (request, response) {
  serveSPA(request, response, 'public/spa.html', 'text/html');
});
app.get('/api/product', async function (request, response, next) {
  await serveOneProduct(request, response);
  next();
});
app.get('/product/:key_and_slug', function (request, response) {
  serveSPA(request, response, 'public/spa.html', 'text/html');
});
app.get('/api/login2', function (request, response) {
  response.cookie('user', 'spa@gmail.con', {
    path: '/',
    encode: String
  });
  response.sendStatus(200);
  response.end;
});
app.get('/api/login', async function (request, response) {
  let users = await DBService.getUsers();
  response.status(200);
  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    const payload = {
      email: user.email
    };
    const token = jwt.sign(payload, SECRET, {
      expiresIn: "5m"
    });
    response.cookie( 'token', token, {
      path: '/',
      encode: String
    });
   }


  /*for (let i = 0; i < users.length; i++) {
    let user = users[i];
     response.cookie(user.name, user.email, {
      path: '/',
      encode: String
    });
   }*/

  /*response.header(
    'Set-Cookie', 'user = spa@gmail.con; path=/'
  );*/
  response.end();
});
app.get('/api/me', async function (request, response) {
  let result = undefined;
  for (const [key, value] of Object.entries(request.cookies)) {
    let user = await DBService.getUserByEmail(value);
    if (user !== null && key === user.name) {
      result = value;
    }
  }
  if (result !== undefined) {
    response.send(result);
  } else {
    response.sendStatus(403);
  }
  response.end;
});
app.get('/public/bundle.js', function (request, response) {
  serveSPA(request, response, 'public/bundle.js', 'text/javascript');
});
app.put('/api/product/:id', async function (request, response) {
  let result = await DBService.updateProduct(request.params.id, request.body);
  response.json(result);
});
app.post('/api/product', async function (request, response) {
  let result = await DBService.createProduct(request.body);
  response.json(result.ops[0]);

});
app.get('/api/products', async function (request, response) {
  await serveProducts(request, response);
});
app.use(serveNotFound);

function serveSPA (req, res, path, type) {
  console.log('serveSpa');
  res.setHeader('Content-Type', type);
  try {
    fs.readFile(path, function (err, data) {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
      res.write(data);
      res.end(data, 'binary');
    });
  } catch (e) {
    console.log(e);
    serveNotFound(req, res, 404, 'Не найден файл' + type);
  }
}

function serveNotFound (req, res, code, message) {
  if (!message) {
    message = 'Not found ' + code;
  }
  console.log(message + code);
  res.send(message);
}

async function serveProducts (req, res) {
  let products;
  try {
    products = await DBService.getProducts();
    res.json(products);
  } catch (e) {
    serveNotFound(req, res, 500, 'Ошибка сервера');
  }
}

async function serveOneProduct (req, res/*, params*/) {
  let product;
  const parsed = req.query;
  let key = Object.getOwnPropertyNames(parsed)[0];
  try {
    let id = parsed[key];
    if (key === 'id') {
      if ((parseInt(id, 16) >= 0 || parseInt(id, 16) < 0) && unescape(encodeURIComponent(id)).length === 24) {
        product = await DBService.getProductById(id);
      } else {
        serveNotFound(req, res, 500, 'Ошибка сервера');
        return;
      }
    } else {
      product = await DBService.getProductByWhere(parsed);
    }
    res.json(product);
  } catch (e) {
    serveNotFound(req, res, 500, 'Ошибка сервера');
  }

}


