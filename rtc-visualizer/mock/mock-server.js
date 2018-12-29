const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Or /resources in general
router.render = function (req, res) {
    if (req.method === 'POST') {
        let urlToCall = req.body.url;
        if(urlToCall && urlToCall.indexOf("https://ccm001-jazzx.sii24.pole-emploi.intra:9443/ccm") != -1) {
            urlToCall = urlToCall.replace("https://ccm001-jazzx.sii24.pole-emploi.intra:9443/ccm", "");
            urlToCall = urlToCall.replace("?fields=", "/");
            const postStartBracket = urlToCall.indexOf("[");
            if(postStartBracket != -1) {
                // + '?dummy=' + encodeURIComponent(urlToCall.substr(postStartBracket + 1));
                urlToCall = '/' + urlToCall.substr(1, postStartBracket - 1).replace(/\//g, "-");
            }
            req.method = 'GET';
            req.url = urlToCall;
            req.body = {};
            
            res.redirect(req.url);
            return;
        }
    } 
    
    res.jsonp(res.locals.data);
    
}

server.use(jsonServer.bodyParser);

// Use default router
server.use(router);
server.listen(1337, () => {
  console.log('JSON Server is running')
});
