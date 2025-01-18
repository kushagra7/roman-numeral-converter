const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/romannumeral', async (req, res) => {
  try {
    const number = parseInt(req.query.query);
    if (isNaN(number) || number < 1 || number > 3999) {
      return res.status(400).send(`Number must be between 1 and 3999`);
    }

    const response = await axios.get(`http://converter-service:8081/convert?number=${number}`);
    res.json({
      input: response.data.input,
      output: response.data.output
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});