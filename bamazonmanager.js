//require packages
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


//Create function to prompt user with menu options
function startMenu() {
	console.log("Menu Options".bold);
	console.log("1. View Products for Sale");
	console.log("2. View Low Inventory");
	console.log("3. Add to Inventory");
	console.log("4. Add New Product");
	inquirer.prompt([{
		type: "input",
	  	name: "option",
	  	message: "Choose a Menu Option:",
	  	validate: function(value) {
      	if (isNaN(value) === false && 0 > value < 4) {
        return true;
      	}
      	return false;
  	  	}
	  }]).then(function(data) {
	  	console.log("You chose option: ".bold + data.option);
	  		
	  		if(data.option == 1) {
	  			connection.query("SELECT id, product_name, price, stock_quantity FROM products", function (error, results) {
					if (error) {
						return console.log("Error Accessing Data");
					} else {
						for (var i = 0; i < results.length; i++) {
							console.log("ID: ".bold + results[i].id, "PRODUCT: ".bold + results[i].product_name, "PRICE: ".bold + results[i].price, "STOCK QUANTITY: ".bold + results[i].stock_quantity);
							}
							restart();
					}
				}) 

	  		} else if (data.option == 2) {
	  			connection.query("SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5", function (error, results) {
	  				for (var i = 0; i < results.length; i++) {
	  					console.log("PRODUCT: ".bold + results[i].product_name, "STOCK QUANTITY: ".bold + results[i].stock_quantity);
	  				}
	  				restart();
	  			}) 
	  		} else if(data.option == 3) {
	  			connection.query("SELECT id, product_name, price, stock_quantity FROM products", function (error, results) {
					if (error) {
						return console.log("Error Accessing Data");
					} else {
						for (var i = 0; i < results.length; i++) {
							console.log("ID: ".bold + results[i].id, "PRODUCT: ".bold + results[i].product_name, "PRICE: ".bold + results[i].price, "STOCK QUANTITY: ".bold + results[i].stock_quantity);
							}
							inquirer.prompt([{
								type: "input",
							  	name: "product_id",
							  	message: "Which product would you like to update?",
							  	validate: function(value) {
						      	if (isNaN(value) === false && value > 0 && value < results.length + 1) {
						        return true;
						      	}
						      	return false;
						  	  	}
						  	  
								}, {
							 
								type: "input",
								name: "update_quant",
								message: "How much would you like to add?",
								validate: function(value) {
						      	if (isNaN(value) === false && value > 0) {
						        return true;
						      	}
						      	return false;
						  	  	}
						  		}]).then(function(data) {
						  			var id = data.product_id;
						  			var quant = data.update_quant;

						  			connection.query("UPDATE products SET stock_quantity = (stock_quantity + " + quant + ") WHERE id = " + id, function (error, results) {
										if (error) {
											return console.log("There was an error updating the products table.");
												}

												restart();
										});
						  		})
						  	}
						  }) 
	  		}

							 else if (data.option == 4) {
								console.log("AVAILABLE DEPARTMENTS:".bold);
								connection.query("SELECT * FROM departments", function (error, results) {
					  				for (var i = 0; i < results.length; i++) {
					  					console.log("ID: ".bold + results[i].id, "Department Name: ".bold + results[i].department_name);
					  				}
					  			
								inquirer.prompt([{
									type: "input",
									name: "department_id",
									message: "Which department would you like to add to?",
									validate: function(value) {
							      	if (isNaN(value) === false && value > 0) {
							        return true;
							      	}
							      	return false;
							        }

							  	  	}, {

									type: "input",
								  	name: "product_name",
								  	message: "What is the name of the product?",
								  								  	  
									}, {
								 
									type: "input",
									name: "price",
									message: "How much does it cost?",
									validate: function(value) {
							      	if (isNaN(value) === false && value > 0) {
							        return true;
							      	}
							      	return false;
							        }

							  	  	}, {

							  	  	type: "input",
									name: "update_quant",
									message: "How much would you like to add?",
									validate: function(value) {
							      	if (isNaN(value) === false && value > 0) {
							        return true;
							      	}
							      	return false;
							  	  	}
							  	  	}]).then(function(data) {
							  	  		var item = data.product_name;
							  	  		var price = data.price;
						  				var quant = data.update_quant;
						  				var dept = data.department_id;

						  				connection.query("INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES('" + item + "', " + dept + ", " + price + ", " + quant + ")");
						  				console.log("ITEM ADDED".bold)
						  				connection.query("SELECT * FROM products", function (error, results) {
							  				for (var i = 0; i < results.length; i++) {
							  					console.log("ID: ".bold + results[i].id, "PRODUCT NAME: ".bold + results[i].product_name, "DEPARTMENT ID: ".bold + results[i].department_id, "PRICE: ".bold + results[i].price, "STOCK QUANTITY: " + results[i].stock_quantity);
							  				}
							  				restart();
							  			});
							  	  });
							}); 
				};

	  		

	  });


}
startMenu();




///functions

function restart() {
	inquirer.prompt([{
		type: "confirm",
	  	name: "restart",
	  	message: "Do you want to continue Supervisor View?".bold,
	  	}]).then(function(data) {
	  		if(!data.restart){
	  			connection.end();
	  		} else {
	  			startMenu();
	  		};
	  	});
};


//Do something with user choice.

