const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userroutes = require('./routes/userroutes')
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth',userroutes);

mongoose.connect("mongodb+srv://fshakeel9233:MrMSvv9kCv2wyO9H@cluster0.zuaiorv.mongodb.net/ChatAPP", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected");
}).catch(error => {
    console.error("Error connecting to database:", error);
});


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Is running on Port ${process.env.PORT}`);
})