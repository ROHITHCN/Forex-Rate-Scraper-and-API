# Forex Exchange Application

## Deliverables

### Source Code for the Application
The source code for the application is organized into several files:
- `app.js`: The main application file that sets up the server and routes and schedules daily scraping.
- `models/db.js`: Configures and manages the database connection.
- `scraper/scraper.js`: Contains the scraping logic for fetching exchange rates.
- `models/currencyPairModel.js`,`models/rateModel.js`: Handles database operations related to currency pairs.
- `controllers/rateController.js`: Provides appropriate functions for CRUD operations with the help of models.
- `routes/rateRoutes.js`: Routes the API with respective functions from controllers.

### Instructions for Setting Up and Running the Application

#### Prerequisites:
- Node.js and npm installed on your system.
- MySQL database set up and running.

#### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ROHITHCN/Forex-Rate-Scraper-and-API.git
   cd Forex_exchange

2. **Install Dependencies:**
   ```bash
   npm install

3.**Set Up the Database:**
  -Ensure your MySQL server is running.
  -Create a database named forex (or update the database name in your db.js file).
  -Run the following SQL commands to create the necessary tables:

  ```bash
  CREATE TABLE currency_pairs (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  currencyPair VARCHAR(10) UNIQUE KEY
  );

  CREATE TABLE rates (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    currencyPairId INT,
    rate FLOAT,
    date DATE,
    FOREIGN KEY (currencyPairId) REFERENCES currency_pairs(id)
  );
  ```
3.**Update Database Configuration:**
  -Ensure the db.js file has the correct database connection parameters (host, user, password, and database name).

4.**Create a env file and update the required parameters:**
The application uses environment variables to store sensitive information like database credentials. Ensure you create a .env file in the root of your project with the following content:
  DB_HOST = localhost
  DB_USER = username
  DB_PASSWORD = password
  DB_NAME = database name
  PORT = port number

5.**Run the Application:**
  ```bash
  node app.js
  ```
  -You should see an output indicating that the API server is running and connected to the database.

6.**Testing the APIs:**
Use tools like Postman or cURL to test the APIs.
  -Get Average Conversion Rate:
  ```bash
  GET http://localhost:3000/api/averageRate?currencyPair=USDINR&startDate=2024-12-10&endDate=2024-12-12
  ```
  -Get Closing Conversion Rate:
  ```bash
  GET http://localhost:3000/api/closingRate?currencyPair=USDINR&date=2024-12-12
  ```
  -Add New Currency Pair for Tracking:
  ```bash
  POST http://localhost:3000/api/addCurrencyPair
  Body: { "currencyPair": "AUDUSD" }
  ```

7.Design Decisions:
Modular Structure: The application is organized into separate modules for the database connection, models, controllers, and the scraper. This promotes separation of concerns and makes the codebase easier to maintain.

Async/Await: Utilizing async/await for asynchronous operations ensures the code is cleaner and easier to read compared to traditional callback-based implementations.

Error Handling: Comprehensive error handling is implemented across the application to ensure robustness and provide meaningful error messages.

Scheduled Scraping: The scraper is scheduled using node-schedule to run at specified times, ensuring timely data updates without manual intervention.
