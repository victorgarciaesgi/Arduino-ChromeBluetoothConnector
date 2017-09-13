const EXPRESS       = require('express');
const APP           = EXPRESS();
const fs            = require('fs');
const SERVER        = require('http').Server(APP);
const IO            = require('socket.io')(SERVER);
const BodyParser    = require('body-parser');
const shortid       = require('shortid');
const MD5           = require('md5');
const ROUTER        = EXPRESS.Router();
const PORT = process.env.PORT || 5000;
APP.use(EXPRESS.static(__dirname + '/public'));
APP.use('/', ROUTER);
ROUTER.get('/', function(req, res) {
  fs.readFile('./public/templates/index.html', function (err, html) {
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':html.length});
        res.write(html);
        res.end();
  })
});







APP.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Namespace de chat
