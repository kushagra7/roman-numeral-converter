const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Roman numeral conversion logic
function integerToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' },
    ];

    let result = '';
    for (const { value, symbol } of romanNumerals) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

app.get('/convert', (req, res) => {
    try {
        const number = parseInt(req.query.number);

        // Basic validation
        if (isNaN(number) || number < 1 || number > 3999) {
            return res.status(400).json({ error: "Number must be between 1 and 3999." });
        }

        // Perform conversion
        const result = integerToRoman(number);

        res.json({
            input: number.toString(),
            output: result
        });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Converter Service running on port ${PORT}`);
});
