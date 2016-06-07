var express = require('express');
var app = express();

app.use(express.static(__dirname + '/assets'));

var port = process.env.PORT || 7777;

app.listen(port, function(err) {
    if (err) throw err;
    console.log('server running at http://127.0.0.1:' + port);
});
