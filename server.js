var express = require('express');
var bodyParser = require('body-parser');

var products = require('./api/products');
var nextId = 4;

var app = express();

app.set('views', './public');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache');
	next();
})

app.get('/api/products', (req, res) => {
	res.send(products);
})

app.post('/api/products', (req, res) => {
	let product = {
		id: nextId++,
		title: req.body.title,
		completed: false
	};
	products.push(product);
	res.send(product);
})

app.put('/api/products/:id', (req, res) => {
	var product = products.find(product => product.id == req.params.id);

	if(!product) return res.sendStatus(404);

	product.title = req.body.title || product.title;

	res.json(product);
})

app.patch('/api/products/:id', (req, res) => {
	var product = products.find(product => product.id == req.params.id);

	if(!product) return res.sendStatus(404);

	product.completed = !product.completed;

	res.json(product);
})

app.delete('/api/products/:id', (req, res) => {
	var index = products.findIndex(product => product.id == req.params.id);
	if(index === -1) return res.sendStatus(404);

	products.splice(index, 1);

	res.sendStatus(204);
})

app.get('/', (req, res) => {
	res.render('index');
})

app.listen(8080, () => {
	console.log('Server started');
})
