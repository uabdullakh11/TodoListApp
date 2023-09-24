const express = require("express");
require('dotenv').config()

const app = express();
app.use ('/', (req, res)=>{
    res.send(process.env.SECRET_KEY)
})
app.listen(5654, () => {
  console.log("Server running on localhost:5000...");
});