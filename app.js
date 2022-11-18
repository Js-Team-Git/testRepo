const express = require('express')
const app = express();
app.get('/',(req,res)=>{
    res.send("hello kafka");
})
app.listen(4000,()=>{
    console.log("app lisenig on port 4000")
})