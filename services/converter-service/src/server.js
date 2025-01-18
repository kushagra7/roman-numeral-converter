const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/convert', (req, res) => {
    try {
        const number = parseInt(req.query.number);
        // Basic validation
        if (isNaN(number) || number < 1 || number > 3999) {
            return res.status(400).json({ error: "Number must be between 1 and 3999" });
        }
        
        // Conversion logic will go here
        const result = "XIV"; // Example result
        
        res.json({
            input: number.toString(),
            output: result
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Converter Service running on port ${PORT}`);
});