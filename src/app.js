const express = require("express");

const app = express();

app.use((req, res)=>{
    res.send("Hello from the  New server 1");
});
app.listen(3000, ()=>{
    console.log("This is server 1");
});
