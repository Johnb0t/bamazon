/*
step 1 make a folder
step 2 go into the folder
step 3 npm init
step 4 npm install mysql --save
step 5 make a connection.js file
step 6 copy and paste what I slacked out into connection.js
step 7 run it 
step 8 if it breaks change it until it works
*/

var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db',
});

connection.connect();

// function selectTable(table){
// 	connection.query('SELECT * from' + table, function (error, results, fields) {
// 	  if (error) throw error;
// 	  console.log(results);
// 	});
// }

connection.query('SELECT id, product_name, price FROM products', function (error, results, fields)
{
	for (var i = 0; i < results.length; i++) {
	console.log("ID: ".bold + results[i].id, "PRODUCT: ".bold + results[i].product_name, "PRICE: ".bold + results[i].price);
	}

	inquirer.prompt([{
		type: "input",
	  	name: "product_id",
	  	message: "What is the ID of the product you would like to buy?",
	  	validate: function(value) {
      	if (isNaN(value) === false) {
        return true;
      	}
      	return false;
  	  	}

	  	}, {
	 
		type: "input",
		name: "purchase_quant",
		message: "How many would you like to purchase?",
		validate: function(value) {
      	if (isNaN(value) === false) {
        return true;
      	}
      	return false;
  	  	}
  		}]).then(function(answer) {
  			var pid = product_id;
  			var quant = purchase_quant;
				// connection.query('INSERT into dranken_beers SET ?', {
				// 	beer_id : data.beer_id,
				// 	dranker_id : dranker
				// }, function (error, results, fields) {
				// 	console.log('insert complete')
				// });
			});
		});




// function insertIntoTable(name, type, abv, table){
//   connection.query("INSERT INTO " + table + " SET ?", {
//       name: name,
//       type: type,
//       abv: abv
//     }, function(err, res) { console.log('completed!')});
// }

// function deleteFromTable(id, table){
// 	connection.query("DELETE FROM " + table + " WHERE ?", {
// 	    id: id
// 	  }, function(err, res) { 
// 	  	if (err) return console.log(err);
// 	  	console.log('delete completed!')
// 	  });
// }

// //write update function
// function updateTable(id, table){
// 	connection.query("UPDATE " + table + " SET ? WHERE ?", [{
// 		name : 'bruno beer'
// 	  }, {
// 	  	id : id
// 	  }], function(err, res) { 
// 	  	if (err) return console.log(err);
// 	  	console.log('update completed!')
// 	  });
// }

// //write delete function


// // insertIntoTable('beer', 'i dont know beer', 100, 'beers');
// // deleteFromTable(7, 'beers');
// updateTable(1, 'beers');