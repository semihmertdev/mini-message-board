# Mini Message Board

Mini Message board is a simple application that allows users to add and view messages. It is built using Express.js and EJS.

## Features

- View Messages: Display a list of existing messages on the homepage.
- Add Message: Add new messages through a form.
- Message Details: View detailed information about a specific message.
- Edit and Delete: Edit or delete existing messages.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```

2. **Install Dependencies**
    
    ```bash
    npm install
    ```

3. **Start the Application**

    ```bash
    npm start
    ```

4. **Open the Application**

 Navigate to http://localhost:3000 in your browser to access the application.

## Usage

- **Homepage**: `GET /` - List all current messages.
- **Add New Message**: `GET /new `- Display the form to add a new message.
- **Message Details**: `GET /message/:id` - View details of a specific message.
- **Edit Message**: `GET /edit/:id` - Display the form to edit a specific message.
- **Delete Message**: `POST /delete/:id` - Delete a specific message.

## File Structure

project-root/
├── public/
│   └── styles.css
├── views/
│   ├── index.ejs
│   ├── form.ejs
│   ├── message.ejs
│   └── edit.ejs
├── app.js
├── package.json
└── README.md
