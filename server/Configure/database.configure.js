const mongoose = require('mongoose');
const DB = process.env.DB_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connection established!!'))
    .catch((err) => console.log('Something went wrong!!', err));
