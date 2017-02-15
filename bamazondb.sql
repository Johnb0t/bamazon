-- CREATE TABLES

CREATE TABLE departments( 
id INTEGER(11) AUTO_INCREMENT NOT NULL, 
department_name VARCHAR(30) NOT NULL, 
over_head_costs INTEGER(10), 
PRIMARY KEY(id) 
);

CREATE TABLE products( 
id INTEGER(11) AUTO_INCREMENT NOT NULL, 
product_name VARCHAR(40) NOT NULL, 
department_id INTEGER(10),
price DECIMAL(5,2) NOT NULL,
stock_quantity INTEGER(11),
FOREIGN KEY(department_id) REFERENCES departments(id), 
PRIMARY KEY(id) 
);

CREATE TABLE sales(
id INTEGER(11) AUTO_INCREMENT NOT NULL, 
product_id INTEGER(10) NOT NULL,
quantity_purchased INTEGER(30) NOT NULL,
created_at TIMESTAMP, 
FOREIGN KEY(product_id) REFERENCES products(id),  
PRIMARY KEY(id) 
);

-- CREATE DUMMY DATA


-- departments
INSERT INTO departments (department_name, over_head_costs) VALUES ('Games', 40000);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Electronics', 650000);
INSERT INTO departments (department_name, over_head_costs) VALUES ('Hardware', 130000);

-- products
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('PS4', 1, 299.99, 200);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('XBOX ONE', 1, 399.99, 150);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('WII U', 1, 199.99, 50);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('SAMSUNG TV', 2, 999.99, 200);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('MP3 PLAYER', 2, 199.99, 200);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('FIT BIT', 2, 99.99, 200);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('HEADSET', 2, 39.99, 200);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('HAMMER', 3, 19.99, 70);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('DRILL', 3, 69.99, 100);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ('SAW', 3, 99.99, 45);