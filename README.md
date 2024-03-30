 Login Auth System 

***advrsopedia assign *****

Technology Stack:
  
Node.js and npm

Express.js / Node.js framework

sonwebtoken library for JWT generation and validation

React.js for component structure and functionality.

Signup Screen:

Include fields for username/email, password (with confirmation), and optional fields like name and profile picture.

Implement validation for the required fields and email format using React state management and validation libraries.


Display clear error messages and success messages.(Include terms and conditions checkbox.)

Simulate sending a welcome email notification upon successful signup (just trial).

Redirect to the post list screen after successful signup using React Router.

API Endpoints:

POST /signup:

Registers a new user with provided username, email, and password.

Validates input, ensures unique usernames and emails, hashes passwords securely.

Stores user data in the database.

Returns a success message and JWT token upon successful registration.

GET /posts:

Paginated implementation of fetching posts data from database.

Should be secure and non authenticated apis should be rejected. 

JWT Implementation:

Generate JWT tokens with appropriate payload and expiration time upon successful login.

Validate JWT tokens in protected routes to ensure user authentication.

Implement robust token refresh mechanisms

