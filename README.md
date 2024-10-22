# Personal Finance API

A RESTful API for managing personal financial records, where users can record their income and expenses, retrieve past transactions, and get summaries by category or time period.

## Technologies

- **Backend Framework**: Node.js with Express.js
- **Database**: SQLite (or MongoDB as an alternative)

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [API Endpoints](#api-endpoints)
3. [Examples](#examples)
4. [Future Enhancements](#future-enhancements)
5. [Postman Screenshots](#postman-screenshots)

---

## Project Setup

### Prerequisites

Ensure that you have Node.js installed. If you do not have Node.js, you can download it from [here](https://nodejs.org/).

### Steps to Run Locally

1. Clone the repository:
   git clone https://github.com/yourusername/finance-api.git

Navigate to the project directory:

cd finance-api

Install the required dependencies:

npm install
Create the SQLite database schema (if using SQLite) by running the following command, or allow the program to automatically create the tables on the first run.

Start the server:


npm start
The server will be running at http://localhost:3305.

###API Endpoints

1. POST /transactions
Description: Adds a new transaction (either income or expense).
Method: POST
URL: /transactions

Request Body:

{
  "type": "income",
  "category": "Salary",
  "amount": 1500.00,
  "date": "2024-10-22",
  "description": "October salary"
}

Response:

{
  "id": 1
}


2. GET /transactions

Description: Retrieves all transactions.
Method: GET
URL: /transactions
Response:

[
  {
    "id": 1,
    "type": "income",
    "category": "Salary",
    "amount": 1500.00,
    "date": "2024-10-22",
    "description": "October salary"
  }
]
3. GET /transactions/
Description: Retrieves a specific transaction by its ID.
Method: GET
URL: /transactions/:id
Response:

{
  "id": 1,
  "type": "income",
  "category": "Salary",
  "amount": 1500.00,
  "date": "2024-10-22",
  "description": "October salary"
}
4. PUT /transactions/
Description: Updates an existing transaction by its ID.
Method: PUT
URL: /transactions/:id
Request Body:

{
  "type": "expense",
  "category": "Rent",
  "amount": 800.00,
  "date": "2024-10-01",
  "description": "October rent"
}
Response:

{
  "message": "Transaction updated successfully"
}
5. DELETE /transactions/
Description: Deletes a transaction by its ID.
Method: DELETE
URL: /transactions/:id

Response:

{
  "message": "Transaction deleted successfully"
}

6. GET /summary
Description: Retrieves a summary of income, expenses, and balance, optionally filtered by date range or category.
Method: GET
URL: /summary
Query Parameters:
startDate (optional): Filter by start date.
endDate (optional): Filter by end date.
category (optional): Filter by category.
Response:

{
  "totalIncome": 3000.00,
  "totalExpense": 2000.00,
  "balance": 1000.00
}