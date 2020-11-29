const express = require("express");
const app = express();
const yarnRouter = require("./routes/yarnRoute.js")

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.use( "/yarn", yarnRouter);

app.listen(3000,function(){
    console.log("Сервер ожидает подключения");
})