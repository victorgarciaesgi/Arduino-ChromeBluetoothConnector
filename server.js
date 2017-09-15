const EXPRESS       = require('express');
const APP           = EXPRESS();
const SERVER        = require('http').Server(APP);
const fs = require('fs');
const BodyParser    = require('body-parser');
const ROUTER        = EXPRESS.Router();
const PORT = process.env.PORT || 5000;
APP.use(EXPRESS.static(__dirname + '/public'));
APP.use('/', ROUTER);
ROUTER.get('/', function(req, res) {
  fs.readFile('./index.html', function (err, html) {
    res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
  })
});







APP.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Namespace de chat
