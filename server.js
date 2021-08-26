require('dotenv').config();

const express = require('express');
const cors = require('cors');

// router
const user = require('./routes/userRoute');

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routing API
app.use('/api/v1', user);

app.all("*", (req, res) =>
  res.status(404).json(`Can't find ${req.originalUrl} on this server!`)
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});