const http = require('http');
const fs = require('fs');
const url = require('url');
const ProductService = require('./ProductService.js');
const queryString = require('query-string');



async function serveStatic (req, res, pathname) {
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
  await serveSPA(req, res, path, type);

}


async function serveSPA (req, res, path, type) {
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
  console.log('serveNotFound ' + code);
  res.writeHead(code, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write(message);
  res.end();
}

async function serveAPI (req, res, path) {
  let products;
  const parsed = queryString.parseUrl(path);
  if (Object.keys(parsed.query).length === 0) {
    products = await ProductService.getProducts();
  } else if (Object.keys(parsed.query).length === 1) {
    products = await ProductService.getProductByWhere(parsed.query);
  } else {
    serveNotFound(req, res, 500, 'Ошибка сервера');
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.write(JSON.stringify(products));
  res.end();

}


const server = http.createServer();

server.on('request', async (request, response) => {
  try {
    console.log('Request, url:', request.url);
    const parsedURL = url.parse(request.url, true);

    let path = parsedURL.pathname;
    console.log('Путь', path);

    if (path.startsWith('/public/img')) {
     await serveStatic(request, response, path);
    } else if (path.startsWith('/public/css')) {
      await serveStatic(request, response, path);
    } else if (path.startsWith('/items')) {
      await serveAPI(request, response, path);
    } else if (path === '/public/bundle.js') {
      serveSPA(request, response, path.slice(1), 'text/javascript');
    } else if (path === '/favicon.ico') {
     await serveStatic(request, response, '/public/img/favicon.ico');
    } else if (path === '/' || path === '/#/') {
      serveSPA(request, response, 'public/spa.html', 'text/html');
    } else if (path.startsWith('/api/product')) {
      await serveAPI(request, response, request.url);
    } else {
      serveNotFound(request, response, 404, 'Файл не найден');
    }
  } catch (e) {
    console.log(e);
    serveNotFound(request, response, 500, 'Ошибка сервера');
  }
});
server.listen(8000, '127.0.0.1', function () {
  console.log('Сервер начал прослушивание запросов ');
});
