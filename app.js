const http = require('http');
const fs = require('fs');

function serveStatic(req, res, pathname) {

    res.statusCode = 200;
    let type;
    let path;
    if (pathname.endsWith(".css")) {
        console.log("serveCSS");
        type = "text/css";
        path = pathname.slice(1);
    } else if (pathname.endsWith(".jpeg") || pathname.endsWith(".jpg")) {
        console.log("serveJPG");
        type = "image/jpeg";
        path = pathname.slice(1);
    } else if (pathname.endsWith(".gif")) {
        console.log("serveGIF");
        type = "image/gif";
        path = pathname.slice(1);
    } else if (pathname.endsWith(".png")) {
        console.log("servePNG");
        type = "image/png";
        path = pathname.slice(1);
    } else if (pathname.endsWith(".tiff")) {
        console.log("serveTIFF");
        type = "image/tiff";
        path = pathname.slice(1);
    } else if (pathname.endsWith("product1")) {
        console.log("serveProduct1");
        type = "text/html";
        path = "html\\product1.html";
    } else if (pathname.endsWith("product2")) {
        console.log("serveProduct2");
        type = "text/html";
        path = "html\\product2.html";
    } else {

        type = "text/html";
        path = "html\\index.html";
    }

    res.setHeader("Content-Type", type);

    /*if exist file*/
    if (fs.existsSync(path)) {
        try {
            let st = fs.readFileSync(path);
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


function serveNotFound(req, res, code) {
    let content = "Not found " + code;
    console.log("serveNotFound");
    res.writeHead(code, {
        "Content-Type": "text/html; charset=utf-8"
    });
    res.write(content);
    res.end();


}

http.createServer(function (request, response) {

    if (response.rel === "shortcut icon") {
        href = "#";
    }
    console.log("Request, url:", request.url);

    const URL = require("url");
    const parsedURL = URL.parse(request.url, true);
    console.log("Путь", parsedURL.pathname);

    if (parsedURL.pathname.startsWith("/img")) {
        serveStatic(request, response, parsedURL.pathname);
    } else if (parsedURL.pathname.startsWith("/css")) {
        serveStatic(request, response, parsedURL.pathname);
    } else {

        switch (parsedURL.pathname) {
            case "/":
                serveStatic(request, response, parsedURL.pathname);
                break;
            case "/product1":
                serveStatic(request, response, parsedURL.pathname);
                break;
            case "/product2":
                serveStatic(request, response, parsedURL.pathname);
                break;
            default:
                serveNotFound(request, response);
                break;

        }
    }


}).listen(8000, "127.0.0.1", function () {
    console.log("Сервер начал прослушивание запросов ");
});

