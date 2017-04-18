var express = require('express');

var app = express();

app.set('views', './public');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(8080, function () {
  console.log('Server started');
})
