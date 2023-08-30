const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getDppHistory, getDppFirst, getDppLast, addDpp, updateDpp } = require('./main_functions'); // Import your functions from main_functions.js

const app = express();
app.use(cors());
app.use(bodyParser.json());

// These are the endpoints for the frontend to call, but in a real project, data will come from IoT devices and be processed
 
app.post('/get_dpp_history', (req, res) => {
    const { id } = req.body;
    const dpp = getDppHistory(id);
    res.json(dpp);
});

app.post('/get_dpp_first', (req, res) => {
    const { id } = req.body;
    const dpp = getDppFirst(id);
    res.json(dpp);
});

app.post('/get_dpp_last', (req, res) => {
    const { id } = req.body;
    const dpp = getDppLast(id);
    res.json(dpp);
});

app.post('/create_dpp', (req, res) => {
    const { companyName, productType, productDetail, manufactureDate } = req.body;
    const dpp = addDpp(companyName, productType, productDetail, manufactureDate);
    console.log(dpp);
    res.send('success');
});

app.post('/update_dpp', (req, res) => {
    const { dpp_identifier, companyName, productType, productDetail, manufactureDate } = req.body;
    const dpp = updateDpp(dpp_identifier, companyName, productType, productDetail, manufactureDate);
    console.log(dpp);
    res.send('success');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
