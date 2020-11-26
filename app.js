const express = require("express");
const fs = require ("fs");
const parser = require("body-parser");
const { getYarnById, deleteYarn, updateYarn, createYarn } = require("./controllers/yarn.controller");
const app = express();
const jsonParser = parser.json();

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/yarn", (request, response) => {
    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);
    response.send(yarns);
})

app.get("/yarn/:id", (req,res) => {
    let id = req.params.id;

    const yarn = getYarnById(id)
    if (yarn) {
        res.send(yarn);
    }
    else res.status(404).send();
})

app.post("/yarn", jsonParser, (req,res) => {

    if(!req.body) res.status(404).send();

    try {
        let yarn = createYarn(req.body);
        res.send(yarn);
    } catch (error) {
        res.sendStatus(404);
    }
    
})

app.delete("/yarn/:id", (req,res) => {
    let id = req.params.id;
    try {
        let yarn = deleteYarn(id)
        res.send(yarn);
    } catch (err){
        res.sendStatus(400);
    }
})

app.put("/yarn", jsonParser, (req,res) => {
    if(!req.body) res.status(404).send();
    try {
        let yarn = updateYarn(req.body);
    } catch (error) {
        res.sendStatus(404);
    }

});

app.listen(3000,function(){
    console.log("Сервер ожидает подключения");
})