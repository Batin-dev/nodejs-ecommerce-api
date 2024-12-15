# Node.js E-Commerce App  

This is a simple e-commerce application built using Node.js and Express. The app includes basic functionalities for managing products and an admin panel for administration.  

## Installation  

1. Clone the repository and navigate to the project directory.  
2. Install the required dependencies:  
   ```bash
   npm install
3. Start the server:

3. ```bash 
   node app.js

## Features  

#### Admin Panel  
- The admin panel is located in the `admin-panel` directory.  
- Open `admin.html` in a browser to manage products and view logs.  

#### Endpoints  

##### Product Management  

1. **`GET /products`**  
   - Retrieves a list of all products.  

2. **`POST /products/add`**  
   - Adds a new product. Requires the following fields in the request body:  
     - `id`  
     - `name`  
     - `description`  
     - `price`  

3. **`POST /products/delete`**  
   - Deletes a product. Requires the following field in the request body:  
     - `id`  

4. **`POST /products/update`**  
   - Updates an existing product. Requires the product details to be updated.  

##### User Management  

1. **`GET /user`**  
   - Retrieves user data, primarily admin details. This is a temporary endpoint for testing purposes.  

2. **`POST /user/login`**  
   - Handles user login. Requires the following fields in the request body:  
     - `email`  
     - `password`  
   *Note: This feature is currently not active.*  

#### Logging and Storage  

- **Logging**:  
  - All logs are saved to `db/log.json`.  

- **Storage**:  
  - Products are stored in `db/products.json`.  
  - Admin user data is stored in `db/users.json`. 

## Development Notes  

- The application runs on `http://localhost:3000`.  
- JSON files are used as the data storage mechanism to keep the app simple and flexible for modifications.  
- The project is intentionally basic and designed for future enhancements.  

## Planned Updates  

- Adding more robust authentication and user management features.  
- Expanding functionality in the admin panel.  
- Transitioning from JSON to a database for better scalability.  

