# Twitter Clone

A Twitter clone pet project built using Next.js, Tailwind CSS, and Shadcn for the frontend, Prisma as the ORM, MongoDB as the database. Authentication is implemented using NextAuth. The application provides features like user authentication (login, signup, and logout), tweeting like Twitter, and the ability to edit user profiles (username, name, profile picture, etc.). Users can also like, comment on other users' tweets, and follow other users.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this project, make sure you have [Node.js](https://nodejs.org/) version 18 or higher installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/twitter-clone.git
   ```

2. Change into the project directory:

   ```bash
   cd twitter-clone
   ```

3. Install the dependencies:
   ```bash
    npm install
   ```
4. Start the application:
   ```bash
   npm run dev
   ```
5. The application will be accessible at
   `bash
http://localhost:3000/
`

## Technologies Used

- Frontend:

  - Next.js
  - Tailwind CSS
  - Shadcn

- Authentication:

  - NextAuth

- Backend:

  - Prisma
  - Node.js

- Database:

  - MongoDB

## Features

- **Authentication**:

  - User login, signup, and logout functionality.

- **Social Media Features**:

  - Users can post tweets, similar to Twitter.
  - User profile management, allowing users to edit their username, name, and profile picture.

- **Interactions**:
  - Users can like and comment on other users' tweets.
  - Users have the ability to follow other users for a social network experience.
