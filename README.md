# Mini Message Board

A simple message board application built with Express and PostgreSQL. Users can add, edit, and delete messages, as well as view detailed information about each message.

## Features

- **View Messages**: Display a list of all messages.
- **Add New Message**: Submit a new message with a name and text.
- **Edit Message**: Modify an existing message.
- **Delete Message**: Remove a message from the board.
- **Message Details**: View details of a specific message.

## Technologies

- **Backend**: Express.js
- **Database**: PostgreSQL
- **Templating Engine**: EJS
- **Environment Variables**: dotenv

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables***
Create a .env file in the root directory and add your PostgreSQL connection string:

    ```bash
    DATABASE_URL=your_postgresql_connection_string
    ```

4. **Initialize the Database**
Run the following command to set up the database schema and insert initial data:

    ```bash
    node init_db.js
    ```

5. **Start the Server**

    ```bash
    npm start
    ```

    The server will be running at http://localhost:3000.

## Usage

- Navigate to the root URL to see the list of messages.
- Use the "New Message" button to add a new message.
- Click "Edit" to modify an existing message.
- Click "Delete" to remove a message.
- Click "Open" to view message details.