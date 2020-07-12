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
    } else {
   
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

function getHTML (pathName, scope, res, req) {
  try {
    let htmlStr;
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
    serveNotFound(req, res, 500);
  }
}

function serveIndex (req, res, pathName) {
  console.log('serveIndex');

  const scope = {
    products: products
  };

  getHTML(pathName, scope, res, req);
}

function serveProduct (req, res, path) {
  console.log('serveIndex');

    let key = path.split("-")[0].replace("/product/", "");

  try {
    const scope = {
      product: ProductService.getProductByKey(Number.parseInt(key), products)
    };
    getHTML('views\\product.ejs', scope, res, req);

  } catch (e) {
    console.log(e);
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

let path = parsedURL.pathname;
if(path.startsWith("/product/css/")){
  path = path.replace("/product", "");
}

    console.log('Путь', path);
    if (path.startsWith('/img')) {
      serveStatic(request, response, path);
    } else if (path.startsWith('/css')) {
      serveStatic(request, response, path);
    } else if (path.startsWith('/product')) {
      serveProduct(request, response, path);
    }else if(path==='/'){
      serveIndex(request, response, 'views\\index.ejs');
    } else {
     serveNotFound(request, response, 404);
    }
  } catch (e) {
    console.log(e);
    serveNotFound(request, response, 500);
  }
}).listen(8000, '127.0.0.1', function () {
  console.log('Сервер начал прослушивание запросов ');
});
