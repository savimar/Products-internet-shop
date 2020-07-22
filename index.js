const http = require('http');
const fs = require('fs');
const url = require('url');
const ejs = require('ejs');
const ProductService = require('./ProductService.js');
//const Bundle = require('./public/bundle.js');
//import './public/bundle.js';
let items;
ProductService.getProducts().then(value => {
  items = value;
});

function serveStatic (req, res, pathname) {
  res.statusCode = 200;
  let type;
  let path;
  if (pathname.endsWith('.css')) {
    console.log('serveCSS');
    type = 'text/css';
    path = pathname.slice(1);
  } else if (pathname.endsWith('.jpeg') || pathname.endsWith('.jpg') || pathname.endsWith('.jpg/')) {
    console.log('serveJPG');
    type = 'image/jpeg';
    path = pathname.slice(1);
  } else if (pathname.endsWith('.gif')) {
    console.log('serveGIF');
    type = 'image/gif';
    path = pathname.slice(1);
  } else if (pathname.endsWith('.png')) {
    console.log('servePNG');
    type = 'image/png';
    path = pathname.slice(1);
  } else if (pathname.endsWith('.tiff')) {
    console.log('serveTIFF');
    type = 'image/tiff';
    path = pathname.slice(1);
  } else if (pathname.endsWith('.ico')) {
    console.log('serveFavicon');
    type = 'image/ico';
    path = pathname.slice(1);
  }

  /* if exist file */
  serveSPA(req, res, path, type);

}

function getHTML (pathName, scope, res, req) {
  let htmlStr;
  try {
    //
    /*fs.readFile(pathName, function (err, data) {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.write(data);
      res.end(data, 'binary');
    });*/
    ejs.renderFile(pathName, scope, function (err, html) {
      if (err) {
        console.log('ERROR: ' + err);
        return false;
      }
      htmlStr = html.toString();

    });
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.write(htmlStr);
    res.end();
  } catch (e) {
    console.log(e);
    serveNotFound(req, res, 500, 'Ошибка сервера');
  }
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

function serveIndex (req, res) {
  console.log('serveIndex');

  const scope = {
    products: items
  };

  getHTML('public/pages/spa.html', scope, res, req);
}

async function serveProduct (req, res, path) {
  console.log('serveProduct');

  let arr = path.split('-');
  let key = arr[0].replace('/items/', '');
  let slug = arr[1];
  redirect(req, res, '/items/' + key + '-' + slug);
  // serveSPA(req, res, 'public/bundle.js/products/' + key, 'text/javascript');
  /*let data = await getProduct(key);
  if (data !== null) {
    if(slug !== data.slug){
      redirect(req, res, `/product/${key}-${data.slug}`);
      return;
    }*/
  /*try {
    const scope = {
      product: data
    };
    getHTML('views\\product.ejs', scope, res, req);
  } catch (e) {
    console.log(e);

  }*/
  /*} else {
    serveNotFound(req, res, 500, 'Не найден товар');
  }*/

}

async function getProduct (key) {
  return await ProductService.getProductByKey(Number.parseInt(key))
    .then(value => {
      console.log(value);
      return value;
    });
  //.catch(serveNotFound(req, res, 500, "Не найден товар"));
}

function serveNotFound (req, res, code, message) {
  if (!message) {
    message = 'Not found ' + code;
  }
  console.log('serveNotFound ' + code);
  res.writeHead(code, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write(message);
  res.end();
}

async function serveAPI (req, res, path) {
  let products;
  let arr = path.split('/');

  if (arr.length === 3) {
    products = await ProductService.getProducts();
  } else if (arr.length === 4) {
    let id = arr[3];
    if ((parseInt(id, 16) >= 0 || parseInt(id, 16) < 0) && unescape(encodeURIComponent(id)).length === 24) {
      console.log(parseInt(id, 16));
      products = await ProductService.getProductById(id);
    } else {
      serveNotFound(req, res, 500, 'Ошибка сервера');
      return;
    }
  }
  if (products === null || products === undefined) {
    serveNotFound(req, res, 404, 'Товар не найден');
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.write(JSON.stringify(products));
  res.end();

}

function redirect (req, res, newURL) {
  console.log('redirect ' + newURL);
  res.writeHead(301, {
    Location: newURL,
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end();
}

http.createServer(function (request, response) {
  try {
    console.log('Request, url:', request.url);
    const parsedURL = url.parse(request.url, true);

    let path = parsedURL.pathname;
    console.log('Путь', path);

    if (path.startsWith('/public/img')) {
      serveStatic(request, response, path);
    } else if (path.startsWith('/public/css')) {
      serveStatic(request, response, path);
    } else if (path.startsWith('/items')) {
      serveProduct(request, response, path);
      // redirect(request, response, path);
    } else if (path === '/public/bundle.js') {
      serveSPA(request, response, path.slice(1), 'text/javascript');
    } else if (path === '/favicon.ico') {
      serveStatic(request, response, '/public/img/favicon.ico');
    } else if (path === '/' || path === '/#/') {
      serveSPA(request, response, 'public/spa.html', 'text/html');
    } else if (path.startsWith('/api/product')) {
      serveAPI(request, response, path);
    } else {
      serveNotFound(request, response, 404, 'Файл не найден');
    }
  } catch (e) {
    console.log(e);
    serveNotFound(request, response, 500, 'Ошибка сервера');
  }
}).listen(8000, '127.0.0.1', function () {
  console.log('Сервер начал прослушивание запросов ');
});
