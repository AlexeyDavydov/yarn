const express = require("express");
const { getYarnById, deleteYarn, updateYarn, createYarn } = require("../controllers/yarn.controller");
const fs = require ("fs");
const parser = require("body-parser");
const jsonParser = parser.json();
const yarnRouter = express.Router();

yarnRouter.get("/", (req, res) => {
    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);
    res.send(yarns);
})

yarnRouter.get("/:id", (req,res) => {
    let id = req.params.id;
    
    const yarn = getYarnById(id)
    if (yarn) {
        res.send(yarn);
    } else {
        res.status(404).send();
    }
})

yarnRouter.post("/", jsonParser, (req,res) => {
    
    if(!req.body) {
        res.status(400).send();
    }
    
    try {
        let yarn = createYarn(req.body);
        res.send(yarn);
    } catch (error) {
        res.sendStatus(404);
    }
})

yarnRouter.delete("/:id", (req,res) => {
    let id = req.params.id;
    try {
        let yarn = deleteYarn(id)
        res.send(yarn);
    } catch (err){
        res.sendStatus(400);
    }
})

yarnRouter.put("/", jsonParser, (req,res) => {
    if(!req.body) {
        res.status(404).send();
    }
    
    try {
        let yarn = updateYarn(req.body);
    } catch (error) {
        res.sendStatus(404);
    }
});

module.exports = yarnRouter;