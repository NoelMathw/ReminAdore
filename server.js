const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());  // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/add-reminder', (req, res) => {
    const newReminder = req.body;
    const data = fs.readFileSync('wwwroot/JSON/Reminders.JSON', 'utf8');
    let reminders = JSON.parse(data);

    reminders.push(newReminder);

    fs.writeFileSync('wwwroot/JSON/Reminders.JSON', JSON.stringify(reminders, null, 4));
    res.send('Reminder added');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
