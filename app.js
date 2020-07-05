const http = require('http');
const fs = require('fs');

function serve(req, res, type, path, func) {
    console.log(func);
    res.statusCode = 200;
    res.setHeader("Content-Type", type);
    //  let st = fs.createReadStream(__dirname + "\\"+ path, 'utf-8');
    //  st.pipe(res);
    let st = fs.readFileSync(path);
    res.write(st);
    res.end();
}

function serveHTML(req, res, path) {
    serve(req, res, "text/html", path, "serveHTML");
}

function serveCSS(req, res, path) {
    serve(req, res, "text/css", path, "serveCSS");
}

function serveImage(req, res, path) {
    serve(req, res, "image/jpeg", path, "serveImage");
}

function serveNotFound(req, res) {
    let content = "Not found";
    console.log("serveNotFound");
    res.writeHead(404, {
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
        serveImage(request, response, parsedURL.pathname.slice(1));
    } else if (parsedURL.pathname.startsWith("/css")) {
        serveCSS(request, response, parsedURL.pathname.slice(1));
    } else {

        switch (parsedURL.pathname) {
            case "/":
                serveHTML(request, response, "html\\index.html");
                break;
            case "/product1":
                serveHTML(request, response, "html\\product1.html");
                break;
            case "/product2":
                serveHTML(request, response, "html\\product2.html");
                break;
            default:
                serveNotFound(request, response);
                break;

        }
    }


}).listen(8000, "127.0.0.1", function () {
    console.log("Сервер начал прослушивание запросов ");
});

