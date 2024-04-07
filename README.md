# Node.js API with Swagger

This is a simple User Management API with basic CRUD operations for managing users.

# Documentation for Node.js API using Swagger.

 ## Swagger Documentation

The API documentation is available via Swagger UI. You can access it locally by following these steps:

1. Make sure you have the API running on your local machine.
2. Open your web browser and navigate to [https://localhost:5000/api-docs](https://localhost:5000/api-docs). OR [https://node-backend-hyggex-world.vercel.app/api-docs/](https://node-backend-hyggex-world.vercel.app/api-docs/)
3. You will be redirected to the Swagger UI page where you can explore and test the API endpoints.

 ### Authorization in Swagger
 To authorize in Swagger:

1. Open Swagger in a browser.
2. Generate an authorization token by logging in or registering a user and copy it.
3. Click the **Authorize** button.
4. In the **Value** field, paste just the authorization token.
5. Click **Authorize**.
6. Try to use the "Try it out" option for one of the API calls.

  ## Usage
  To use the Node.js API with Swagger, follow these steps:

 1. Clone the repository to your local machine.
 2. Open the project in your preferred IDE.
 3. Build and run the project.
 4. Once the API is running, you can access the Swagger UI by navigating to [https://localhost:5000/api-docs](https://localhost:5000/api-docs) OR [https://node-backend-hyggex-world.vercel.app/api-docs/](https://node-backend-hyggex-world.vercel.app/api-docs/)
 5. Use the provided endpoints to perform various operations related to user management.

 Please note that you may need to configure the API settings, such as the database connection string, before running the code.

## Endpoints

### Create a new user
  
- **POST** `/api/users/create-user`

Creates a new user.

### Get a random user

- **GET** `/api/users/get-random`

Fetches a random user.

### Check user existence

- **POST** `/api/users/check-user`

Checks if a user exists by name.

### Get users above a certain age

- **POST** `/api/users/age-above`

Retrieves users above a specified age.

### List user names

- **GET** `/api/users/names`

Retrieves an array of user names.

### Update user information

- **PUT** `/api/users/update-user`

Updates user information by ID.

### Delete a user

- **DELETE** `/api/users/delete-user`

Deletes a user by ID.