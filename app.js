const http = require('http');
const fs = require('fs');
const url = require('url');
const ejs = require('ejs');
const ProductService = require('./ProductService.js');
ProductService.init();
const products = ProductService.getProducts();

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
    res.end();
    return;
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
  } else if (pathname.endsWith('product')) {
    console.log('serveProduct1');
    serveIndex(req, res, 'views\\product.ejs');
    return;
  } else {
    serveIndex(req, res, 'views\\index.ejs');
    return;
  }
  res.setHeader('Content-Type', type);

  /* if exist file */
  if (fs.existsSync(path)) {
    try {
      const st = fs.readFileSync(path);
      res.write(st);
    } catch (e) {
      console.log(e);
      serveNotFound(req, res, 500);
    }
  } else {
    serveNotFound(req, res, 404);
  }

  res.end();
}

function serveIndex (req, res, path) {
  console.log('serveIndex');

  const data = {
    product: {
      title: products[0].title,
      imageURL: products[0].img,
      description: products[0].description,
      descriptionFull: products[0].descriptionFull,
      price: products[0].price,
    }
  };

  try {
 /*   const content = fs.readFileSync(path).toString();
    let template = ejs.compile(content);
    const product = template(data);*/

   let product;
     ejs.renderFile(path,data, function (err, html) {
     if (err) {
       console.log("ERROR: " + err);
       return false;
     }
     product = html.toString();
     /*fs.writeFile(path + '.html', html, function (err) {
       if (err) {
         console.log(err);
         return false;
       }
       return true;
     });*/
   });
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.write(product);
    res.end();
  } catch (e) {

    console.log(e);
    serveNotFound(req, res, 500);
  }
}

function serveNotFound (req, res, code) {
  const content = 'Not found ' + code;
  console.log('serveNotFound ' + code);
  res.writeHead(code, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write(content);
  res.end();
}

http.createServer(function (request, response) {
  try {
    console.log('Request, url:', request.url);

    const parsedURL = url.parse(request.url, true);
    console.log('Путь', parsedURL.pathname)
;
    if (parsedURL.pathname.startsWith('/img')) {
      serveStatic(request, response, parsedURL.pathname);
    } else if (parsedURL.pathname.startsWith('/css')) {
      serveStatic(request, response, parsedURL.pathname);
    } else {
      switch (parsedURL.pathname) {
        case '/':
          serveStatic(request, response, parsedURL.pathname);
          break;
        case '/product':
          serveStatic(request, response, parsedURL.pathname);
          break;
        default:
          serveNotFound(request, response, 404);
          break;
      }
    }
  } catch (e) {
    console.log(e);
    serveNotFound(request, response, 500);
  }
}).listen(8000, '127.0.0.1', function () {
  console.log('Сервер начал прослушивание запросов ');
});
