var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

app.set('view engine', 'ejs');

//look up toys by ID
app.get('/findToy', (req, res) => {
	var query = {};
	if (req.query.id) {
		query.id = req.query.id;
        if (Object.keys(query).length != 0) {
            Toy.findOne(query, (err, toy) => {
                if (toy) {
                    res.json(toy);
                }
                else {
                    console.log(err);
                    res.json({});
                }
            });
        }
    }
	else {
		res.json({});
	}
});

//look up animals by species, trait, or gender
app.get('/findAnimals', (req, res) => {
	var query = {};
	if (req.query.species) {
		query.species = req.query.species;
	}
	if (req.query.trait) {
		query.traits = req.query.trait;
	}
	if (req.query.gender) {
		query.gender = req.query.gender;
	}
	if (Object.keys(query).length == 0) {
		console.log("nothing specified");
		res.json({});
	}
	else {
		Animal.find(query, '-_id -traits -__v', (err, animal) => {
			if (!err) {
				console.log(animal);
				res.json(animal);
			}
			else {
				console.log("no animal found");
				res.json({});
			}
			
		});
	}
});

//look up animals that are younger than a specified age
app.get('/animalsYoungerThan', (req, res) => {
	var age;
	if (req.query.age) {
		if (isNaN(Number(req.query.age))) {
			res.json({});
		}
		else {
			age = req.query.age;
			var result = {};
			var num;
			var names = [];
			Animal.find({age: {$lt: age}}, (err, animals) => {
				num = animals.length;
				result.count = num;
				if (num === 0) {
					res.json(result);
				}
				else {
					animals.forEach(function(animal) {
					names.push(animal.name);
					});
					result.names = names;
					res.json(result);
				}
			});
		}

	}
	else {
		res.json({});
	}
});

//calculate the price of a specified number of toys by ID
app.get('/calculatePrice', (req, res) => {
	if (req.query.id || req.query.qty) {
		var ids = req.query.id;
		var qtys = req.query.qty;
		if (ids.length != qtys.length) {
			res.json({});
		}
		//created consolidated object containing all valid item ids and quantities
		else {
			var newQuery = {};
			for (var i = 0; i<ids.length; i++) {
				var q = ids[i];
				if (q in newQuery) {
					if (Number.isInteger(Number(qtys[i])) && Number(qtys[i]) >=1) {
						newQuery[q] = newQuery[q] + Number(qtys[i]);
					}
				}
				else {
					if (Number.isInteger(Number(qtys[i])) && Number(qtys[i]) >=1) {
						newQuery[q] = Number(qtys[i]);
					}
				}
			}
			var result = {};
			result.items = [];
			result.totalPrice = 0;
			Toy.find({id: {$in: ids}}, '-_id, -name', (err, toys) => {
				console.log(toys);
				var newToys = {};
				for (var k = 0; k < toys.length; k++) {
					newToys[toys[k].id] = toys[k].price;
				}
				console.log(newToys);
				var newIds = Object.keys(newQuery);
				for (var j = 0; j<newIds.length; j++) {
					var item = {};
					if (newIds[j] in newToys) {
						item.item = newIds[j];
						item.qty = newQuery[newIds[j]];
						item.subtotal = newToys[newIds[j]]*newQuery[newIds[j]];
						result.items.push(item);
						result.totalPrice = result.totalPrice + item.subtotal;
					}
				}
				if (Object.keys(result).length === 0) {
					res.json({});
				}
				else {
					res.json(result);
				}
			});
		}
	}
	else {
		res.json({});
	}
});


app.listen(3000, () => {
	console.log('Listening on port 3000');
    });


// Please do not delete the following line; we need it for testing!
module.exports = app;