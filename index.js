const fs = require('fs');
const DBService = require('./DBService.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonBodyParser = bodyParser('json');
app.use(jsonBodyParser);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require('jsonwebtoken');
const SECRET = 't5ry5r546lmklbvhohjip@r';
const bcrypt = require('bcrypt');
const saltRounds = 10;

var path = require('path');

const serverError = 'Ошибка сервера';
const serverMessage = 'Сервер начал прослушивание запросов';
const pathSPA = 'public/spa.html';
const pathIMG = '/public/img';
const pathCSS = '/public/css';
const pathFavicon = '/public/img/favicon.ico';
const textHtml = 'text/html';
const wrongDataForAuth = 'Неправильные данные для авторизации';


app.use(pathIMG, express.static(path.join(__dirname, pathIMG)));
app.use(pathCSS, express.static(path.join(__dirname, pathCSS)));
app.use(pathFavicon, express.static(path.join(__dirname, pathFavicon)));

app.listen(8000, function () {
  console.log(serverMessage);
});
//index
app.get('/', function (request, response) {
  serveSPA(request, response, pathSPA , textHtml);
});
//protected pages
app.get('/panel', function (request, response) {
  serveSPA(request, response, pathSPA, textHtml);
});
//get product id for updating
app.get('/api/product', async function (request, response) {
  await serveOneProduct(request, response);
});
//get one product  for view
app.get('/product/:key_and_slug', function (request, response) {
  serveSPA(request, response, pathSPA, textHtml);
});
app.get('/api/login2', function (request, response) {
  response.cookie('user', 'spa@gmail.con', {
    path: '/',
    encode: String
  });
  response.sendStatus(200);
  response.end;
});


//set passwordHash for user http://127.0.0.1:8000/api/bcrypt?email=admin@mail.con&password=123456
app.get('/api/bcrypt', async function (request, response) {
  await setPasswordHash(request, response);

});

//return token for auth http://127.0.0.1:8000/api/login?email=admin@mail.con&password=123456
app.post('/api/login', async function (request, response) {
  let result = await getToken(response, request);
  response.json(result);
});
//verify token for auth
app.get('/api/me', verifyToken);
app.get('/api/me', async function (request, response) {
  response.send(request.email);
});

app.get('/public/bundle.js', function (request, response) {
  serveSPA(request, response, 'public/bundle.js', 'text/javascript');
});
//update product
app.put('/api/product/:id', verifyToken);
app.put('/api/product/:id', async function (request, response) {
  if (response.statusCode === 200) {
    let result = await DBService.updateProduct(request.params.id, request.body);
    response.json(result);
  } else {
    response.json(response.statusText);
  }
});

//create product
app.post('/api/product', verifyToken);
app.post('/api/product', async function (request, response) {
  if (response.statusCode === 200) {
    let result = await DBService.createProduct(request.body);
    response.json(result.ops[0]);
  } else {
    response.json(response.statusText);
  }
});

//get all products
app.get('/api/products', async function (request, response) {
  await serveProducts(request, response);
});
app.use(serveNotFound);



async function setPasswordHash (request, response) {
  try {
    const query = request.query;
    if (Object.keys(query).length > 0 && query.email !== undefined && query.password !== undefined) {
      const user = await DBService.getUserByEmail(query.email);
      user.passwordHash = await bcrypt.hash(query.password, saltRounds);
      await DBService.updateUser(user._id, user);
      response.sendStatus(200);
    } else {
      response.sendStatus(403);
    }
  } catch (e) {
    response.sendStatus(403);
  } finally {
    response.end;
  }
}

async function getToken (response, request) {
  let users = await DBService.getUsers();
  response.status(200);
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    const payload = {
      email: user.email
    };
    const token = jwt.sign(payload, SECRET, {
      expiresIn: '5m'
    });
    const query = request.body;
    if (Object.keys(query).length > 0
      && query.login !== undefined
      && query.password !== undefined
      && query.login === user.email) {
      const result = await bcrypt.compare(query.password, user.passwordHash);
      if (result) {
        response.cookie('token', token, {
          path: '/',
          encode: String
        });
         return user;
      }
    } else {
      response.status(403);
      response.send(wrongDataForAuth);
    }
  }
  response.end();
}

async function verifyToken (request, response, next) {
  response.status(403);
  for (const [key, value] of Object.entries(request.cookies)) {
    if (key === 'token') {
      try {
        const payload = jwt.verify(value, SECRET);
        if (payload.email !== undefined) {
          const user = await DBService.getUserByEmail(payload.email);
          if (user != null || user !== undefined) {
            response.status(200);
            request.email = user.email;
          }
        }
      } catch (err) {
        response.status(403).send({ err });
      }
    }
  }
  response.end;
  next();
}

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
    serveNotFound(req, res, 500, serverError);
  }
}

async function serveOneProduct (req, res/*, params*/) {
  let product;
  const parsed = req.query;
  let key = Object.getOwnPropertyNames(parsed)[0];
  try {
    let id = parsed[key];
    if (key === 'id') {
      //check id : id must be Hex number and its length===24
      if ((parseInt(id, 16) >= 0 || parseInt(id, 16) < 0) && unescape(encodeURIComponent(id)).length === 24) {
        product = await DBService.getProductById(id);
      } else {
        serveNotFound(req, res, 500, serverError);
        return;
      }
    } else {
      product = await DBService.getProductByWhere(parsed);
    }
    res.json(product);
  } catch (e) {
    serveNotFound(req, res, 500, serverError);
  }

}


