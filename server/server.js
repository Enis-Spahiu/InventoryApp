const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './.env'});
const PORT = 8000;
const cookieParser = require('cookie-parser');

require('./Configure/database.configure');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000',credentials:true}));

require('./Routes/user.routes')(app);
require('./Routes/product.routes')(app);

app.listen(PORT, () => {console.log("Server running on port 8000")})