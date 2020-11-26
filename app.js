const express = require("express");
const fs = require ("fs");
const parser = require("body-parser");
const { request } = require("http");
const { response } = require("express");
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
    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);
    
    let yarn =  yarns.find(function(item){
        if (item.id == id) return true;
    })    

    
    console.log(yarn);
    if (yarn) {
        res.send(yarn);
    }
    else res.status(404).send();
})

app.post("/yarn", jsonParser, (req,res) => {

    if(!req.body) res.status(404).send;
    let colourYarn = req.body.colour;
    let firmaYarn = req.body.firma;
    let articulYarn = req.body.articul;
    let yarn = {firma:firmaYarn, articul:articulYarn, colour:colourYarn};

    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);

    let id = yarns.length;
    id = id+1;
    yarn.id=id;
    yarns.push(yarn);

    let dataNew = JSON.stringify(yarns);
    fs.writeFileSync("yarn.json",dataNew);
    res.send(yarn);
})

app.delete("/yarn/:id", (req,res) => {
    let id = req.params.id;
    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);


   let index =  yarns.findIndex(function(item){
        if (item.id == id) return true;
    })    
   
    if (index> -1) {
        let yarn = yarns.splice(index,1);
       
        let dataNew = JSON.stringify(yarns);
        fs.writeFileSync("yarn.json",dataNew);
        res.send(yarn); 
    }
})

app.put("/yarn", jsonParser, (req,res) => {
    if(!req.body) res.status(404).send;
    let colourYarn = req.body.colour;
    let firmaYarn = req.body.firma;
    let articulYarn = req.body.articul;
    let idYarn = req.body.id;

    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);

    let yarn =  yarns.find(function(item){
        if (item.id == idYarn) return true;
    })    
    console.log('yarn');
    console.log(yarn);


    if(yarn) {
        yarn.colour = colourYarn;
        yarn.articul = articulYarn;
        yarn.firma = firmaYarn;
        let dataNew = JSON.stringify(yarns);
            fs.writeFileSync("yarn.json",dataNew);
            res.send(yarn); 
    } else res.sendStatus(404);  
});

app.listen(3000,function(){
    console.log("Сервер ожидает подключения");
})