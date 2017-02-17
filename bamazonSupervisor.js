var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db',
});

connection.connect();

function displayMenu() {
	console.log("Menu Options (Supervisor View):".bold.blue);
	console.log("1.".red + "View Product Sale by Department".bold);
	console.log("2.".red + "Create New Department".bold);
}
displayMenu();