
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const mongoConnect = require('./db/connection');
const router = require('./routers/userRouter');
const authrouter = require('./routers/authRouters');

app.use(express.static("../client"));  // Serve static files for client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoConnect();

app.use('/uploads/users', express.static('./uploads/users'));
app.use(router);
app.use(authrouter);



app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
