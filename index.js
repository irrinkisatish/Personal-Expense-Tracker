// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3305;

app.use(bodyParser.json());

const db = new sqlite3.Database('./finance.db');

// API Endpoints


// POST /transactions - Add a new transaction
app.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!type || !category || !amount || !date) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    db.run(
        'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
        [type, category, amount, date, description],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

// GET /transactions - Retrieve all transactions
app.get('/transactions', (req, res) => {
    db.all('SELECT * FROM transactions', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET /transactions/:id - Retrieve a transaction by ID
app.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(row);
    });
});

// PUT /transactions/:id - Update a transaction by ID
app.put('/transactions/:id', (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;

    db.run(
        'UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?',
        [type, category, amount, date, description, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: "Transaction not found" });
            }
            res.json({ message: "Transaction updated successfully" });
        }
    );
});

// DELETE /transactions/:id - Delete a transaction by ID
app.delete('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json({ message: "Transaction deleted successfully" });
    });
});

// GET /summary - Retrieve transaction summary
app.get('/summary', (req, res) => {
    const { startDate, endDate, category } = req.query;

    let query = 'SELECT type, SUM(amount) as total FROM transactions WHERE 1=1';
    let params = [];

    if (startDate && endDate) {
        query += ' AND date BETWEEN ? AND ?';
        params.push(startDate, endDate);
    }

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    query += ' GROUP BY type';

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const summary = rows.reduce(
            (acc, row) => {
                if (row.type === 'income') {
                    acc.totalIncome = row.total;
                } else if (row.type === 'expense') {
                    acc.totalExpense = row.total;
                }
                return acc;
            },
            { totalIncome: 0, totalExpense: 0 }
        );

        summary.balance = summary.totalIncome - summary.totalExpense;
        res.json(summary);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
