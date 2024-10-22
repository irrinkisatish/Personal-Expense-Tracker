# Personal Finance API

A RESTful API for managing personal financial records, where users can record their income and expenses, retrieve past transactions, and get summaries by category or time period.

## Technologies

- **Backend Framework**: Node.js with Express.js
- **Database**: SQLite (or MongoDB as an alternative)

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [API Endpoints](#api-endpoints)
3. [Postman Screenshots](#postman-screenshots)

---

## Project Setup

### Prerequisites

Ensure that you have Node.js installed. If you do not have Node.js, you can download it from [here](https://nodejs.org/).

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/irrinkisatish/Personal-Expense-Tracker.git

3. Navigate to the project directory:

   cd finance-api

4. Install the required dependencies:

   npm install
   
Create the SQLite database schema (if using SQLite) by running the following command, or allow the program to automatically create the tables on the first run.

4. Start the server:
   npm start
   
The server will be running at http://localhost:3305.

### API Endpoints

1. POST /transactions
   
Description: Adds a new transaction (either income or expense).
Method: POST
URL: /transactions

#### **Request Body**:

{
  "type": "income",
  "category": "Salary",
  "amount": 1500.00,
  "date": "2024-10-22",
  "description": "October salary"
}

# Response:

{
  "id": 1
}


2. GET /transactions

Description: Retrieves all transactions.
Method: GET
URL: /transactions

# Response:

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

# Response:

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

# Request Body:

{
  "type": "expense",
  "category": "Rent",
  "amount": 800.00,
  "date": "2024-10-01",
  "description": "October rent"
}

# Response:

{
  "message": "Transaction updated successfully"
}

5. DELETE /transactions/

Description: Deletes a transaction by its ID.
Method: DELETE
URL: /transactions/:id

# Response:

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

# Response:

{
  "totalIncome": 3000.00,
  "totalExpense": 2000.00,
  "balance": 1000.00
}

### Postman Screenshots

# 1. POST /transactions: Adds a new transaction (income or expense).

 ![Screenshot 2024-10-22 194855](https://github.com/user-attachments/assets/283c9766-82a3-49ac-9758-9d939dcd3fe3)
  

# 2. GET /transactions: Retrieves all transactions.

![Screenshot 2024-10-22 195019](https://github.com/user-attachments/assets/73a98762-1014-4e36-aedb-ef257543cecf)


# 3. GET /transactions/:id: Retrieves a transaction by ID.

![Screenshot 2024-10-22 195058](https://github.com/user-attachments/assets/9eb2547e-61b6-4a17-87b5-67f47a216adb)

 
# 4. PUT /transactions/:id: Updates a transaction by ID.

![Screenshot 2024-10-22 195238](https://github.com/user-attachments/assets/d58bf1b5-5bc1-4914-b402-fd1756cc5b6d)


# 5.DELETE /transactions/:id: Deletes a transaction by ID.

![Screenshot 2024-10-22 195327](https://github.com/user-attachments/assets/5a2f95d1-e1ed-4b54-a5bf-d25118122e1d)


# 6. GET /summary: Retrieves a summary of transactions, such as total income, total expenses, and balance. Optionally, this can be filtered by date range or category.

![Screenshot 2024-10-22 195431](https://github.com/user-attachments/assets/dc99d261-0124-45c0-b2eb-6aa3a999046b)
