const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/romannumeral', async (req, res) => {
  try {
    const number = parseInt(req.query.query);

    // Validation
    if (isNaN(number) || number < 1 || number > 3999) {
      return res.status(400).json({ error: 'Number must be between 1 and 3999' });
    }

    // Log only if not in the 'test' environment
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Request to /romannumeral with query: ${number}`);
    }

    // Call Converter Service
    const response = await axios.get(`http://localhost:8081/convert?number=${number}`);

    // Log only if not in the 'test' environment
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Response from converter-service:`, response.data);
    }

    // Send back the result
    res.json({
      input: response.data.input,
      output: response.data.output,
    });
  } catch (error) {
    console.error('Error in /romannumeral:', error.message);
    res.status(500).send(error.response?.data?.error || 'Internal server error');
  }
});

// Check if we are in the 'test' environment, and only start the server if we are not
if (process.env.NODE_ENV !== 'test') {
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for testing purposes
